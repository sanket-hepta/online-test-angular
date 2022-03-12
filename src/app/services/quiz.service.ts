import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  get(url: string){
    return this.http.get(url);
  }

  getAllSubject(){
    return [
      {
        'file_path': '',
        'name': 'Select Subject'
      },

      {
        'file_path': 'assets/data/javascript.json',
        'name': 'JavaScript'
      },

      {
        'file_path': 'assets/data/aspnet.json',
        'name': 'ASP .Net'
      },

      {
        'file_path': 'assets/data/csharp.json',
        'name': 'C#'
      }
    ]
  }
}
