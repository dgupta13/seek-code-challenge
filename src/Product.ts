import { productList } from "./config/productList";

interface IProduct {
  productCode: string;
  productName: string;
  productDescription: string;
  productPrice: number;
}

export class Product {
  code: string;
  name: string;
  description: string;
  price: number;

  /**
   * create a product
   * @param item
   */
  constructor(item: IProduct | undefined) {
    const { productCode, productName, productDescription, productPrice } = {
      ...item,
    };
    this.code = productCode;
    this.name = productName;
    this.description = productDescription;
    this.price = productPrice;
  }

  /**
   * Load a product record
   *
   * @param code
   */
  static load(code: string) {
    const data = productList.find((item) => item.productCode === code);
    if (!data) {
      throw new Error("No product found");
    }
    return new this(data);
  }
}
