
import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent implements OnInit {
  userid:any;
  allNotes:any = {}
  constructor(private notes:NotesService,private route:ActivatedRoute,private nav:Router){}
  ngOnInit(): void {
    // this.notes.getAllNotes().subscribe({
    //   next: (v)=>this.allNotes=v,
    //   error: (e)=>console.log(e)
    // });
    this.userid = localStorage.getItem('authUser')
    const dept:any = this.route.snapshot.paramMap.get('dept');
    this.notes.getNotesByDept(dept).subscribe({
      next: (v)=>this.allNotes=v,
      error: (e)=>console.log(e)
    })


  }

  goBack(){
    this.nav.navigateByUrl('/api/home');
  }

  onOpen(note:any){
    this.nav.navigateByUrl(`api/department/${note.department}/${note.id}`)
  }
  
  onDelAdmin(note:any){
    const dept = note.department
    this.notes.deleteNoteById(1,note.id,"admin").subscribe({
      next: (v)=>{
        console.log("Notes Deleted",v),
        // this.nav.navigateByUrl(`/api/profile/${userid}`)
        this.notes.getNotesByDept(dept).subscribe({
          next: (v)=>{this.allNotes=v,console.log(v)},
          error: (e)=>console.log(e)
        })
      }
    })
  }
}
