import { Discount, IDiscount } from "./Discount";
import { IProduct } from "./PurchasedProducts";
import { Product } from "./Product";
import * as _ from "lodash";

export class PricingRules {
  discount: IDiscount[];

  constructor(discount: IDiscount[]) {
    this.discount = discount;
  }

  apply(product: { items: IProduct[] }) {
    let totalCost = 0;
    for (const item of product.items) {
      item.price = Product.load(item.productCode).price;
    }
    let productGroups = _.groupBy(product.items, "productCode");
    for (const [code, items] of Object.entries(productGroups)) {
      let productCost = this._applyDiscount(code, items);
      if (!productCost && items[0].price) {
        totalCost += items.length * items[0].price;
      } else if (productCost) {
        totalCost += productCost;
      }
    }
    return totalCost;
  }

  /**
   * Apply any discounts applicable to a specific product
   *
   * @param code
   * @param items
   * @private
   */
  _applyDiscount(code: string, items: IProduct[]) {
    // determine pricing to apply
    let totalProductPrice = null;
    const stdPrice = Product.load(code).price;

    let { discountedPrice, discountedQuantity } = this._productDiscount(
      code,
      stdPrice,
      items.length
    );
    if (!discountedPrice && discountedQuantity.length === 0) {
      // No discount to apply
      return;
    }
    discountedPrice &&
      items.map((item) => {
        item.price = discountedPrice && discountedPrice.discountPrice;
        return item;
      });
    if (discountedQuantity.length > 0) {
      let count = discountedQuantity[0].offerTriggerQuantityCount;
      let numOfItems =
        count &&
        discountedQuantity[0].discountProductCount &&
        Math.floor(items.length / count) *
          discountedQuantity[0].discountProductCount +
          (items.length % count);
      totalProductPrice =
        numOfItems && items[0].price && numOfItems * items[0].price;
    } else {
      totalProductPrice = items[0].price && items.length * items[0].price;
    }
    return totalProductPrice;
  }

  /**
   *
   * @param code
   * @param price
   * @param itemsNum
   * @private
   */
  _productDiscount(code: string, price: number, itemsNum: number) {
    let discountedPrice = null;
    let discountedPriceArray = this.discount.filter(
      (item) =>
        item.productCode === code &&
        item.discountPrice &&
        item.discountPrice < price
    );
    if (discountedPriceArray.length) {
      discountedPrice = _.minBy(discountedPriceArray, "discountPrice");
    }
    let discountedQuantity = this.discount.filter(
      (item) =>
        item.productCode === code &&
        item.offerTriggerQuantityCount &&
        item.offerTriggerQuantityCount <= itemsNum
    );
    if (discountedPriceArray.length) {
      discountedPrice = _.minBy(discountedPriceArray, "discountPrice");
    }
    return { discountedPrice, discountedQuantity };
  }

  /**
   * Load a pricing rules for a given customer
   *
   * @param ruleId
   */
  static load(ruleId: number[]) {
    return new this(Discount.load(ruleId));
  }
}
