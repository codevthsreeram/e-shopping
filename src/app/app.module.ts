import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './services/auth.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ProductsComponent } from './components/products/products.component';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderService } from './services/order.service';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { MyDashboardComponent } from './components/my-dashboard/my-dashboard.component';
import { UnAuthorizedComponent } from './components/un-authorized/un-authorized.component';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AdminModule } from './admin.module';
import { WishlistService } from './services/wishlist.service';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'un-authorized', component: UnAuthorizedComponent },
  { path: 'my-dashboard', component: MyDashboardComponent, canActivate: [AuthGuard] },
  { path: 'order-detail/:id', component: OrderDetailComponent, canActivate: [AuthGuard] },
  { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavBarComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    OrderDetailComponent,
    MyDashboardComponent,
    WishlistComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule.forRoot(routes),
    AdminModule,
    NgbModule
  ],
  providers: [AuthService, CategoryService, ProductService, ShoppingCartService, OrderService, AuthGuard, AdminGuard, WishlistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
