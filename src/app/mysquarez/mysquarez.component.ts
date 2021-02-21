import { Component, OnInit, OnDestroy } from '@angular/core';
/* import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore/'; */
// import { AuthService } from '../shared/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { PurchasedSquare } from '../board/board.component';

export interface PurchaseDetails {
  uid: string;
  id?: string;
  boardId: string;
  gameId: number;
  hostName: string;
  complete: boolean;
  numOfSquarez: string;
  priceOfSquare: string;
  status: string;
  total: string;
  versus: string;
  squarez: PurchasedSquare[];
}

@Component({
  selector: 'app-mysquarez',
  templateUrl: './mysquarez.component.html',
  styleUrls: ['./mysquarez.component.css'],
})
export class MysquarezComponent implements OnInit, OnDestroy {
  myOrders: Observable<PurchaseDetails[]> | undefined;
  mySquarez: Observable<PurchasedSquare[]> | undefined;
  orders: PurchaseDetails[] = [];
  purchasedSquarez: PurchasedSquare[] = [];
  authSub: any;
  ordersSub: any;
  mySquarezSub: any;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    /* this.authSub = this.auth.user$.subscribe((user) => {
      this.getMyOrders(user.uid);
    }); */
  }

  ngOnDestroy() {
    // this.authSub.unsubscribe();
    // this.ordersSub.unsubscribe();
  }

  getMyOrders = (uid: string) => {
    /* this.myOrdersRef = this.afs.collection('orders', (ref) =>
      ref.where('uid', '==', uid).where('complete', '==', true)
    );

    this.myOrders = this.myOrdersRef.valueChanges({ idField: 'id' });
    this.ordersSub = this.myOrders.subscribe((orders) => {
      this.orders = orders;
      this.orders.forEach((value, index) => {
        this.orders[index].squarez = [];
        this.getSquarezForOrder(value.id, value.boardId, index);
      });
    }); */
  };

  getSquarezForOrder = (orderId: string, boardId: string, i: number) => {
    

  };

  viewBoard = (boardId: string) => {
    console.log('routing to board with id: ', boardId);
    this.router.navigate(['/viewboard', boardId]);
  };
}

