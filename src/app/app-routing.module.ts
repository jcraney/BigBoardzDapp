import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenBoardzComponent } from './open-boardz/open-boardz.component';
import { HostComponent } from './host/host.component';
import { MysquarezComponent } from './mysquarez/mysquarez.component';
//import { LoginComponent } from './login/login.component';
//import { AuthGuard } from './shared/auth.guard';
//import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewBoardComponent } from './view-board/view-board.component';

const routes: Routes = [
  {
    path: 'openboardz',
    component: OpenBoardzComponent
    //canActivate: [AuthGuard],
  },
  { path: 'host', component: HostComponent/* , canActivate: [AuthGuard] */ },
  {
    path: 'mysquarez',
    component: MysquarezComponent,
    //canActivate: [AuthGuard],
  },
  { path: 'profile', component: ProfileComponent/* , canActivate: [AuthGuard] */ },
  {
    path: 'viewboard/:boardId',
    component: ViewBoardComponent
    /* canActivate: [AuthGuard], */
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
