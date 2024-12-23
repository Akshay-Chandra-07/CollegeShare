import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  apiUrl:string = 'http://localhost:5000/api'

  constructor(private http:HttpClient) { }

  getNotesByDept(dept:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/department/${dept}`)
  }

  getNotesByNoteId(dept:string,id:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/department/${dept}/${id}`)
  }

  getNotesByUserId(user:any):Observable<any>{
    console.log(user)
    return this.http.get(`${this.apiUrl}/profile/${user}`)
  }

  getAllNotes():Observable<any>{
    return this.http.get(`${this.apiUrl}/notesall`)
  }

  // getNotes(user:any):Observable<any>{
  //   return this.http.get(`${this.apiUrl}/notes`,user)
  // }

  addNote(userid:any,data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/profile/${userid}/notes`,data)
  }

  deleteNoteById(userid:any,id:any,role:any){
    return this.http.delete(`${this.apiUrl}/profile/${userid}/${id}/${role}`)
  }

}
