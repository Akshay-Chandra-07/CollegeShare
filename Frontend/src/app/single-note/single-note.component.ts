import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrl: './single-note.component.css'
})
export class SingleNoteComponent implements OnInit {
  constructor(private note:NotesService,private route:ActivatedRoute,private nav:Router){}
  singleNote:any;
  type:any;
  dept:any;
  id:any
  ngOnInit(): void {
    this.dept = this.route.snapshot.paramMap.get('dept')
    this.id = this.route.snapshot.paramMap.get('id')
    this.note.getNotesByNoteId(this.dept,this.id).subscribe({
      next: (v)=>{this.singleNote=v[0],
        console.log(this.singleNote.file_url)
        if(this.singleNote.file_url.endsWith('.pdf')){
          this.type = "pdf";
        }
      },
      error: (e)=>console.log(e)
    })
  }

  goBack(){
    this.nav.navigateByUrl(`api/department/${this.dept}`)
  }
}
