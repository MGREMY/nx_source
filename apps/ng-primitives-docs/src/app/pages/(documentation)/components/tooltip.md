---
name: 'Tooltip'
sourceUrl: 'https://github.com/mgremy/nx_source/tree/main/libs/ng-primitives/tooltip'
---

# Tooltip

Display additional information on hover.

## Usage

### Default

```html
<button
  [ngpTooltipTrigger]="tooltip"
  mgnpButton>
  Hover me
</button>

<ng-template #tooltip>
  <div
    ngpTooltip
    mgnpTooltip>
    Tooltip content
  </div>
</ng-template>
```

### With arrow

```html
<button
  [ngpTooltipTrigger]="tooltip"
  mgnpButton>
  Hover me
</button>

<ng-template #tooltip>
  <div
    ngpTooltip
    mgnpTooltip>
    Tooltip content
    <div
      ngpTooltipArrow
      mgnpTooltipArrow></div>
  </div>
</ng-template>
```

## Theme

<app-file-content name="tooltip"></app-file-content>
