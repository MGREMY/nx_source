import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  standalone: true,
  template: `
    <h2>Page Not Found</h2>

    <a [routerLink]="['/']">Go Back Home</a>
  `,
})
export default class NotFoundPage {}
