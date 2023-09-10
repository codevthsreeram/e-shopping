import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, Subscription } from "rxjs";
import { Category } from "src/app/models/category.model";
import { Product } from "src/app/models/product.model";
import { ShoppingCartItem } from "src/app/models/shopping-cart-item";
import { Wishlist } from "src/app/models/wishlist.model";
import { AuthService } from "src/app/services/auth.service";
import { CategoryService } from "src/app/services/category.service";
import { ProductService } from "src/app/services/product.service";
import { ShoppingCartService } from "src/app/services/shopping-cart.service";
import { WishlistService } from "src/app/services/wishlist.service";

@Component({
    selector: 'products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
    wishlist: Wishlist[] = [];
    products: Product[] = [];
    categories: Category[] = [];
    selectedCategory: string = '';
    searchTerm: string;
    constructor(
        private _productService: ProductService,
        private _categoryService: CategoryService,
        private _cartService: ShoppingCartService,
        private _wishlistService: WishlistService,
        public _authService: AuthService,
        private toastrService: ToastrService
    ) {
    }
    ngOnInit(): void {
        this.loadProducts();
        this.loadCategories();
        this.loadWishlist();
    }
    loadProducts() {
        this._productService.read(this.searchTerm, this.selectedCategory)
            .subscribe(response => {
                this.products = response.map((data) => {
                    return {
                        id: data.payload.doc.id,
                        ...data.payload.doc.data() as Product
                    }
                });
            })
    }
    loadCategories() {
        this._categoryService.read()
            .subscribe(response => {
                this.categories = response.map((data) => {
                    return {
                        id: data.payload.doc.id,
                        ...data.payload.doc.data() as Category
                    }
                });
            })
    }
    loadWishlist() {
        this._wishlistService.read(this._authService.loggedInUserId!)
            .subscribe(response => {
                this.wishlist = response.map((data) => {
                    return {
                        id: data.payload.doc.id,
                        ...data.payload.doc.data() as Wishlist
                    }
                });
            })
    }
    changeCategory($event: any) {
        if ($event.target.selectedIndex > 0)
            this.selectedCategory = this.categories[$event.target.selectedIndex - 1].id!;
        else
            this.selectedCategory = '';
        this.loadProducts();
    }
    addToCart(_product: Product) {
        let _cartItem = _product as ShoppingCartItem;
        _cartItem.quantity = 1;
        _cartItem.totalPrice = _cartItem.quantity * _cartItem.price;
        this._cartService.addItemToCart(_cartItem);
        if (this.getQuantity(_product) == 1)
            this.toastrService.success(`Item added to cart..!`);
    }
    removeFromCart(_product: Product) {
        let _cartItem = _product as ShoppingCartItem;
        _cartItem.quantity = -1;
        this._cartService.removeItemFromCart(_cartItem);
    }
    getQuantity(_product: Product) {
        let _itemQty: number = 0;
        this._cartService.CartItems.filter(item => item.id === _product.id).forEach(_item => { _itemQty += _item.quantity })
        return _itemQty;
    }
    wishlistExists(id: any): boolean {
        if (this.wishlist.length > 0) {
            let results = this.wishlist.filter(x => x.productId == id);
            return results.length > 0;
        }
        else
            return false;
    }
    addToWishlist(_product: Product) {
        let wishlist = new Wishlist();
        wishlist.productId = _product.id!;
        wishlist.title = _product.title;
        wishlist.price = _product.price;
        wishlist.category = _product.category;
        wishlist.imageUrl = _product.imageUrl;
        wishlist.userId = this._authService.loggedInUserId!;
        this._wishlistService.create(wishlist);
        this.toastrService.success(`Item added to wishlist..!`);
    }
    removeFromWishlist(id: any) {
        let results = this.wishlist.filter(x => x.productId == id);
        this._wishlistService.delete(results.shift()?.id!);
        this.toastrService.success(`Item removed from wishlist..!`);
    }
}