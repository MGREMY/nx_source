---
name: Styling
order: 2
icon: heroPaintBrush
---

# Styling

`@mgremy/ng-primitives` uses `TailwindCSS` variables in order to style its components. It provides a
bunch of new `TailwindCSS` tokens based on custom CSS variables, and map the required `ng-primitives`
styling variables to its own variables.

In a nutshell, this is how it works :

1. Create its CSS variables - they can be bind to `TailwindCSS` variables
2. Bind custom `TailwindCSS` tokens based on its variables
3. Bind `ng-primitives` variables to its CSS variables

## Dark mode

Dark mode is automatically applied when `.dark` class is present on the `&#60;html&#62;` or
`&#60;body&#62;` element. [This behavior can be bypassed](https://TailwindCSS.com/docs/dark-mode).

## Customization

Theme can be customized by providing new values to `--mg-*` CSS variables.

```css
@theme {
  --mg-background-ui: var(--color-white);

  @variant dark {
    --mg-background-ui: var(--color-black);
  }
}
```

## Default styles

### @mgremy/ng-primitives

<app-file-content name="mgnp"></app-file-content>

### ng-primitives mapping

<app-file-content name="ngp_tw"></app-file-content>
