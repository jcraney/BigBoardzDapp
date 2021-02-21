import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
/* import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore/'; */
import { Observable } from 'rxjs';

// import { AuthService } from '../shared/auth.service';

interface Board {
  id: string;
  ownerPaypal: string;
  gameId: string;
  hostId: string;
  hostName: string;
  startTime: Date;
  endTime: Date;
  homeTeam: string;
  awayTeam: string;
  boardFeeUSD: number;
  q1WinnerAddressF: string;
  q2WinnerAddressF: string;
  q3WinnerAddressF: string;
  q4WinnerAddressF: string;
  q1WinnerAddressB: string;
  q2WinnerAddressB: string;
  q3WinnerAddressB: string;
  q4WinnerAddressB: string;
  q1HomeScore: number;
  q2HomeScore: number;
  q3HomeScore: number;
  q4HomeScore: number;
  q1AwayScore: number;
  q2AwayScore: number;
  q3AwayScore: number;
  q4AwayScore: number;
  versus: string;
  winnersPaid: boolean;
  across: Array<number>;
  down: Array<number>;
}
interface CurrentBoard {
  ownerPaypal: string;
  gameId: string;
  hostId: string;
  hostName: string;
  startTime: Date;
  endTime: Date;
  homeTeam: string;
  awayTeam: string;
  boardFeeUSD: number;
  q1WinnerAddressF: string;
  q2WinnerAddressF: string;
  q3WinnerAddressF: string;
  q4WinnerAddressF: string;
  q1WinnerAddressB: string;
  q2WinnerAddressB: string;
  q3WinnerAddressB: string;
  q4WinnerAddressB: string;
  q1HomeScore: number;
  q2HomeScore: number;
  q3HomeScore: number;
  q4HomeScore: number;
  q1AwayScore: number;
  q2AwayScore: number;
  q3AwayScore: number;
  q4AwayScore: number;
  versus: string;
  winnersPaid: boolean;
  across: Array<number>;
  down: Array<number>;
}
interface OpenSquare {
  id?: string;
  boardId: string;
  row: number;
  cell: number;
  homeNum: number;
  awayNum: number;
}
export interface PurchasedSquare {
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
interface Order {
  uid: string;
  status: string;
}
// declare var paypal;
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit, OnDestroy {
  board!: Observable<Board>;
  nuBoard!: CurrentBoard;
  currentBoard!: CurrentBoard;
  // boardDocument!: AngularFirestoreDocument<Board>;
  // boardzCollection!: AngularFirestoreCollection<Board>;
  @Input() boardId?: string; // getting value from the parent
  // openSquarezCollection: AngularFirestoreCollection<OpenSquare>;
  openSquarez!: Observable<OpenSquare[]>;
  // openL7s: OpenSquare[];
  squareList!: Array<OpenSquare>;
  openCount!: number;
  selectedSquare!: OpenSquare;
  purchasedSquare!: PurchasedSquare;
  // purchasedSquarezCollection: AngularFirestoreCollection<PurchasedSquare>;
  purchasedSquarez!: Observable<PurchasedSquare[]>;
  purchasedL7s!: PurchasedSquare[];
  rows = new Array(10);
  showSuccess!: boolean;
  numOfSquarez!: number;
  selected!: number;
  userId!: string;
  authSub: any;
  boardSub: any;
  openSquareSub: any;
  purchasedSquareSub: any;

  constructor() {}

  ngOnInit() {
    /* this.authSub = this.auth.user$.subscribe((user) => {
      this.userId = user.uid;
    }); */
    for (let r = 0, len = this.rows.length; r < len; r++) {
      // tslint:disable-next-line:prefer-const
      let cells = new Array(10);
      this.rows[r] = cells;
    }
    // console.log('in ngOnInit, boardId is: ', this.boardId);
    if (this.boardId) {
      this.purchasedSquare = {
        uid: '',
        boardId: '',
        purchaseAddress: '',
        row: 0,
        cell: 0,
        homeNum: 0,
        awayNum: 0,
        initials: '',
        winner: false,
        winningQuarters: [],
      };
      this.getBoard();
      this.getOpenSquarez();
      this.getPurchasedSquarez();
      // console.log(this.squareList);
    } else {
      // board is being created
      console.log('currentBoard is: ', this.nuBoard);
      // this.board = this.currentBoard;
      this.nuBoard = {
        ownerPaypal: '',
        gameId: '',
        hostId: '',
        hostName: '',
        startTime: new Date(),
        endTime: new Date(),
        homeTeam: '',
        awayTeam: '',
        boardFeeUSD: 0,
        q1WinnerAddressF: '',
        q2WinnerAddressF: '',
        q3WinnerAddressF: '',
        q4WinnerAddressF: '',
        q1WinnerAddressB: '',
        q2WinnerAddressB: '',
        q3WinnerAddressB: '',
        q4WinnerAddressB: '',
        q1HomeScore: 0,
        q2HomeScore: 0,
        q3HomeScore: 0,
        q4HomeScore: 0,
        q1AwayScore: 0,
        q2AwayScore: 0,
        q3AwayScore: 0,
        q4AwayScore: 0,
        versus: '',
        winnersPaid: false,
        across: new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9),
        down: new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9),
      };
    }
  }

  addNewBoard = (board: Board) => {
    /* this.boardzCollection = this.afs.collection(`boardz`);
    this.boardzCollection
      .add(board)
      .then((docRef) => {
        console.log('Board written with ID: ', docRef.id);
        console.log('Board: ', board);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      }); */
  };

  getBoard = () => {
    // this.boardDocument = this.afs.doc(`boardz/${this.boardId}`);
    // this.board = this.boardDocument.valueChanges();
    /* this.boardSub = this.board.subscribe((board) => {
      this.currentBoard = board;
    }); */
    // console.log('this board is: ', this.board);
  };

  getOpenSquarez = () => {
    /* this.openSquarezCollection = this.afs.collection(
      `boardz/${this.boardId}/openSquarez`
    ); */
    /* this.openSquarez = this.openSquarezCollection.valueChanges({
      idField: 'id',
    }); */
    // console.log('openSquarez size', this.openSquarez);
    this.openSquareSub = this.openSquarez.subscribe((l7s) => {
      this.squareList = l7s;
      this.openCount = this.squareList.length;
      // console.log(l7s);
      for (let r = 0, len = l7s.length; r < len; r++) {
        // tslint:disable-next-line:prefer-const
        let sqRow = l7s[r].row;
        // tslint:disable-next-line:prefer-const
        let sqCell = l7s[r].cell;
        // l7s[r] is the square object.
        this.rows[sqRow][sqCell] = {};
        this.rows[sqRow][sqCell].initials = 'buy me';
      }
    });
  };

  getPurchasedSquarez = () => {
    /* this.purchasedSquarezCollection = this.afs.collection(
      `boardz/${this.boardId}/purchasedSquarez`
    ); */
    /* this.purchasedSquarez = this.purchasedSquarezCollection.valueChanges({
      idField: 'id',
    }); */
    this.purchasedSquareSub = this.purchasedSquarez.subscribe((val) => {
      for (let r = 0, len = val.length; r < len; r++) {
        // tslint:disable-next-line:prefer-const
        let sqRow = val[r].row;
        // tslint:disable-next-line:prefer-const
        let sqCell = val[r].cell;
        this.rows[sqRow][sqCell] = {};
        this.rows[sqRow][sqCell].initials = val[r].initials;
        // if my square
        if (val[r].uid === this.userId) {
          this.rows[sqRow][sqCell].mySquare = true;
        } else {
          this.rows[sqRow][sqCell].mySquare = false;
        }
        // if winner
        if (val[r].winner) {
          this.rows[sqRow][sqCell].winner = true;
        } else {
          this.rows[sqRow][sqCell].winner = false;
        }

        // console.log('initials for this square: ', val[r].initials);
      }
    });
  };

  shuffle = (array: []) => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      // currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  addToOrder = async () => {
    const totes = +this.numOfSquarez * +this.currentBoard.boardFeeUSD;
    const purchaseDetails = {
      uid: this.userId,
      status: 'pending',
      gameId: this.currentBoard.gameId,
      boardId: this.boardId,
      hostName: this.currentBoard.hostName,
      versus: this.currentBoard.homeTeam + ' vs. ' + this.currentBoard.awayTeam,
      numOfSquarez: this.numOfSquarez,
      priceOfSquare: this.currentBoard.boardFeeUSD,
      total: totes.toString(),
      complete: false,
    };
    console.log(
      'new order object for uid ',
      purchaseDetails.uid,
      ' with status: ',
      purchaseDetails.status
    );
    console.log(
      purchaseDetails.numOfSquarez,
      ' squarez ordered for board: ',
      purchaseDetails.boardId,
      ' for game: ',
      purchaseDetails.gameId,
      ' at a price of ',
      purchaseDetails.priceOfSquare,
      ' each.'
    );
    // const orderzRef = this.afs.collection('orders');
    console.log(purchaseDetails);
    // const addResult = await orderzRef.add(purchaseDetails);
    // console.log('addResult: ', addResult);
    // this.numOfSquarez = undefined;
  };

  randomizeDownAndAcross = () => {
    // this.nuBoard.down = this.shuffle(this.nuBoard.down);
    // this.nuBoard.across = this.shuffle(this.nuBoard.across);
  };

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.boardSub.unsubscribe();
    this.openSquareSub.unsubscribe();
    this.purchasedSquareSub.unsubscribe();
  }

  // TODO: reportIssue()
  // TODO: shareBoard()
}

