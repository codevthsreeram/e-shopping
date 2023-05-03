import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { ShoppingCartService } from "src/app/services/shopping-cart.service";

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent {
    shoppingCartItemCount$: Observable<number>;
    constructor(private router: Router, public authService: AuthService, private _cartService: ShoppingCartService) {
        this.shoppingCartItemCount$ = _cartService.cartCount$;
    }
    logout() {
        this._cartService.clearCartItems();
        localStorage.removeItem('displayName');
        localStorage.removeItem('loggedInUserId');
        localStorage.removeItem('isAdmin');

        this.router.navigate(['/login']);
    }
}