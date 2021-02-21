import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// import { AngularFirestore } from '@angular/fire/firestore';
import { Board } from '../../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardzService {
  constructor(/*private firestore: AngularFirestore*/) {}

  newBoardForm = new FormGroup({
    ownerPaypal: new FormControl(''),
    hostId: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    homeTeam: new FormControl(''),
    awayTeam: new FormControl(''),
    boardFeeUSD: new FormControl(''),
    // boardFeeBTC: new FormControl(''),
    // collectionAddress: new FormControl(''),
    q1WinnerAddress: new FormControl(''),
    q2WinnerAddress: new FormControl(''),
    q3WinnerAddress: new FormControl(''),
    q4WinnerAddress: new FormControl(''),
    q1HomeScore: new FormControl(''),
    q2HomeScore: new FormControl(''),
    q3HomeScore: new FormControl(''),
    q4HomeScore: new FormControl(''),
    q1AwayScore: new FormControl(''),
    q2AwayScore: new FormControl(''),
    q3AwayScore: new FormControl(''),
    q4AwayScore: new FormControl(''),
    winnersPaid: new FormControl(''),
    across: new FormControl(''),
    down: new FormControl(''),
    // purchasedSquarez: new FormControl('')
  });

  newSquareForm = new FormGroup({
    uid: new FormControl(''),
    boardId: new FormControl(''),
    paypalAddress: new FormControl(''),
    row: new FormControl(''),
    cell: new FormControl(''),
    homeNum: new FormControl(''),
    awayNum: new FormControl(''),
    initials: new FormControl(''),
    winner: new FormControl(''),
  });

  createNewBoard(board: Board) {
    return new Promise<any>((resolve, reject) => {
      /* this.firestore
        .collection('boardz')
        .add(board)
        .then(
          (res) => {},
          (err) => reject(err)
        ); */
    });
  }

  getAllBoardz() {
    return /* this.firestore.collection('boardz').snapshotChanges() */;
  }

  getBoard(data: any) {
    return /* this.firestore.collection('boardz/' + data).snapshotChanges() */;
  }

  updateBoard(data: any) {
    /* return this.firestore
      .collection('boardz')
      .doc(data.payload.doc.id)
      .set({ board: data.paylod.doc }); */
  }

  deleteBoard(data: any) {
    /* return this.firestore
      .collection('boardz')
      .doc(data.payload.doc.id)
      .delete(); */
  }
}
