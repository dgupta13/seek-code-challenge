import {Product} from "../src/Product";

describe("Product Tests",  () => {
  it("Load Product",  () => {
    let product = Product.load("standout");
    expect([
      product.code,
      product.name,
      product.description,
      product.price,
    ]).toEqual(["standout", "Stand out Ad", "Allows advertisers to use a company logo and use a longer presentation text", 322.99]);
  });

  it("Missing Product",  () => {
    expect(() => Product.load("test")).toThrow();
  });
});
