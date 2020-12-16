import { Discount } from "../src/Discount";

describe("Discount Tests", () => {
  it("Load Discount", () => {
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
    const recruiter = Discount.load([2]);
    expect(recruiter).toEqual(discount);
  });
});
