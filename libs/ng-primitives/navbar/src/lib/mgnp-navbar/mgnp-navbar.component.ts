import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mgnp-navbar, nav[mgnpNavbar]',
  imports: [],
  standalone: true,
  templateUrl: './mgnp-navbar.component.html',
  styleUrl: './mgnp-navbar.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [],
})
export class MgnpNavbar {}
