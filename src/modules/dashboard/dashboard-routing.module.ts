/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { DashboardModule } from './dashboard.module';

/* Containers */
import * as dashboardContainers from './containers';

/* Guards */
import * as dashboardGuards from './guards'
import { DashboardComponent, VerifyIndentComponent, ViewRecivingComponent } from './containers';
import { AddIndentComponent } from './containers/add-indent/add-indent.component';
import { AddReceivingComponent } from './containers/add-receiving/add-receiving.component';
import { AddStockComponent } from './containers/add-stock/add-stock.component';
import { ViewStockComponent } from './containers/view-stock/view-stock.component';
import { RemoveStockComponent } from './containers/remove-stock/remove-stock.component';
import { LayoutDashboardComponent } from '@modules/navigation/layouts/layout-dashboard/layout-dashboard.component';
import { StockDetailsComponent } from './containers/stock-details/stock-details.component';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: LayoutDashboardComponent, children:[
            {path:'verifyIndent', component: VerifyIndentComponent}, 
            {path:'viewReceiving', component:ViewRecivingComponent},
            {path:'addIndent', component:AddIndentComponent},
            {path:'addReceiving', component:AddReceivingComponent},
            {path:'addStock', component: AddStockComponent},
            {path:'viewStock', component:ViewStockComponent},
            {path:'removeStock', component:RemoveStockComponent},
            {path:'dashboard',   component:DashboardComponent},
            {path:'stockDetails/:userId/:categoryId', component: StockDetailsComponent}
        ]
    },


    // {
    //     path: 'static',
    //     data: {
    //         title: 'Smart-City',
    //         breadcrumbs: [
    //             {
    //                 text: 'Dashboard',
    //                 link: '/dashboard',
    //             },
    //             {
    //                 text: 'Static',
    //                 active: true,
    //             },
    //         ],
    //     } as SBRouteData,
    //     canActivate: [],
    //     component: dashboardContainers.StaticComponent,
    // },
    // {
    //     path: 'light',
    //     data: {
    //         title: 'Smart-City',
    //         breadcrumbs: [
    //             {
    //                 text: 'Dashboard',
    //                 link: '/dashboard',
    //             },
    //             {
    //                 text: 'Light',
    //                 active: true,
    //             },
    //         ],
    //     } as SBRouteData,
    //     canActivate: [],
    //     component: dashboardContainers.LightComponent,
    // },
    // {
    //     path: 'verifyIndent',
    //     data: {
    //         title: 'Dashboard Indent - Smart-City',
    //         breadcrumbs: [
    //             {
    //                 text: 'Dashboard',
    //                 link: '/dashboard',
    //             },
    //             {
    //                 text: 'indent',
    //                 active: true,
    //             },
    //         ],
    //     } as SBRouteData,
    //     canActivate: [],
    //     component: dashboardContainers.VerifyIndentComponent,
    // },
    // {
    //     path: 'viewReceiving',
    //     data: {
    //         title: 'Dashboard Receiving - Smart-City',
    //         breadcrumbs: [
    //             {
    //                 text: 'Dashboard',
    //                 link: '/dashboard',
    //             },
    //             {
    //                 text: 'receiving',
    //                 active: true,
    //             },
    //         ],
    //     } as SBRouteData,
    //     canActivate: [],
    //     component: dashboardContainers.ViewRecivingComponent,
    // },
];

@NgModule({
    imports: [DashboardModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
