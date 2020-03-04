import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountNewComponent } from './account-new/account-new.component';
import { RouterModule, Routes } from '@angular/router';

import {MatListModule} from '@angular/material/list';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';

import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'account-details/:accountNumber', component: AccountDetailsComponent },
  { path: 'create-new-account/:customerId', component: AccountNewComponent },
  { path: 'create-transaction/:accountNumber', component: CreateTransactionComponent}];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountDetailsComponent,
    AccountNewComponent,
    CreateTransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
    MatListModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
