import { Component, OnInit } from '@angular/core';
/* import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore'; */
import { Observable } from 'rxjs';
// import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-board',
  templateUrl: './view-board.component.html',
  styleUrls: ['./view-board.component.css'],
})
export class ViewBoardComponent implements OnInit {
  // board: AngularFirestoreDocument<unknown>;
  id: any;
  constructor(
    // private afs: AngularFirestore,
    // private angularFireAuth: AngularFireAuth,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((param) => {
      console.log(param);
      this.id = param.boardId;
    });
  }
}
