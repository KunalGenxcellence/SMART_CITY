import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';





@NgModule({
    declarations: [AppComponent ],
    imports: [BrowserModule,
         AppRoutingModule,
          HttpClientModule,
          BrowserAnimationsModule,
          ToastrModule.forRoot(),NgxSpinnerModule
        ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
