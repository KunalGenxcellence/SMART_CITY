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
import { VerifyIndentComponent, ViewRecivingComponent } from './containers';
import { AddIndentComponent } from './containers/add-indent/add-indent.component';
import { AddReceivingComponent } from './containers/add-receiving/add-receiving.component';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: dashboardContainers.DashboardComponent, children:[
            {path:'verifyIndent', component: VerifyIndentComponent}, 
            {path:'viewReceiving', component:ViewRecivingComponent},
            {path:'addIndent', component:AddIndentComponent},
            {path:'addReceiving', component:AddReceivingComponent}
        ]
    },


    {
        path: 'static',
        data: {
            title: 'Dashboard Static - SB Admin Angular',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Static',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: dashboardContainers.StaticComponent,
    },
    {
        path: 'light',
        data: {
            title: 'Dashboard Light - SB Admin Angular',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Light',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: dashboardContainers.LightComponent,
    },
    // {
    //     path: 'verifyIndent',
    //     data: {
    //         title: 'Dashboard Indent - SB Admin Angular',
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
    //         title: 'Dashboard Receiving - SB Admin Angular',
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
