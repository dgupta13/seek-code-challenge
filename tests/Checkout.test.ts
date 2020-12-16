import { CheckOut } from "../src/Checkout";

describe("Checkout Tests", () => {
  it("Total function", () => {
    let inputObj = {
      discount: [
        {
          ruleId: 2,
          ruleDescription:
            "Discount on Standout Ads, price drops to $299.99 per ad",
          offerTriggerQuantityCount: null,
          discountProductCount: null,
          discountPrice: 299.99,
          productCode: "standout",
        },
      ],
      apply: jest.fn(),
    };
    const checkout = new CheckOut(inputObj);
    checkout.total();
    expect(inputObj.apply).toHaveBeenCalled();
  });
  it("add function", () => {
    let inputObj = {
      discount: [
        {
          ruleId: 2,
          ruleDescription:
            "Discount on Standout Ads, price drops to $299.99 per ad",
          offerTriggerQuantityCount: null,
          discountProductCount: null,
          discountPrice: 299.99,
          productCode: "standout",
        },
      ],
      apply: jest.fn(),
    };
    const checkout = new CheckOut(inputObj);
    checkout.add('classic');
    expect(checkout.items.length).toEqual(1);
  });
});
