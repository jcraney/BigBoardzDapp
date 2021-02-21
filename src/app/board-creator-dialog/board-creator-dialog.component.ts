import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ScoresService } from '../shared/services/scores/scores.service';
import { Time } from '@angular/common';
import { BoardComponent } from '../board/board.component';
// import { AuthService } from '../shared/auth.service';

export interface Game {
  home: {
    score: {};
    abbr: string;
    to: number;
  };
  away: {
    score: {};
    abbr: string;
    to: number;
  };
  bp: number;
  down: number;
  togo: number;
  clock: Time;
  posteam: string;
  note: string;
  redzone: boolean;
  stadium: string;
  media: {
    radio: {
      home: any;
      away: any;
    };
    tv: string;
    sat: string;
    sathd: string;
  };
  yl: any;
  qtr: any;
}
interface CurrentBoard {
  ownerPaypal: string;
  gameId: string;
  hostId: string;
  hostName: string;
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
  winnersPaid: boolean;
  across: Array<number>;
  down: Array<number>;
}

@Component({
  selector: 'app-board-creator-dialog',
  templateUrl: './board-creator-dialog.component.html',
  styleUrls: ['./board-creator-dialog.component.css'],
})
export class BoardCreatorDialogComponent implements OnInit {
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  games: any[] = [];
  gameIds: string[] = [];
  scores: [] = [];
  hostPaypal: string | undefined;
  hostName: string | undefined;
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: "<div class='nav-btn next-slide'></div>",
    prevArrow: "<div class='nav-btn prev-slide'></div>",
    dots: false,
    infinite: false,
  };
  currentBoard: CurrentBoard;
  @ViewChild(BoardComponent, { static: false }) boardComponent: any;

  // tslint:disable-next-line:variable-name
  constructor(
    // tslint:disable-next-line:variable-name
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<BoardCreatorDialogComponent>,
    private scoresService: ScoresService
  ) // private auth: AuthService
  {
    this.currentBoard = {
      ownerPaypal: '',
      gameId: '',
      hostId: '',
      hostName: '',
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
      winnersPaid: false,
      across: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      down: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  }

  ngOnInit() {
    /* this.auth.user$.subscribe((user) => {
      this.currentBoard.hostId = user.uid;
      this.currentBoard.ownerPaypal = user.paypalEmail;
      this.currentBoard.hostName = user.displayName;
    }); */
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.scoresService.getScores().subscribe((data) => {
      // this.games = Object.values(data);
      this.games = Object.values(data);
      this.gameIds = Object.keys(data);
      // tslint:disable-next-line:no-shadowed-variable
      for (const { game, index } of this.games.map((game, index) => ({
        game,
        index,
      }))) {
        game.id = this.gameIds[index];
      }
      // console.log('games is: ', this.games);
    });
    console.log(
      'currentBoard object in board-creator-dialog: ',
      this.currentBoard
    );
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    /* this.auth.user$.subscribe((user) => {
      this.currentBoard.hostId = user.uid;
    }); */
    this.currentBoard = this.boardComponent.nuBoard;
  }

  selectGame = (game: any) => {
    console.log('selected game', game);
    this.currentBoard.gameId = game.id;
    this.currentBoard.homeTeam = game.home.abbr;
    this.currentBoard.awayTeam = game.away.abbr;
    this.currentBoard.across = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.currentBoard.down = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  };

  add = () => {
    this.boardComponent.addNewBoard(this.currentBoard);
    this.dialogRef.close();
  };

  close = () => {
    this.dialogRef.close();
    console.log('Closing Board: ', this.currentBoard);
  };

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }
}

