import { computed, signal, WritableSignal } from '@angular/core';

export class ComboboxFilter<T> {
  private readonly _options: T[];
  private readonly _inputValue: WritableSignal<string>;
  private readonly _value: WritableSignal<T | undefined>;
  private readonly _valueMapper: (value: T) => string;
  private readonly _filter = signal<string>('');
  private readonly _filterMapper: (option: T, value: string) => boolean;

  readonly filteredOptions = computed<T[]>(() =>
    this._options.filter((v) => this._filterMapper(v, this._filter()))
  );

  constructor(
    options: T[],
    inputValue: WritableSignal<string>,
    value: WritableSignal<T | undefined>,
    valueMapper?: (value: T) => string,
    filterMapper?: (option: T, value: string) => boolean
  ) {
    this._options = options;
    this._inputValue = inputValue;
    this._value = value;
    this._valueMapper = valueMapper || ((v) => v as unknown as string);
    this._filterMapper =
      filterMapper || ((o, v) => String(o).toLowerCase().includes(v.toLowerCase()));
  }

  onFilterChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this._inputValue.set(input.value);
    this._filter.set(input.value);
  }

  onValueChange(value: T): void {
    this._inputValue.set(this._valueMapper(value));
    this._filter.set('');
  }

  onOpenChange(open: boolean): void {
    if (open) {
      return;
    }

    const value = this._value();

    if (this._inputValue() === '') {
      this._value.set(undefined);
    } else {
      this._inputValue.set(value ? this._valueMapper(value) : '');
    }

    this._filter.set('');
  }
}

export function comboboxFilter<T>(config: {
  options: T[];
  inputValue: WritableSignal<string>;
  value: WritableSignal<T | undefined>;
  valueMapper?: (value: T) => string;
  filterMapper?: (option: T, value: string) => boolean;
}): ComboboxFilter<T> {
  return new ComboboxFilter<T>(
    config.options,
    config.inputValue,
    config.value,
    config.valueMapper,
    config.filterMapper
  );
}

export function comboboxValue<T>(): {
  input: WritableSignal<string>;
  value: WritableSignal<T | undefined>;
} {
  return { input: signal<string>(''), value: signal<T | undefined>(undefined) };
}
