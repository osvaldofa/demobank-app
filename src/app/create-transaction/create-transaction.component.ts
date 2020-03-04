import { Component, OnInit } from '@angular/core';
import { AccountModel } from '../shared/models/account.model';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private transactionService: TransactionService) {
      this.updateAccountNumber();
   }

  accountNumber: number;
  transactionType: string;
  value: number;

  transactionTypes: string[] = ['deposit', 'withdraw'];

  ngOnInit(): void {
  }

  createTransaction() {
    this.transactionService.createTransaction(this.accountNumber, this.transactionType, this.value);
    alert('Transaction created!');
    this.goHome();
  }

  updateAccountNumber() {
    this.route.params.subscribe(params => {
      const param = this.route.snapshot.paramMap.get('accountNumber');
      if (param) {
        this.accountNumber = this.tryConvert(param);
      }
    });
    this.cleanForm();
  }

  cleanForm() {
     this.transactionType = '';
     this.value = 0;
  }

  goHome() {
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigateByUrl('/');
  }

  tryConvert(num: string) {
    if (num && num.trim()) {
      return Number(num);
    }
    return 0;
  }




}
