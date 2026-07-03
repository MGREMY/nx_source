import { getRouterLinks } from '../utils/router.helper';

import { lucideCode2 } from '@ng-icons/lucide';

import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  computed,
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith, Subscription } from 'rxjs';

/**
 * Directive that adds a source code link button next to H1 headings
 * when a sourceUrl is present in the page's frontmatter.
 */
@Directive({
  selector: '[appSourceLink]',
})
export class SourceLink implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private routerSubscription?: Subscription;

  private readonly currentRoute = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url)
    )
  );

  readonly sourceUrl = computed(() => {
    const route = this.currentRoute();
    if (!route) return null;

    // Strip query parameters and fragments from the route
    const routePath = route.split(/[?#]/)[0];

    // Get all router links with their metadata
    const links = getRouterLinks();

    // Find the matching route
    for (const [path, data] of Object.entries(links)) {
      const normalizedPath = path
        .replace('../pages/', '')
        .replace('.md', '')
        .replace('(documentation)/', '');

      if (routePath === `/${normalizedPath}`) {
        return data['sourceUrl'] as string | undefined;
      }
    }

    return null;
  });
  readonly primitiveUrl = computed(() => {
    const route = this.currentRoute();
    if (!route) return null;

    // Strip query parameters and fragments from the route
    const routePath = route.split(/[?#]/)[0];

    // Get all router links with their metadata
    const links = getRouterLinks();

    // Find the matching route
    for (const [path, data] of Object.entries(links)) {
      const normalizedPath = path
        .replace('../pages/', '')
        .replace('.md', '')
        .replace('(documentation)/', '');

      if (routePath === `/${normalizedPath}`) {
        return data['primitiveUrl'] as string | undefined;
      }
    }

    return null;
  });

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Add source link initially
      this.addSourceLinkToHeading();
      this.addPrimitiveLinkToHeading();

      // Re-add when navigation changes
      this.routerSubscription = this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          setTimeout(() => {
            this.addSourceLinkToHeading();
            this.addPrimitiveLinkToHeading();
          }, 0);
        });
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  private addSourceLinkToHeading(): void {
    const url = this.sourceUrl();
    if (!url) return;

    const element = this.elementRef.nativeElement as HTMLElement;
    const h1 = element.querySelector('h1');
    if (!h1) return;

    // Skip if source link already exists
    if (h1.querySelector('.source-link')) {
      return;
    }

    // Skip if source link already exists
    if (h1.querySelector('[data-source-link]')) {
      return;
    }

    // Wrap existing H1 content (including heading anchor) in a container
    const contentWrapper = this.renderer.createElement('span');
    this.renderer.setAttribute(contentWrapper, 'class', 'inline-flex items-center');

    // Move all existing children into the content wrapper
    while (h1.firstChild) {
      this.renderer.appendChild(contentWrapper, h1.firstChild);
    }

    // Make H1 a flex container with space-between while preserving existing classes
    const existingClasses = h1.getAttribute('class') || '';
    const newClasses = existingClasses
      ? `${existingClasses} flex justify-between items-center`
      : 'flex justify-between items-center';
    this.renderer.setAttribute(h1, 'class', newClasses);

    // Append the content wrapper back to h1
    this.renderer.appendChild(h1, contentWrapper);

    // Create wrapper span to hold the button
    const wrapper = this.renderer.createElement('span');
    this.renderer.setAttribute(wrapper, 'class', 'source-link inline-flex items-center');

    // Create anchor link
    const anchor = this.renderer.createElement('a');
    this.renderer.setAttribute(anchor, 'href', url);
    this.renderer.setAttribute(anchor, 'target', '_blank');
    this.renderer.setAttribute(anchor, 'rel', 'noopener noreferrer');
    this.renderer.setAttribute(anchor, 'aria-label', 'View source code on GitHub');
    this.renderer.setAttribute(anchor, 'title', 'View source code');
    this.renderer.setAttribute(anchor, 'data-source-link', '');
    this.renderer.setAttribute(
      anchor,
      'class',
      'inline-flex items-center justify-center w-7 h-7 text-placeholder hover:text-secondary [&>svg]:w-5 [&>svg]:h-5'
    );

    // Add code icon from ng-icons
    this.renderer.setProperty(anchor, 'innerHTML', lucideCode2);

    // Append anchor to wrapper, then wrapper to heading
    this.renderer.appendChild(wrapper, anchor);
    this.renderer.appendChild(h1, wrapper);
  }

  private addPrimitiveLinkToHeading(): void {
    const url = this.primitiveUrl();
    if (!url) return;

    const element = this.elementRef.nativeElement as HTMLElement;
    const h1 = element.querySelector('h1');
    if (!h1) return;

    const wrapper = h1.querySelector('.source-link');

    // Skip if wrapper does not exists
    if (!wrapper) {
      return;
    }

    // Skip if primitive lint already exists
    if (wrapper.querySelector('[data-primitive-link]')) {
      return;
    }

    // Create anchor link
    const anchor = this.renderer.createElement('a');
    this.renderer.setAttribute(anchor, 'href', url);
    this.renderer.setAttribute(anchor, 'target', '_blank');
    this.renderer.setAttribute(anchor, 'rel', 'noopener noreferrer');
    this.renderer.setAttribute(anchor, 'aria-label', 'View primitive documentation');
    this.renderer.setAttribute(anchor, 'title', 'View primitive documentation');
    this.renderer.setAttribute(anchor, 'data-primitive-link', '');
    this.renderer.setAttribute(
      anchor,
      'class',
      'inline-flex items-center justify-center w-7 h-7 text-placeholder hover:text-secondary [&>svg]:w-5 [&>svg]:h-5'
    );

    // Add code icon from ng-icons
    this.renderer.setProperty(
      anchor,
      'innerHTML',
      '<svg width="64px" height="64px" viewBox="0 0 32.00 32.00" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" stroke="#000000" stroke-width="0.00032"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#444444" d="M15.937 11.355l-2.057 4.879h4.433l-2.358-4.924-0.019 0.044zM15.964 4.3l-11.279 3.969 1.782 14.777 9.508 5.226 9.557-5.297 1.782-14.776-11.351-3.899zM20.744 21.849l-1.531-3.545h-6.25l-1.398 3.497-2.601 0.048 6.973-15.513 7.216 15.513h-2.41z"></path> </g></svg>'
    );

    // Append anchor to wrapper, then wrapper to heading
    this.renderer.appendChild(wrapper, anchor);
  }
}
