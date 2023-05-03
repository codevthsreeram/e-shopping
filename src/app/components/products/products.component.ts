import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Category } from "src/app/models/category.model";
import { Product } from "src/app/models/product.model";
import { ShoppingCartItem } from "src/app/models/shopping-cart-item";
import { CategoryService } from "src/app/services/category.service";
import { ProductService } from "src/app/services/product.service";
import { ShoppingCartService } from "src/app/services/shopping-cart.service";

@Component({
    selector: 'products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
    products: Product[] = [];
    categories: Category[] = [];
    selectedCategory: string = '';
    searchTerm: string;
    constructor(private _productService: ProductService, private _categoryService: CategoryService, private _cartService: ShoppingCartService) {
    }
    ngOnInit(): void {
        this.loadProducts();
        this.loadCategories();
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
}