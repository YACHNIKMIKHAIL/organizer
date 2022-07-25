import {Component, OnInit} from '@angular/core';
import * as moment from "moment";
import {DateService} from "../shared/date.service";

interface Day {
  value: moment.Moment
  active: boolean
  disabled: boolean
  elected: boolean
}

interface Week {
  days: Day[]
}


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})


export class CalendarComponent implements OnInit {

  calendar: Week[] | undefined

  constructor(private dateService: DateService) {
  }

  ngOnInit(): void {
    this.dateService.date.subscribe(this.generate.bind(this))
  }

  generate(now: moment.Moment) {
    const startDay = now.clone().startOf('month').startOf('week')
    const endDay = now.clone().endOf('month').endOf('week')
    const date = startDay.subtract(1, 'day')
    const calendar = []

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone()
            const active = moment().isSame(value, 'date')
            const disabled = !moment().isSame(value, 'month')
            const selected = moment().isSame(value, 'date')

            return {
              value, active, disabled, selected
            }
          })
      })
      console.log(calendar)
    }
  }
}
