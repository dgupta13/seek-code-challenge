import { PurchasedProducts } from "./PurchasedProducts";
import { IProduct } from "./PurchasedProducts";
import {IDiscount} from "./Discount";

interface IPricingRule {
  discount: IDiscount[];
  apply: (product: { items: IProduct[] }) => number;
}
export class CheckOut {
  pricingRules: IPricingRule;
  items: string[];
  /**
   * Create a Checkout
   *
   * @param pricingRules
   */
  constructor(pricingRules: IPricingRule) {
    this.pricingRules = pricingRules;
    this.items = [];
  }
  /**
   * Add an item to the current checkout
   *
   * @param productCode
   */
  add(productCode: string) {
    this.items.push(productCode);
  }
  /**
   * Calculate the total cost of the current items, applying relevant customer discounts
   *
   * @return Total cost
   */
  total() {
    const product = new PurchasedProducts(this.items);
    return this.pricingRules.apply(product);
  }
}
