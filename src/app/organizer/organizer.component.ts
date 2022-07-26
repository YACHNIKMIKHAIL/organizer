import {Component, OnInit} from '@angular/core';
import {DateService} from "../shared/date.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ITask, TasksService} from "../shared/tasks.service";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  form: FormGroup<{ title: FormControl<string | null> }>
  tasks: ITask[] = []

  constructor(public dateService: DateService,
              private tasksService: TasksService) {
    this.form = {} as any
  }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => this.tasksService.load(value))
    ).subscribe(tasks => this.tasks = tasks)

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  submit() {
    const {title} = this.form.value
    const newTask: ITask = {
      title: title ? title : 'No title',
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }
    this.tasksService.create(newTask).subscribe((task: ITask) => {
      this.form.reset()
    }, err => console.error('err', err))
  }
}
