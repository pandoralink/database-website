export interface KeyValue {
  key: string;
  value: string;
}

export interface People {
  name: string;
  age: number;
  nationality: string;
  images: string;
  number: string;
  parties: string;
  education: string;
}

export interface Result {
  data: {
    code: number;
    msg: string;
    data: any;
  };
}

export interface UserInfo {
  name: string;
  password: string;
  age: number;
  phone: string;
}

export interface NewResult {
  data: {
    code: number;
    msg: string;
    data<T>(): T;
  };
}

class person {
  private _name: string;
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  age: number;

  constructor(name: string, age: number) {
    this._name = name;
    this.age = age;
  }
}
