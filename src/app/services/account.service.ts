import { Injectable } from '@angular/core';

import {AccountModel} from '../shared/models/account.model';
import {CustomerModel} from '../shared/models/customer.model';
import {NewAccount} from '../shared/models/NewAccount.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

   url = 'http://52.188.183.162/api/v1/account';

  // Headers
  httpOptions = {
    headers: new HttpHeaders(
      {'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token'})
  };


  public getAccounts() {
    const customer1: CustomerModel = new CustomerModel(1010, 'Jorge', 'Lourenço');
    const customer2: CustomerModel = new CustomerModel(1011, 'Cristovão', 'Buarque');
    const customer3: CustomerModel = new CustomerModel(1012, 'Lima', 'Duarte');

    const account1: AccountModel = new AccountModel(1101, customer1, 10);
    const account2: AccountModel = new AccountModel(1102, customer2, 200);
    const account3: AccountModel = new AccountModel(1103, customer3, 3000);
    const accounts: AccountModel[] = [account1, account2, account3];

    return accounts;
  }

  getAllAccounts(): Observable<AccountModel[]> {
      return this.httpClient.get<AccountModel[]>(this.url, this.httpOptions);
  }

  createNewAccount(customerId: number, initialBalance: number) {
      console.log('Account creation - Customer: ' + customerId + ' / Initial Balance: ' + initialBalance);

      const newAccount: NewAccount = new NewAccount();
      newAccount.customerId = customerId;
      newAccount.initialBalance = initialBalance;

      console.log('POST: ' + this.url);
      this.httpClient.post<number>(this.url, newAccount).subscribe((ret) => {
         console.log(ret);
      });
  }

  handleError(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Erro ocorreu no lado do client
        errorMessage = error.error.message;
      } else {
        // Erro ocorreu no lado do servidor
        errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
  }
}
