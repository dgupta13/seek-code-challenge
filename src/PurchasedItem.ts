/**
 * A Product represents a single product item while calculating total amount.
 */
export class PurchasedItem {
  productCode: string;
  price: number | null;
  /**
   * Create a single PurchasedItem
   *
   * @param productCode
   */
  constructor(productCode: string) {
    this.productCode = productCode;
    this.price = null;
  }
}
