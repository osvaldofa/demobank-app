import { AccountModel } from './account.model';

export class TransactionModel {
  transactionId: number;
  destinationAccount: AccountModel;
  originAccount: AccountModel;
  value: number;
  transactionType: string;
  when: Date;
}
