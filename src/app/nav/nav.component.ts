import { Component } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
// import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
// import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  isHandset$: Observable<BreakpointState> = this.breakpointObserver.observe(
    Breakpoints.Handset
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  connectToWallet = () => {

  }
}
