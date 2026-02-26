import {
  title,
  price,
  taxes,
  ads,
  discount,
  total,
  count,
  category,
} from "./main.js";

class Product {
  static Products = localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
  constructor(title, price, taxes, ads, discount, category) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.price = price;
    this.taxes = taxes;
    this.ads = ads;
    this.discount = discount;
    this.category = category;
  }
  //add
  static AddProduct() {
    for (let i = 0; i < count.value; i++) {
      Product.Products.push(
        new Product(
          title.value.toLowerCase(),
          price.value,
          taxes.value || 0,
          ads.value || 0,
          discount.value || 0,
          category.value.toLowerCase(),
        ),
      );
    }
    //save to local storage
    localStorage.setItem("products", JSON.stringify(Product.Products));
  }
  //delete
  static Delete(id) {
    this.Products = this.Products.filter((p) => p.id !== id);
    localStorage.setItem("products", JSON.stringify(this.Products));
  }
  //deleteAll
  static DeleteAll() {
    Product.Products = [];
    localStorage.removeItem("products");
  }

  //update
  static Update(id) {
    let index = this.Products.findIndex((p) => p.id === id);

    this.Products[index].title = title.value.toLowerCase();
    this.Products[index].price = price.value;
    this.Products[index].taxes = taxes.value;
    this.Products[index].ads = ads.value;
    this.Products[index].discount = discount.value;
    this.Products[index].category = category.value.toLowerCase();
    localStorage.setItem("products", JSON.stringify(this.Products));
  }
}

export { Product };
