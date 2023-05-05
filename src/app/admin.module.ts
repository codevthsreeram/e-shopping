import { NgModule } from "@angular/core";
import { CategoryComponent } from "./components/admin/category/category.component";
import { ProductComponent } from "./components/admin/product/product.component";
import { AdminOrdersComponent } from "./components/admin/orders/admin-orders.component";
import { AdminDashboardComponent } from "./components/admin/dashboard/admin-dashboard.component";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BarChartComponent } from "./components/charts/bar-chart/bar-chart.component";
import { DonutChartComponent } from "./components/charts/donut-chart/donut-chart.component";
import { PieChartComponent } from "./components/charts/pie-chart/pie-chart.component";

const routes: Routes = [
    { path: 'admin/categories', component: CategoryComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'admin/products', component: ProductComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard] }
];

@NgModule({
    declarations: [
        CategoryComponent,
        ProductComponent,
        AdminOrdersComponent,
        AdminDashboardComponent,
        BarChartComponent,
        DonutChartComponent,
        PieChartComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NgbModule
    ],
    exports: [
        BarChartComponent,
        DonutChartComponent,
        PieChartComponent
    ],
    providers: []
})

export class AdminModule { }