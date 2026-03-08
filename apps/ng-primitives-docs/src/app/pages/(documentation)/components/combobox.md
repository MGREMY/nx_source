---
name: 'Combobox'
sourceUrl: 'https://github.com/mgremy/nx_source/tree/main/libs/ng-primitives/combobox'
---

# Combobox

The Combobox primitive is a combination of a dropdown and an input field. It allows users to select
from a list of options while filtering the list based on their input.

## Usage

### Default

```html
<div
  ngpCombobox
  mgnpCombobox>
  <input
    ngpComboboxInput
    mgnpComboboxInput />
  <button ngpComboboxButton>▼</button>
  <div
    ngpComboboxDropdown
    mgnpComboboxDropdown>
    @for (option of options; track option) {
    <div
      ngpComboboxOption
      mgnpComboboxOption
      [ngpComboboxOptionValue]="option">
      {{ option }}
    </div>
    }
  </div>
</div>
```

### Without input field

```html
<div
  ngpCombobox
  mgnpCombobox>
  <button ngpComboboxButton>▼</button>
  <div
    ngpComboboxDropdown
    mgnpComboboxDropdown>
    @for (option of options; track option) {
    <div
      ngpComboboxOption
      mgnpComboboxOption
      [ngpComboboxOptionValue]="option">
      {{ option }}
    </div>
    }
  </div>
</div>
```

## Theme

<app-file-content name="combobox"></app-file-content>
