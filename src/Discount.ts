import { specialPriceRule } from "./config/specialPriceRule";

export interface IDiscount {
  ruleId: number | undefined;
  ruleDescription: string | undefined;
  offerTriggerQuantityCount: number | null | undefined;
  discountProductCount: number | null | undefined;
  discountPrice: number | null | undefined;
  productCode: string | undefined;
}

export class Discount {
  ruleId: number | undefined;
  ruleDescription: string | undefined;
  offerTriggerQuantityCount: number | null | undefined;
  discountProductCount: number | null | undefined;
  discountPrice: number | null | undefined;
  productCode: string | undefined;

  constructor(
    ruleId: number | undefined,
    ruleDescription: string | undefined,
    offerTriggerQuantityCount: number | null | undefined,
    discountProductCount: number | null | undefined,
    discountPrice: number | null | undefined,
    productCode: string | undefined
  ) {
    this.ruleId = ruleId;
    this.ruleDescription = ruleDescription;
    this.offerTriggerQuantityCount = offerTriggerQuantityCount;
    this.discountProductCount = discountProductCount;
    this.discountPrice = discountPrice;
    this.productCode = productCode;
  }

  /**
   * Load a pricing rules for a given customer
   * @param ruleId
   */
  static load(ruleId: number[]) {
    let data;
    return ruleId.map((id) => {
      data = specialPriceRule.find((rule) => rule.ruleId === id) || {};
      return new this(
        data.ruleId,
        data.ruleDescription,
        data.offerTriggerQuantityCount,
        data.discountProductCount,
        data.discountPrice,
        data.productCode
      );
    });
  }
}
