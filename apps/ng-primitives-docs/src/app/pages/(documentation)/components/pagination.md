---
name: 'Pagination'
sourceUrl: 'https://github.com/mgremy/nx_source/tree/main/libs/ng-primitives/pagination'
---

# Pagination

The Pagination primitives provide a set of directives to create a pagination control. The pagination
control is used to navigate through a set of data that is split into multiple pages.

## Usage

### Default

```html
<nav
  [(ngpPaginationPage)]="page"
  ngpPagination
  ngpPaginationPageCount="5"
  mgnpPagination
  aria-label="Pagination Navigation">
  <ul>
    <li>
      <a
        ngpPaginationFirst
        aria-label="First Page">
        <ng-icon name="heroChevronDoubleLeft" />
      </a>
    </li>

    <li>
      <a
        ngpPaginationPrevious
        aria-label="Previous Page">
        <ng-icon name="heroChevronLeft" />
      </a>
    </li>

    <li>
      <a
        ngpPaginationButton
        ngpPaginationButtonPage="1"
        aria-label="Page 1">
        1
      </a>
    </li>
    <li>
      <a
        ngpPaginationButton
        ngpPaginationButtonPage="2"
        aria-label="Page 2">
        2
      </a>
    </li>
    <li>
      <a
        ngpPaginationButton
        ngpPaginationButtonPage="3"
        aria-label="Page 3">
        3
      </a>
    </li>
    <li>
      <a
        ngpPaginationButton
        ngpPaginationButtonPage="4"
        aria-label="Page 4">
        4
      </a>
    </li>
    <li>
      <a
        ngpPaginationButton
        ngpPaginationButtonPage="5"
        aria-label="Page 5">
        5
      </a>
    </li>

    <li>
      <a
        ngpPaginationNext
        aria-label="Next Page">
        <ng-icon name="heroChevronRight" />
      </a>
    </li>

    <li>
      <a
        ngpPaginationLast
        aria-label="Last Page">
        <ng-icon name="heroChevronDoubleRight" />
      </a>
    </li>
  </ul>
</nav>
```

## Theme

<app-file-content name="pagination"></app-file-content>
