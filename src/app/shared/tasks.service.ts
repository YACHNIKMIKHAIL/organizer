import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface ITask {
  id?: string
  title: string
  date?: string
}

@Injectable({providedIn: 'root'})
export class TasksService {
  static url = 'https://angularorganizer-d2ec8-default-rtdb.firebaseio.com/tasks'

  constructor(private http: HttpClient) {
  }

  create(task: ITask): Observable<Object> {
    return this.http
      .post(`${TasksService.url}/${task.date}.json`, task)
      .pipe(res => {
        console.log('create-resp', res)
        return res
      })
  }
}
