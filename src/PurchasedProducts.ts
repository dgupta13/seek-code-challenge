import { PurchasedItem } from "./PurchasedItem";

export interface IProduct {
  productCode: string;
  price: number | null | undefined;
}

export class PurchasedProducts {
  items: IProduct[];
  /**
   * Create a PurchasedProducts
   *
   * @param items
   */
  constructor(items: string[]) {
    this.items = items.map((x) => new PurchasedItem(x));
  }
}
