---
name: Pipes
sourceUrl: 'https://github.com/mgremy/nx_source/tree/main/packages/core/pipes'
---

# Pipes

**@mgremy/core/pipes** bundles reusable pipes.

## arrayFilter

**arrayFilter** (**ArrayFilterPipe<T>**) takes a generic parameter, a predicate as a first
parameter, and either **single** or **multiple** as a second.

The key difference is in **single** mode, the pipe uses **find()** on the array, whereas
**multiple** uses **filter()**.

### Usage

```angular-html
<some-component [items]="list | arrayFilter: myFilter : 'single'" />
```

```typescript
function myFilter<T>(x: T): boolean {
  // Some condition returning if the item passes the filter or not
}
```

## localizedDate

**localizedDate** (**LocalizedDatePipe**) takes the same arguments as the Angular's **DatePipe**,
but instead format the date to the corresponding format using **TRANSLATION_SERVICE**.

Check [here](/documentation/core/services/translation) to see how to setup **TRANSLATION_SERVICE**.

### Usage

```angular-html
{{ someDate | localizedDate }}
```

## enumKeyValuePair

**enumKeyValuePair** (**EnumKeyValuePairPipe**) takes an **Enum** and returns a **KeyValue<string,
number>[]**.

### Usage

```angular-html
@for (item of MyEnum | enumKeyValuePair; track $index) {
  {{ item.key }} : {{ item.value }}
}
```

```typescript
enum MyEnum {
  ITEM1,
  ITEM2,
  ITEM3,
}
```

## firstLetterUpper

**firstLetterUpper** (**FirstLetterUpperPipe**) act in the same way as **TitleCasePipe** but only
for the first character in the string.

### Usage

```angular-html
{{ 'some string' | firstLetterUpper }}
```
