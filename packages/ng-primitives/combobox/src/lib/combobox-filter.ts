import { computed, signal, WritableSignal } from '@angular/core';

/**
 * Manages the filtering, input synchronization, and open/close behavior of a combobox.
 *
 * Wires together the input text, the selected value, and the filtered option list. Handles
 * updating the input display when a value is selected and resetting the filter on close.
 */
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
    this._valueMapper = valueMapper ?? ((v) => v as unknown as string);
    this._filterMapper =
      filterMapper ?? ((o, v) => String(o).toLowerCase().includes(v.toLowerCase()));
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

/**
 * Creates a `ComboboxFilter<T>` instance that manages filtering of combobox options.
 *
 * By default, works with string options and values. For complex option types (e.g. objects),
 * provide a `valueMapper` to convert an option to its string representation (used for display
 * and input), and a `filterMapper` to customize whether an option passes the filter based on
 * the raw input string (e.g. filtering only by name or email fields of an object).
 *
 * @template T - The type of each option in the combobox.
 * @param config.options - The full list of options to filter.
 * @param config.inputValue - A writable signal holding the current input string.
 * @param config.value - A writable signal holding the currently selected value.
 * @param config.valueMapper - Maps an option `T` to its string representation. Defaults to casting to string.
 * @param config.filterMapper - Predicate returning `true` if the option should appear given the filter string. Defaults to a case-insensitive substring match.
 */
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

/**
 * Creates reactive signals for managing a combobox value and input state.
 *
 * Returns an object with an `input` signal (the current text input string) and a
 * `value` signal (the currently selected value, or `undefined` if none).
 *
 * @template T - The type of the selected value.
 */
export function comboboxValue<T>(): {
  input: WritableSignal<string>;
  value: WritableSignal<T | undefined>;
} {
  return { input: signal<string>(''), value: signal<T | undefined>(undefined) };
}
