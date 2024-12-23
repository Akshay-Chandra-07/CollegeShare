import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  authUser:any;
  userAllNotes:any;
  constructor(private notes:NotesService,
    private route:ActivatedRoute,
    private nav:Router,
  ){ }
  

  ngOnInit(): void {
    // this.authUser = localStorage.getItem('authUser')
    const userid:any = this.route.snapshot.paramMap.get('userid');
    console.log(userid)
    this.notes.getNotesByUserId(userid).subscribe({
      next: (v)=>{this.userAllNotes=v,console.log(v)},
      error: (e)=>console.log(e)
    })

  }

  onOpen(note:any){
    this.nav.navigateByUrl(`/api/department/${note.department}/${note.id}`)
  }

  goBack(){
    this.nav.navigateByUrl(`/api/home`)
  }

  onDel(note:any){
    console.log("Deleting note");
    console.log(note)
    const userid = note.uploaded_by
    this.notes.deleteNoteById(userid,note.id,"student").subscribe({
      next: (v)=>{
        console.log("Notes Deleted",v),
        // this.nav.navigateByUrl(`/api/profile/${userid}`)
        this.notes.getNotesByUserId(userid).subscribe({
          next: (v)=>{this.userAllNotes=v,console.log(v)},
          error: (e)=>console.log(e)
        })
      }
    })
  }

  onAdd(){
    const userid:any = this.route.snapshot.paramMap.get('userid');
    this.nav.navigateByUrl(`/api/profile/${userid}/create`)
  }
}
