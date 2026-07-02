import { AppComponent } from '../app';
import AppSidebar from '../components/app-sidebar';

import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [AppSidebar, RouterOutlet],
  template: `
    <div class="flex">
      <app-sidebar [(isOpen)]="_appComponent.isSidebarOpen" />

      <router-outlet />
    </div>
  `,
})
export default class DocumentationPage {
  protected readonly _appComponent = inject(AppComponent);
}
