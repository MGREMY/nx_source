import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mgnp-loader',
  imports: [],
  standalone: true,
  templateUrl: './mgnp-loader.component.html',
  styleUrl: './mgnp-loader.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'status',
  },
})
export class MgnpLoader {}
