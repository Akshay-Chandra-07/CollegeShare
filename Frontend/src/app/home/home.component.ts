import { Component } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private notes:NotesService,private route:Router){}
  
  onDepSelect(department:string){
    // const Params = new HttpParams().set("dept",department)
    this.route.navigateByUrl(`api/department/${department}`)
  }
}
