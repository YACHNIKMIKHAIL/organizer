import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class TasksService {
  static url = 'https://angularorganizer-d2ec8-default-rtdb.firebaseio.com/tasks'

  constructor(private http: HttpClient) {
  }

}
