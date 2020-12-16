import { PricingRules } from "../src/PricingRules";
import { Discount } from "../src/Discount";

describe("PricingRule Tests",  () => {
  it("Load PricingRule",  () => {
    const mockLoad = jest.fn();
    Discount.load = mockLoad;
    PricingRules.load([2, 3]);
    expect(mockLoad).toHaveBeenCalled();
  });
  it("Apply PricingRule when no offer available",  () => {
    let products = {
      items: [
        {
          productCode: "classic",
          price: null,
        },

        {
          productCode: "standout",
          price: null,
        },
      ],
    };
    let discount = [
      {
        ruleId: 1,
        ruleDescription: "3 for 2 deal on Classic Ads",
        offerTriggerQuantityCount: 3,
        discountProductCount: 2,
        discountPrice: null,
        productCode: "classic",
      },
    ];
    let pricingRule = new PricingRules(discount);
    let cost = pricingRule.apply(products);
    expect(cost).toEqual(592.98);
  });
  it("Apply PricingRule when 3 for 2 offer available",  () => {
    let products = {
      items: [
        {
          productCode: "classic",
          price: null,
        },
        {
          productCode: "classic",
          price: null,
        },
        {
          productCode: "classic",
          price: null,
        },
        {
          productCode: "standout",
          price: null,
        },
      ],
    };
    let discount = [
      {
        ruleId: 1,
        ruleDescription: "3 for 2 deal on Classic Ads",
        offerTriggerQuantityCount: 3,
        discountProductCount: 2,
        discountPrice: null,
        productCode: "classic",
      },
    ];
    let pricingRule = new PricingRules(discount);
    let cost = pricingRule.apply(products);
    expect(cost).toEqual(862.97);
  });
  it("Apply PricingRule when 5 for 4 offer available",  () => {
    let products = {
      items: [
        {
          productCode: "standout",
          price: null,
        },
        {
          productCode: "standout",
          price: null,
        },
        {
          productCode: "standout",
          price: null,
        },
        {
          productCode: "standout",
          price: null,
        },
        {
          productCode: "standout",
          price: null,
        },
      ],
    };
    let discount = [
      {
        ruleId: 3,
        ruleDescription: "5 for 4 deal on Stand out Ads",
        offerTriggerQuantityCount: 5,
        discountProductCount: 4,
        discountPrice: null,
        productCode: "standout",
      },
    ];
    let pricingRule = new PricingRules(discount);
    let cost = pricingRule.apply(products);
    expect(cost).toEqual(1291.96);
  });
  it("Apply PricingRule when price drop offer",  () => {
    let products = {
      items: [
        {
          productCode: "standout",
          price: null,
        },
        {
          productCode: "standout",
          price: null,
        },
        {
          productCode: "standout",
          price: null,
        },
      ],
    };
    let discount = [
      {
        ruleId: 2,
        ruleDescription:
          "Discount on Standout Ads, price drops to $299.99 per ad",
        offerTriggerQuantityCount: null,
        discountProductCount: null,
        discountPrice: 299.99,
        productCode: "standout",
      },
    ];
    let pricingRule = new PricingRules(discount);
    let cost = pricingRule.apply(products);
    expect(cost).toEqual(899.97);
  });
  it("Apply PricingRule when price drop and 5 for 4 offer",  () => {
    let products = {
      items: [
        {
          productCode: "standout",
          price: null,
        },
        {
          productCode: "standout",
          price: null,
        },
        {
          productCode: "standout",
          price: null,
        },
        {
          productCode: "standout",
          price: null,
        },
        {
          productCode: "standout",
          price: null,
        },
        {
          productCode: "premium",
          price: null,
        },
      ],
    };
    let discount = [
      {
        ruleId: 3,
        ruleDescription: "5 for 4 deal on Stand out Ads",
        offerTriggerQuantityCount: 5,
        discountProductCount: 4,
        discountPrice: null,
        productCode: "standout",
      },
      {
        ruleId: 4,
        ruleDescription:
          "Discount on Premium Ads, price drops to $389.99 per ad",
        offerTriggerQuantityCount: null,
        discountProductCount: null,
        discountPrice: 389.99,
        productCode: "premium",
      },
    ];
    let pricingRule = new PricingRules(discount);
    let cost = pricingRule.apply(products);
    expect(cost).toEqual(1681.95);
  });
});
