export interface IcreateItem {
  item: {
    id: number,
    name: string,
    amount: string,
  }
}

export interface Iproduct {
  name: string,
  amount: string,
}

export interface IAllproduct extends Iproduct {
  id: number,
}