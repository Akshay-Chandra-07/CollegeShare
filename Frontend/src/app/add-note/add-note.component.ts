import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotesService } from '../services/notes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css'
})
export class AddNoteComponent {
  selectedFile: File | null = null;
  constructor(private notes:NotesService,private route:ActivatedRoute,private nav:Router){}

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onCreate(note:NgForm){
    const userid = this.route.snapshot.paramMap.get('userid')
    const formData = new FormData()
    formData.append('title', note.value.title);
    formData.append('content', note.value.content);
    // formData.append('uploaded_by',userid);
    if(userid){
      formData.append('uploaded_by',userid)
    }
    formData.append('department',note.value.department)
    formData.append('year',note.value.year)
    if(this.selectedFile){
      formData.append('file',this.selectedFile)
    }
    this.notes.addNote(userid,formData).subscribe({
      next: (v)=>{console.log(v)},
      error: (e)=>{console.log(e)}
    })

    this.nav.navigateByUrl(`/api/profile/${userid}`)
  }
}
