import { DashboardComponent } from './dashboard/dashboard.component';
import { LightComponent } from './light/light.component';
import { StaticComponent } from './static/static.component';
import { VerifyIndentComponent } from './verify-indent/verify-indent.component';
import { ViewRecivingComponent } from './view-reciving/view-reciving.component';



export const containers = [DashboardComponent, StaticComponent, LightComponent, VerifyIndentComponent, ViewRecivingComponent];

export * from './dashboard/dashboard.component';
export * from './static/static.component';
export * from './light/light.component';
export * from './verify-indent/verify-indent.component';
export * from './view-reciving/view-reciving.component';
