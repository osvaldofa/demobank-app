import { Injectable } from '@angular/core';
import {TransactionModel} from '../shared/models/transaction.model';
import {AccountModel} from '../shared/models/account.model';
import {CustomerModel} from '../shared/models/customer.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient: HttpClient) {

    this.transaction1.transactionId = 110001;
    this.transaction1.destinationAccount = this.account1;
    this.transaction1.transactionType = 'deposit';
    this.transaction1.value = 10;
    this.transaction1.when = new Date();

    this.transaction2.transactionId = 110002;
    this.transaction2.destinationAccount = this.account1;
    this.transaction2.transactionType = 'deposit';
    this.transaction2.value = 95.25;
    this.transaction2.when = new Date();

    this.transaction3.transactionId = 110003;
    this.transaction3.destinationAccount = this.account2;
    this.transaction3.transactionType = 'deposit';
    this.transaction3.value = 125.60;
    this.transaction3.when = new Date();

    this.transactions = [this.transaction1, this.transaction2, this.transaction3];
  }

  url = 'http://52.149.205.126/api/v1/transaction';
  urlAccount = 'http://52.188.183.162/api/v1/account';

  // Headers
  httpOptions = {
    headers: new HttpHeaders(
      {'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token'})
  };

  customer1 = new CustomerModel(1101, 'Paulo', 'Lehman');
  customer2 = new CustomerModel(1102, 'Altair', 'dos Santos');

  account: AccountModel;
  transactionId: number;

  account1 = new AccountModel(1101, this.customer1, 10);
  account2 = new AccountModel(1102, this.customer2, 250);

  transaction1 = new TransactionModel();
  transaction2 = new TransactionModel();
  transaction3 = new TransactionModel();

  transactions: TransactionModel[];

  getTransactionsByAccountNumber(accountNumber: number) {
    return this.transactions.filter(t => t.destinationAccount.accountNumber === accountNumber);
  }

  getTransactionsByAccount(accountNumber: number): Observable<TransactionModel[]> {
      const transactionURL = this.url + '/' + accountNumber;
      return this.httpClient.get<TransactionModel[]>(transactionURL, this.httpOptions);
  }

  createTransaction(accountNumber: number, transactionType: string, value: number) {
      // const account: AccountModel = this.getAccountByAccountNumber(accountNumber);
      const account: AccountModel = new AccountModel(accountNumber, null, 0);
      return this.finishTransaction(account, transactionType, value );
  }

  getAccountByAccountNumber(accountNumber: number) {
    const urlAccountSearch = this.urlAccount + '/' + accountNumber;
    this.httpClient.get<AccountModel>(urlAccountSearch).subscribe( (accountData) => {
        console.log(accountData);
        return accountData;
    });
    return null;
  }

  finishTransaction(account: AccountModel, type: string, value: number) {
    const transaction: TransactionModel = new TransactionModel();
    transaction.destinationAccount = account;
    transaction.transactionType = type;
    transaction.value = value;

    this.httpClient.post<number>(this.url, transaction, this.httpOptions).subscribe( (t) => {
        this.transactionId = t;
    });

    return (this.transactionId) ? this.transactionId : 0;
  }
}
