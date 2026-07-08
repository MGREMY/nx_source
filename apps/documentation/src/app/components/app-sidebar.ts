import { MgnpDialog, MgnpDialogOverlay } from '@mgremy/ng-primitives/dialog';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronDown } from '@ng-icons/heroicons/outline';

import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  Injector,
  input,
  linkedSignal,
  model,
  OnInit,
  TemplateRef,
  viewChild,
  viewChildren,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { NgpDialogContext, NgpDialogManager } from 'ng-primitives/dialog';
import { filter, map } from 'rxjs';

export type SidebarTree = {
  label: string;
  order: number;
  icon?: string;
} & (
  | {
      path: string;
      tree?: SidebarTree[];
    }
  | {
      path?: string;
      tree: SidebarTree[];
    }
);

@Component({
  selector: 'app-sidebar-item',
  imports: [NgClass, NgIcon],
  template: `
    <div class="flex items-center">
      <button
        class="cursor-pointer p-1 pl-2 w-full rounded-lg  hover:bg-ui-hover"
        (click)="onClick()"
        [ngClass]="{
          'text-secondary': isActive(),
        }">
        <h2 class="flex items-center justify-between gap-2 mb-1 transition">
          <span class="flex items-center gap-2">
            @if (item().icon) {
              <ng-icon
                class="transition"
                [svg]="item().icon" />
            }
            {{ item().label }}
          </span>
        </h2>
      </button>
      @if (item().tree && item().tree!.length > 0) {
        <button
          class="cursor-pointer p-1 px-2 rounded-lg hover:bg-ui-hover"
          (click)="toggle()">
          <ng-icon
            class="transition"
            [ngClass]="{
              'rotate-180': isOpen(),
            }"
            name="heroChevronDown" />
        </button>
      }
    </div>

    @if (item().tree) {
      <div
        class="pl-4 border-l border-l-ui transition-all"
        [ngClass]="{
          hidden: !isOpen(),
        }">
        <ol class="mb-2">
          @for (child of item().tree; track $index) {
            <app-sidebar-item [item]="child" />
          }
        </ol>
      </div>
    }
  `,
  providers: [provideIcons({ heroChevronDown })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSidebarItem {
  private readonly _router = inject(Router);
  private readonly _children = viewChildren(AppSidebarItem);

  readonly item = input.required<SidebarTree>();

  readonly currentPath = toSignal(
    this._router.events.pipe(
      filter((x) => x instanceof NavigationEnd),
      map(() => this._router.url)
    ),
    { initialValue: this._router.url }
  );
  readonly isActive = computed((): boolean => {
    const currentPath = this.currentPath();
    const path = this.item().path;

    return path ? currentPath.startsWith(path) : this._children().some((x) => x.isActive());
  });
  readonly isOpen = linkedSignal(() => this.isActive());

  onClick(): void {
    const children = this.item().tree;
    const path = this.item().path;

    if (path) this._router.navigateByUrl(path);

    if (children && children.length > 0) this.toggle();
  }

  toggle(isOpen?: boolean | undefined): void {
    if (isOpen === undefined) {
      this.isOpen.set(!this.isOpen());
      return;
    }

    this.isOpen.set(isOpen);
  }
}

@Component({
  selector: 'app-sidebar',
  imports: [AppSidebarItem, NgTemplateOutlet, MgnpDialog, MgnpDialogOverlay],
  template: `
    <div class="hidden xl:inline-block size-full">
      <ng-container [ngTemplateOutlet]="content" />
    </div>

    <ng-template #drawer>
      <div
        mgnpDialogOverlay
        mode="drawer"
        drawerPosition="start">
        <div
          mgnpDialog
          class="w-full overflow-y-auto">
          <ng-container [ngTemplateOutlet]="content" />
        </div>
      </div>
    </ng-template>

    <ng-template #content>
      @for (child of tree(); track $index) {
        <app-sidebar-item [item]="child" />
      }
    </ng-template>
  `,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSidebar implements OnInit {
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _injector = inject(Injector);
  private readonly _ngpDialogManager = inject(NgpDialogManager);

  private readonly _drawer = viewChild.required<TemplateRef<NgpDialogContext>>('drawer');

  readonly isOpen = model<boolean>(false);
  readonly tree = input<SidebarTree[]>([]);

  ngOnInit() {
    effect(
      () => {
        const isOpen = this.isOpen();
        const drawer = this._drawer();

        if (this.tree() === undefined) return;

        if (isOpen && drawer) {
          this._ngpDialogManager
            .open(drawer)
            .closed.pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this.isOpen.set(false));
        }
      },
      { injector: this._injector }
    );
  }
}
