import {
  MgnpDatePickerCell,
  MgnpDatePickerCellRender,
  MgnpDatePickerDateButton,
  MgnpDatePickerGrid,
  MgnpDatePickerHeader,
  MgnpDatePickerLabel,
  MgnpDatePickerNextMonth,
  MgnpDatePickerPreviousMonth,
  MgnpDatePickerRowRender,
  MgnpDateRangePicker,
} from '@mgremy/ng-primitives/date-picker';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronLeftMini, heroChevronRightMini } from '@ng-icons/heroicons/mini';

import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [
    MgnpDateRangePicker,
    MgnpDatePickerPreviousMonth,
    MgnpDatePickerNextMonth,
    MgnpDatePickerLabel,
    MgnpDatePickerGrid,
    MgnpDatePickerHeader,
    MgnpDatePickerRowRender,
    MgnpDatePickerCell,
    MgnpDatePickerCellRender,
    MgnpDatePickerDateButton,
    NgIcon,
    DatePipe,
  ],
  template: `
    <div mgnpDateRangePicker #datePicker="mgnpDateRangePicker">
      <div mgnpDatePickerHeader>
        <button mgnpDatePickerPreviousMonth aria-label="previous month">
          <ng-icon name="heroChevronLeftMini" />
        </button>
        <h2 mgnpDatePickerLabel>{{ datePicker.state().focusedDate() | date: 'longDate' }}</h2>
        <button mgnpDatePickerNextMonth aria-label="next-month">
          <ng-icon name="heroChevronRightMini" />
        </button>
      </div>
      <table mgnpDatePickerGrid>
        <thead>
          <tr>
            <th scope="col" abbr="Sunday">S</th>
            <th scope="col" abbr="Monday">M</th>
            <th scope="col" abbr="Tuesday">T</th>
            <th scope="col" abbr="Wednesday">W</th>
            <th scope="col" abbr="Thursday">T</th>
            <th scope="col" abbr="Friday">F</th>
            <th scope="col" abbr="Saturday">S</th>
          </tr>
        </thead>
        <tbody>
          <tr *mgnpDatePickerRowRender>
            <td *mgnpDatePickerCellRender="let date" mgnpDatePickerCell>
              <button mgnpDatePickerDateButton>{{ date.getDate() }}</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  providers: [provideIcons({ heroChevronLeftMini, heroChevronRightMini })],
})
export default class RangePickerExample {}
