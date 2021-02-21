import { Component, OnInit } from '@angular/core';
/* import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore'; */
import { Observable } from 'rxjs';
import { ScoresService } from '../shared/scores.service';

interface Board {
  id: string;
  ownerPaypal: string;
  hostId: string;
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
  winnersPaid: number;
  across: Array<number>;
  down: Array<number>;
}

@Component({
  selector: 'app-open-boardz',
  templateUrl: './open-boardz.component.html',
  styleUrls: ['./open-boardz.component.css'],
})
export class OpenBoardzComponent implements OnInit {
  // boardzCollection: AngularFirestoreCollection<Board>;
  // boardzCollection: AngularFirestoreCollection<Board>;
  boardz: Board[] = [];
  data: any;
  games: any;
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    //nextArrow: '<i class="material-icons">keyboard_arrow_right</i>',
    //prevArrow: '<i class="material-icons">keyboard_arrow_left</i>',
    dots: false,
    infinite: false,
  };

  constructor(private scoresService: ScoresService) {}

  ngOnInit() {
    // get all upcoming games
    /* this.scoresService.getScores().subscribe((response) => {
      this.data = response;

      this.games = this.data.events;
      
    }); */
  }

  getBoardz = (id: string) => {
    // pass game Id to this function
    console.log('game id: ', id);
  };
}
