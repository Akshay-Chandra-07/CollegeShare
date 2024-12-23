import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  user:any;
  constructor(
    private nav:Router,
  ){ }

  onHome(){
    this.nav.navigateByUrl('/api/home')
  }

  onProfile(){
    const userid = localStorage.getItem('authUser')
    console.log(userid)
    this.nav.navigateByUrl(`/api/profile/${userid}`);
  }

  onLogout(){
    localStorage.removeItem('authUser')
    this.nav.navigateByUrl('/api/auth');
  }
}
