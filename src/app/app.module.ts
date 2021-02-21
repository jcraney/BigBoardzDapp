import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { BoardCreatorDialogComponent } from './board-creator-dialog/board-creator-dialog.component';
import { HostComponent } from './host/host.component';
import { MysquarezComponent } from './mysquarez/mysquarez.component';
import { NavComponent } from './nav/nav.component';
import { OpenBoardzComponent } from './open-boardz/open-boardz.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewBoardComponent } from './view-board/view-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SlickCarouselModule } from 'ngx-slick-carousel';
//import { StoreModule } from '@ngrx/store';
//import { simpleReducer } from './simple.reducer';



@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardCreatorDialogComponent,
    HostComponent,
    MysquarezComponent,
    NavComponent,
    OpenBoardzComponent,
    ProfileComponent,
    ViewBoardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
