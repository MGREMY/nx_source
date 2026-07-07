---
name: Generator
order: 0
sourceUrl: 'https://github.com/mgremy/nx_source/tree/main/packages/plugin'
---

# Generators

**@mgremy/plugin** gives you two generators. The first one provides a preset for NX monorepo with
some eslint and github CI configuration. The second one provides an application generator for NX
monorepo, with basic **@mgremy/\*** dependencies.

## Preset

To generate an NX monorepo, use this command and follow instructions :

```bash
npx create-nx-plugin --preset=@mgremy/plugin
```

## Angular application

To generate an NX Angular application, use this command and follow instructions :

```bash
nx g @mgremy/plugin:app
```

This plugin uses base **@nx/angular:application** generator.
