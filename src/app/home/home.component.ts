import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { AccountModel } from '../shared/models/account.model';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { ActivatedRoute } from '@angular/router';
import { retry, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public accountService: AccountService) {
    this.loadAccounts();
  }

  accounts: AccountModel[];

  loadAccounts() {
    this.accountService.getAllAccounts().subscribe((c: AccountModel[]) => {
      this.accounts = c;
    });
  }


  ngOnInit(): void { }

  trackAccount(index: number, account: AccountModel) {
    return account ? account.accountNumber : null;
  }

  public Alert(message: string) {
    alert(message);
  }

}
