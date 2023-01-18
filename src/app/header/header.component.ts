import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuth!: boolean;
  constructor(
    private authService: AuthService,
    private angularFireAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.angularFireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
  }

  onSignOut() {
    this.authService.SignOutUser();
  }
}
