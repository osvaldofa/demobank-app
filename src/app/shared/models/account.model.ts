import {CustomerModel} from './customer.model';

export class AccountModel {
  accountNumber: number;
  customerReference: CustomerModel;
  balance: number;

  constructor(accountNumber: number, customer: CustomerModel, balance: number) {
    this.accountNumber = accountNumber;
    this.customerReference = customer;
    this.balance = balance;
  }
}
