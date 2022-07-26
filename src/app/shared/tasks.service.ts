import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

export interface ITask {
  id?: string
  title: string
  date?: string
}

interface ICreateResponse {
  name: string
}

@Injectable({providedIn: 'root'})
export class TasksService {
  static url = 'https://angularorganizer-d2ec8-default-rtdb.firebaseio.com/tasks'

  constructor(private http: HttpClient) {
  }

  load(date: moment.Moment): Observable<ITask[]> {
    return this.http
      .get<ITask[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map(tasks => {
        if (!tasks) return []
        return Object.keys(tasks).map((key: any) => {
          console.log('key', key)
          return {...tasks[key], id: key}
        })
      }))
  }

  create(task: ITask): Observable<ITask> {
    return this.http
      .post<ICreateResponse>(`${TasksService.url}/${task.date}.json`, task)
      .pipe(map(res => {
        console.log('create-resp', res.name)
        return {...task, id: res.name}
      }))
  }

  remove(task: ITask): Observable<void> {
    return this.http
      .delete<void>(`${TasksService.url}/${task.date}/${task.id}.json`)
  }
}
