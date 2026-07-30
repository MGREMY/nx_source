import { MgnpFileUpload } from '@mgremy/ng-primitives/file-upload';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroDocumentArrowUp } from '@ng-icons/heroicons/outline';

import { Component } from '@angular/core';

@Component({
  imports: [MgnpFileUpload, NgIcon],
  template: `
    <div class="grid grid-rows-2 gap-y-2 w-full items-center justify-center">
      @for (color of _colors; track $index) {
        <span class="place-self-center">{{ color }}</span>
        <div
          class="place-self-center"
          mgnpFileUpload
          [color]="color"
          (mgnpFileUploadSelected)="onFileSelected($event)"
          (mgnpFileUploadRejected)="onFileRejected()"
          mgnpFileUploadMultiple>
          <div class="flex flex-col gap-3 items-center justify-center">
            <ng-icon name="heroDocumentArrowUp" />
            <span class="font-semibold text-lg">Select or drag and drop files here.</span>
          </div>
        </div>
      }
    </div>
  `,
  providers: [provideIcons({ heroDocumentArrowUp })],
})
export default class FileUpload {
  readonly _colors = ['ui', 'primary', 'accent', 'info', 'success', 'warning', 'danger'];

  onFileSelected(files: FileList | null): void {
    if (files) {
      alert(`Selected ${files.length} files.`);
    } else {
      alert('Received `null`.');
    }
  }

  onFileRejected(): void {
    alert('File rejected.');
  }
}
