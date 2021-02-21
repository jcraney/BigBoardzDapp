import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ScoresService {
  constructor(private http: HttpClient) {}

  scoresUrl =
    'https://therundown-therundown-v1.p.rapidapi.com/sports/2/events/2020-09-20?include=scores&offset=0';

  headerObj = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'x-rapidapi-key': 'e0fcdd0b61msh17515c15c5f9ab9p1329b6jsn434f54b1d5bf',
    'x-rapidapi-host': 'therundown-therundown-v1.p.rapidapi.com',
  };

  requestOptions = {
    'headers': this.headerObj 
  };

  getScores() {
    return this.http.get(this.scoresUrl, this.requestOptions);
  }
}
