import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BoardCreatorDialogComponent } from '../board-creator-dialog/board-creator-dialog.component';
/* import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore/'; */
import { Board } from '../shared/board.model';
import { Observable } from 'rxjs';
// import { AuthService } from '../shared/auth.service';
import { HttpClient } from '@angular/common/http';

interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
interface OpenSquare {
  id?: string;
  boardId: string;
  row: number;
  cell: number;
  homeNum: number;
  awayNum: number;
}
interface PurchasedSquare {
  uid: string;
  boardId: string;
  purchaseAddress: string;
  row: number;
  cell: number;
  homeNum: number;
  awayNum: number;
  initials: string;
  winner: boolean;
  winningQuarters: Array<number>;
}
@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css'],
})
export class HostComponent implements OnInit, OnDestroy {
  // boardCreatorDialogRef: MatDialogRef<BoardCreatorDialogComponent>;
  // myBoardzCollection: AngularFirestoreCollection<Board>;
  // testQueryBoardCollection: AngularFirestoreCollection<Board>;
  myBoardz: Observable<any[]> | undefined;
  boardz: Board[] = [];
  // openSquarezCollection: AngularFirestoreCollection<OpenSquare>;
  openSquarez: Observable<OpenSquare[]> | undefined;
  squareList: Array<OpenSquare> = [];
  buyerList: Array<string> = [];
  selectedSquare!: OpenSquare;
  purchasedSquare!: PurchasedSquare;
  // purchasedSquarezCollection: AngularFirestoreCollection<PurchasedSquare>;
  purchasedSquarez!: Observable<PurchasedSquare[]>;
  queryTestBoardz!: Observable<any[]>;
  hostId!: string;
  count!: number;
  isHost: boolean = false;
  authSub: any;
  hostSub: any;

  constructor(
    private dialog: MatDialog,
    /* private afs: AngularFirestore,
    private auth: AuthService, */
    private http: HttpClient
  ) {}

  ngOnInit() {
    /* this.authSub = this.auth.user$.subscribe((user) => {
      // console.log('user contains:', user);
      this.hostId = user.uid;
      const hostSnap = this.afs.doc(`hosts/${user.uid}`).get();
      this.hostSub = hostSnap.subscribe((host) => {
        // console.log(host.data());
        if (host.data() === undefined) {
          this.isHost = false;
          console.log('user is not a host');
        } else {
          this.isHost = true;
          console.log('user is a host', this.isHost);
        }
      });
      this.listMyBoards(user.uid);
      this.getAllPurchasedSquares();
    }); */
    this.buyerList = [
      'sb-5gvkq107990@personal.example.com',
      'sb-foyoj107986@personal.example.com',
      'sb-diq47o107891@personal.example.com',
      'sb-4l9zz107888@personal.example.com',
      'sb-7iire107887@personal.example.com',
      'sb-josrw107886@personal.example.com',
      'sb-kqg438107875@personal.example.com',
      'sb-u647uv97526@personal.example.com',
    ];
  }

  ngOnDestroy() {
    //this.authSub.unsubscribe();
    //this.hostSub.unsubscribe();
  }

  // TODO: board CRUD --Create done.
  launchBoardCreator = () => {
    /* this.boardCreatorDialogRef = this.dialog.open(BoardCreatorDialogComponent, {
      hasBackdrop: false,
    }); */
  };

  // TODO: listMyBoards()
  listMyBoards = (id: string) => {
    /* this.myBoardzCollection = this.afs.collection('boardz', (ref) =>
      ref.where('hostId', '==', id)
    ); */
    /* this.myBoardz = this.myBoardzCollection.valueChanges({ idField: 'id' });
    this.myBoardz.subscribe((boardz) => {
      this.count = boardz.length;
      this.boardz = boardz;
    }); */
  };
  // for testing
  // make fake purchase squares
  makeFakePurchaseSquarez = async (boardId: string) => {
    console.log('board id: ', boardId);
    const data = boardId;
    const res: Observable<any> = this.http.post(
      'https://us-central1-bitboardz-dev.cloudfunctions.net/makeFakePurchases',
      data
    );
    res.subscribe((val) => {
      console.log('whatever came back:', val);
    });
    // console.log('result received from makeFakePurchases: ', result);
  };

  // create official boardz
  createOfficial = async () => {
    const res: Observable<any> = this.http.get(
      'https://us-central1-bitboardz-dev.cloudfunctions.net/createOfficialBoardz'
    );
    res.subscribe((val) => {
      console.log('whatever came back:', val);
    });
    // console.log('result received from makeFakePurchases: ', result);
  };

  queryTest = () => {
    /* this.testQueryBoardCollection = this.afs.collection('boardz', (ref) =>
      ref.where('gameId', '==', 2019082951)
    ); */
    /* this.queryTestBoardz = this.testQueryBoardCollection.valueChanges({
      idField: 'id',
    }); */
  };

  getAllPurchasedSquares = () => {
    // this.afs.collectionGroup('purchasedSquarez');
  };

  selectWinners = () => {
    const res: Observable<any> = this.http.get(
      'https://us-central1-bitboardz-dev.cloudfunctions.net/selectWinners'
    );
    res.subscribe((val) => {
      console.log('whatever came back. ', val);
    });
  };
  // TODO: updateBoard()
  // TODO: deleteBoard()
  // TODO: refundSquarePurchase()
  // TODO: liveBoardz()
  // TODO: totalProfits()
  // TODO: totalRevenue()
  // TODO: boardInvites()
  // TODO: payWinners()
}

