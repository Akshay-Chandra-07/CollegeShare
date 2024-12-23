import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { NotesComponent } from './notes/notes.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SingleNoteComponent } from './single-note/single-note.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { PdfPipe } from './pdf.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NotesComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ProfileComponent,
    SingleNoteComponent,
    AddNoteComponent,
    PdfPipe
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    FormsModule
    
  ],
  providers: [
    provideHttpClient(),
    provideClientHydration(),
    AuthComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
