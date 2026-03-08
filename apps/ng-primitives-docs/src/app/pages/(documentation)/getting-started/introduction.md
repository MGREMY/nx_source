---
name: Introduction
order: 1
icon: heroBookOpen
---

# Introduction

`@mgremy/ng-primitives` is a wrapper around [ng-primitives](https://angularprimitives.com) headless
components, using [TailwindCSS](https://tailwindcss.com/).

## Architecture

- **Headless component** `ng-primitives`: Provide behavior, accessibility and keyboard interactions
  without any visual styles
- **Styled wrappers** `mgremy/ng-primitives`: Add TailwindCSS styling

## Usage pattern

Each components requires two parts:

1. **Headless directive** from `ng-primitives` - handle logic, accessibility, keyboard navigation
2. **Styled directive** from `@mgremy/ng-primitives` - applies TailwindCSS classes

```html
<button
  ngpButton
  mgnpButton>
  Click me
</button>
```

The **_mgnp-\*_** directive must be alongside its corresponding **_ngp-\*_** directive from
`ng-primitives`. Is used incorrectly, the library throws a helpful error message indicating which
directive pairins is required.
