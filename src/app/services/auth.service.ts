import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: Observable<any>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
  }
  /* Sign up */
  async createNewUser(email: string, password: string) {
    await this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  /* Sign in */
  async SignInUser(email: string, password: string) {
    await this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  /* Sign out */
  SignOutUser() {
    this.angularFireAuth.signOut();
  }
}
