# @mgremy/ng-primitives-extended

`@mgremy/ng-primitives-extended` is a library built on top of
[Angular Primitives](https://angularprimitives.com/).

It provides styled wrappers and directives using Tailwind CSS 4.

## Installation

Install the library by running this command in your project:

```bash
npm i --save-dev ng-primitives @mgremy/ng-primitives @mgremy/ng-primitives-extended tailwindcss @tailwindcss/postcss
```

For the configuration of TailwindCSS, check
[this page](https://tailwindcss.com/docs/installation/framework-guides/angular).

Then in your global css file (e.g `style.css`) add:

```css
@import 'tailwindcss';
@import '@mgremy/ng-primitives/theme/mgnp.css';
```

## Usage

In your template, when you are using a primitive from `ng-primitives`, add the corresponding styling
directive:

```typescript
import { MgnpButton } from '@mgremy/ng-primitives/button';

import { Component } from '@angular/core';
import { NgpButton } from 'ng-primitives/button';

@Component({
  imports: [NgpButton, MgnpButton],
  template: `<button
    ngpButton
    mgnpButton>
    Default
  </button>`,
})
export default class MyComponent {}
```

## Documentation

For a complete documentation : https://doc.mgremy.xyz/ng-primitives

## License

This project is licensed under the Apache License 2.0.
