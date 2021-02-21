import { Component, OnInit, OnDestroy } from '@angular/core';
/* import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore'; */
// import { AuthService } from '../shared/auth.service';
import { Observable } from 'rxjs';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export interface User {
  displayName: string;
  email: string;
  phone: string;
  uid: string;
  ethAddress: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser!: Observable<User>;
  userId!: string;
  // userDoc: AngularFirestoreDocument<User>;
  user!: User;
  // authSub: any;
  // currentUserSub: any;
  editEthAddress!: boolean;
  emailFormControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor() {}

  ngOnInit() {
    /* this.authSub = this.auth.user$.subscribe((user) => {
      this.userId = user.uid;
      this.userDoc = this.afs.doc(`users/${user.uid}`);
      this.currentUser = this.userDoc.valueChanges();
      this.currentUserSub = this.currentUser.subscribe((cU) => {
        this.user = cU;
        if (this.user.paypalEmail) {
          this.editPaypalEmail = false;
        } else {
          this.editPaypalEmail = true;
        }
      });

      // console.log(currentUser);
       currentUser.subscribe(info => {
        console.log('user info', info.data());
        this.userinfo = info.data();
      }); 
    }); */
  }

  ngOnDestroy() {
    // this.currentUserSub.unsubscribe();
    // this.authSub.unsubscribe();
  }
}
