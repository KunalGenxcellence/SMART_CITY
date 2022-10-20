/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { ChartsModule } from '@modules/charts/charts.module';
import { TablesModule } from '@modules/tables/tables.module';

/* Components */
import * as dashboardComponents from './components';

/* Containers */
import * as dashboardContainers from './containers';

/* Guards */
import * as dashboardGuards from './guards';

/* Services */
import * as dashboardServices from './services';
import { VerifyIndentComponent } from './containers/verify-indent/verify-indent.component';
import { ViewRecivingComponent } from './containers/view-reciving/view-reciving.component';
import { AddIndentComponent } from './containers/add-indent/add-indent.component';
import { AddReceivingComponent } from './containers/add-receiving/add-receiving.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AddStockComponent } from './containers/add-stock/add-stock.component';
import { ViewStockComponent } from './containers/view-stock/view-stock.component';
import { RemoveStockComponent } from './containers/remove-stock/remove-stock.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        ChartsModule,
        TablesModule,HttpClientModule,
        
    ],
    providers: [...dashboardServices.services, ...dashboardGuards.guards],
    declarations: [...dashboardContainers.containers, ...dashboardComponents.components, VerifyIndentComponent, ViewRecivingComponent, AddIndentComponent, AddReceivingComponent, SpinnerComponent, AddStockComponent, ViewStockComponent, RemoveStockComponent],
    exports: [...dashboardContainers.containers, ...dashboardComponents.components],
})
export class DashboardModule {}
