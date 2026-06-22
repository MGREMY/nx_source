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
- **Styled wrappers** `@mgremy/ng-primitives`: Add TailwindCSS styling

## Usage pattern

```html
<button mgnpButton>
  Click me
</button>
```
