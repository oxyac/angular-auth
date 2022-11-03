export class User {
  public id: number;
  public name: string;
  public surname: string;
  public password: string;
  public phone: number;
  public title: string;

  constructor(
              id: number,
              name: string,
              surname: string,
              password: string,
              title: string,
              phone: number) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.password = password;
    this.title = title;
    this.phone = phone;
  }


}
