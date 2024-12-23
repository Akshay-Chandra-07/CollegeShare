import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NotesComponent } from './notes/notes.component';
import { SingleNoteComponent } from './single-note/single-note.component';
import { AddNoteComponent } from './add-note/add-note.component';

const routes: Routes = [
  {path:"api/auth",component:AuthComponent},
  {path:"api/home",component:HomeComponent},
  {path:'api/department/:dept',component:NotesComponent},
  {path:'api/department/:dept/:id',component:SingleNoteComponent},
  {path:'api/profile/:userid',component:ProfileComponent},
  {path:'api/profile/:userid/create',component:AddNoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
