import { heroCodeBracket } from '@ng-icons/heroicons/outline';

import { injectContentFiles } from '@analogjs/content';
import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

interface ContentAttributes {
  sourceUrl?: string;
  primitiveUrl?: string;
}

/**
 * Directive that adds a source code link button next to H1 headings
 * when a sourceUrl is present in the page's frontmatter.
 */
@Directive({
  selector: '[appSourceLink]',
})
export class SourceLink implements AfterViewInit {
  private readonly elementRef = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly contents = injectContentFiles<ContentAttributes>();

  private readonly currentRoute = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url)
    )
  );

  ngAfterViewInit(): void {
    this.init();

    // Re-add when navigation changes
    this.router.events
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        setTimeout(() => {
          this.init();
        }, 0);
      });
  }

  private init(): void {
    if (isPlatformBrowser(this.platformId)) {
      const attributes = this.getCurrentContentAttributes();
      const wrapper = this.getWrapper();

      if (!attributes?.primitiveUrl || !attributes?.sourceUrl) return;

      if (attributes.sourceUrl) {
        this.addSourceLink(wrapper, { sourceUrl: attributes.sourceUrl });
      }
      if (attributes.primitiveUrl) {
        this.addPrimitiveLink(wrapper, { primitiveUrl: attributes.primitiveUrl });
      }

      this.saveWrapperInDom(wrapper);
    }
  }

  private getCurrentContentAttributes(): ContentAttributes | undefined {
    const currentRoute = this.currentRoute()?.replace(/[?#].*$/, '');

    for (const content of this.contents) {
      const filename = content.filename
        .replace('apps/documentation/src/content', '')
        .replace('.md', '');

      if (filename === currentRoute) {
        return content.attributes;
      }
    }

    return undefined;
  }

  private getWrapper(): HTMLSpanElement {
    // Create wrapper span to hold the button
    const wrapper = this.renderer.createElement('span');
    this.renderer.setAttribute(wrapper, 'class', 'inline-flex items-center');
    this.renderer.setAttribute(wrapper, 'data-links', '');

    return wrapper;
  }

  private saveWrapperInDom(wrapper: HTMLSpanElement): void {
    const element = this.elementRef.nativeElement as HTMLElement;
    const h1 = element.querySelector('h1');
    if (!h1) return undefined;

    // Skip if links sections already exists
    if (h1.querySelector('[data-links]')) return undefined;

    // Wrap H1 content and its children in a the content container
    const contentWrapper = this.renderer.createElement('span') as HTMLSpanElement;
    this.renderer.setAttribute(contentWrapper, 'class', 'inline-flex items-center');

    // Move all existing children into the content wrapper
    while (h1.firstChild) this.renderer.appendChild(contentWrapper, h1.firstChild);

    // Make H1 a flex container with space-between while preserving existing classes
    const newClasses = `${h1.getAttribute('class') || ''} flex justify-between items-center`;
    this.renderer.setAttribute(h1, 'class', newClasses);

    // Append the content wrapper back to h1
    this.renderer.appendChild(h1, contentWrapper);

    // Append the wrapper into h1
    this.renderer.appendChild(h1, wrapper);
  }

  private addSourceLink(
    wrapper: HTMLSpanElement,
    options: {
      sourceUrl: string;
    }
  ): void {
    if (wrapper.querySelector('[data-source-link]')) return;

    const anchor = this.renderer.createElement('a');
    this.renderer.setAttribute(anchor, 'href', options.sourceUrl);
    this.renderer.setAttribute(anchor, 'target', '_blank');
    this.renderer.setAttribute(anchor, 'rel', 'noopener noreferrer');
    this.renderer.setAttribute(anchor, 'aria-label', 'View source code on GitHub');
    this.renderer.setAttribute(anchor, 'title', 'View source code');
    this.renderer.setAttribute(anchor, 'data-source-link', '');
    this.renderer.setAttribute(
      anchor,
      'class',
      'inline-flex items-center justify-center w-7 h-7 text-placeholder hover:text-accent [&>svg]:w-5 [&>svg]:h-5'
    );

    // Add code icon from ng-icons
    this.renderer.setProperty(anchor, 'innerHTML', heroCodeBracket);

    // Append anchor to wrapper, then wrapper to heading
    this.renderer.appendChild(wrapper, anchor);
  }

  private addPrimitiveLink(
    wrapper: HTMLSpanElement,
    options: {
      primitiveUrl: string;
    }
  ): void {
    if (wrapper.querySelector('[data-primitive-link]')) return;

    const anchor = this.renderer.createElement('a');
    this.renderer.setAttribute(anchor, 'href', options.primitiveUrl);
    this.renderer.setAttribute(anchor, 'target', '_blank');
    this.renderer.setAttribute(anchor, 'rel', 'noopener noreferrer');
    this.renderer.setAttribute(anchor, 'aria-label', 'View primitive documentation');
    this.renderer.setAttribute(anchor, 'title', 'View primitive documentation');
    this.renderer.setAttribute(anchor, 'data-primitive-link', '');
    this.renderer.setAttribute(
      anchor,
      'class',
      'inline-flex items-center justify-center w-7 h-7 text-placeholder hover:text-accent [&>svg]:w-5 [&>svg]:h-5'
    );

    // Add code icon from ng-icons
    this.renderer.setProperty(
      anchor,
      'innerHTML',
      '<svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" stroke="none" stroke-width="0.00032"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.937 11.355l-2.057 4.879h4.433l-2.358-4.924-0.019 0.044zM15.964 4.3l-11.279 3.969 1.782 14.777 9.508 5.226 9.557-5.297 1.782-14.776-11.351-3.899zM20.744 21.849l-1.531-3.545h-6.25l-1.398 3.497-2.601 0.048 6.973-15.513 7.216 15.513h-2.41z"></path></g></svg>'
    );

    // Append anchor to wrapper, then wrapper to heading
    this.renderer.appendChild(wrapper, anchor);
  }
}
