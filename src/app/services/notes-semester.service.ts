import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NoteSemester} from "../models/notesSemester.model";
import {Diplome} from "../models/Diplome.model";

@Injectable({
  providedIn: 'root'
})
export class NotesSemesterService {

  private apiUrl = 'http://localhost:8085/notesSemester';

  constructor(private http: HttpClient) { }

  /*addNotesSemester(notesSemester: NoteSemester, IDdiplome: number): Observable<NoteSemester> {
    const url = `${this.apiUrl}/add/${IDdiplome}`;
   // return this.http.post<NoteSemester>(url, { notesSemester, IDdiplome });
    return this.http.post<NoteSemester>(url, notesSemester);

  }*/
  addNotesSemester(notesSemesterDto: NoteSemester, id: number): Observable<NoteSemester> {
    const url = `${this.apiUrl}/add/${id}`;
    return this.http.post<NoteSemester>(url, notesSemesterDto);
  }
}
