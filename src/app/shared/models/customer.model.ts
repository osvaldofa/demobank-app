export class CustomerModel {
  customerId: number;
  name: string;
  surname: string;

  constructor(customerId: number, name: string, surname: string) {
    this.customerId = customerId;
    this.name = name;
    this.surname = surname;
  }
}
