import {Route} from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {ProductsListComponent} from "../../../../products/src/lib/pages/products-list/products-list.component";
import {ProductPageComponent} from "../../../../products/src/lib/pages/product-page/product-page.component";


export const appRoutes: Route[] = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'products',
        component: ProductsListComponent
    },
    {
        path: 'category/:categoryid',
        component: ProductsListComponent
    },
    {
        path: 'products/:productid',
        component: ProductPageComponent
    }
];
