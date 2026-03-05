import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Provider } from '@angular/core';

export function provideDefaultDatePipeConfig(): Provider {
  return {
    provide: DATE_PIPE_DEFAULT_OPTIONS,
    useValue: {
      dateFormat: 'short',
    },
  };
}
