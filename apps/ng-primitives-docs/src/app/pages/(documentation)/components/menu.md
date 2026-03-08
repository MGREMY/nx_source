---
name: 'Menu'
sourceUrl: 'https://github.com/mgremy/nx_source/tree/main/libs/ng-primitives/menu'
---

# Menu

A menu is a list of options or commands presented to the user in a dropdown list.

## Usage

### Default

```html
<button
  [ngpMenuTrigger]="menu"
  mgnpButton></button>

<ng-template #menu>
  <div
    ngpMenu
    mgnpMenu>
    <button
      ngpMenuItem
      mgnpMenuItem>
      Item 1
    </button>
    <button
      ngpMenuItem
      mgnpMenuItem>
      Item 2
    </button>
    <button
      ngpMenuItem
      mgnpMenuItem>
      Item 3
    </button>
  </div>
</ng-template>
```

## Theme

<app-file-content name="menu"></app-file-content>
