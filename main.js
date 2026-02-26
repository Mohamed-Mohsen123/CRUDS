import { Product } from "./Product.js";

const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");
const titleSearch = document.getElementById("search-title");
const categorySearch = document.getElementById("search-category");
const searchInput = document.getElementById("search");
let searchMode = "title"; //default
let updateId = null;
$(document).ready(renderProducts);

//get total*********************
function getTotal() {
  let p = Number(price.value) || 0;
  let t = Number(taxes.value) || 0;
  let a = Number(ads.value) || 0;
  let d = Number(discount.value) || 0;

  let result = p + t + a - d;

  if (result > 0) {
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}
$(".price input").on("input", getTotal);
//****************
//submit event
$(submit).click(Submit);
$(".input").on("keypress", function (e) {
  if (e.key === "Enter") {
    Submit();
  }
});

//submit
function Submit() {
  if (updateId != null) {
    UpdateProduct();
  } else {
    createProduct();
  }
  clearInputs();
  renderProducts();
}
//create product***********
function createProduct() {
  if (!validateData()) return;
  Product.AddProduct();
}
//update****************

function UpdateProduct() {
  $(count).val("1");
  if (!validateData()) return;
  Product.Update(updateId);
  submit.innerText = "create";
  count.style.display = "block";
  updateId = null;
}
//update event
$(document).on("click", ".update", function () {
  let id = $(this).data("id");

  let product = Product.Products.find((p) => p.id === id);
  updateId = id;

  title.value = product.title;
  price.value = product.price;
  taxes.value = product.taxes;
  ads.value = product.ads;
  discount.value = product.discount;
  category.value = product.category;

  getTotal();

  count.style.display = "none";
  submit.innerText = "update";
});
//Remove Product*******************
$(document).on("click", ".delete", function () {
  let id = $(this).data("id");
  Product.Delete(id);
  renderProducts();
});
//******************

//Remove ALL products
$(document).on("click", "#deleteAllBtn", function () {
  Product.DeleteAll();
  renderProducts();
});

//search
$(titleSearch).click(() => {
  searchMode = "title";
  searchInput.placeholder = "Search by title";
});

$(categorySearch).click(() => {
  searchMode = "category";
  searchInput.placeholder = "Search by category";
});

$(searchInput).on("input", function () {
  let value = this.value.toLowerCase();
  let rows = "";

  for (let i = 0; i < Product.Products.length; i++) {
    let product = Product.Products[i];

    if (
      (searchMode === "title" && product.title.toLowerCase().includes(value)) ||
      (searchMode === "category" &&
        product.category.toLowerCase().includes(value))
    ) {
      rows += `
        <tr>
          <td>${product.id}</td>
          <td>${product.title}</td>
          <td>${product.price}</td>
          <td>${product.taxes}</td>
          <td>${product.ads}</td>
          <td>${product.discount}</td>
          <td>${
            Number(product.price) +
            Number(product.taxes) +
            Number(product.ads) -
            Number(product.discount)
          }</td>
          <td>${product.category}</td>
          <td><button class="update"  data-id="${product.id}">update</button></td>
          <td><button class="delete"  data-id="${product.id}">delete</button></td>
        </tr>
      `;
    }
  }

  $("tbody").html(rows);
});
//*************helpers**********
//validate data
function validateData() {
  if (title.value.trim() === "") {
    alert("Title is required");
    return false;
  }

  if (Number(price.value) <= 0) {
    alert("Price must be greater than 0");
    return false;
  }

  if (category.value.trim() === "") {
    alert("Category is required");
    return false;
  }

  if (count.value === "" || Number(count.value) < 1) {
    alert("Count must be at least 1");
    return false;
  }

  return true;
}

function clearInputs() {
  //clear inputs
  $("input").val("");
  $(total).html("");
  total.style.background = "red";
}

//read*****************
function renderProducts() {
  let rows = "";
  for (let i = 0; i < Product.Products.length; i++) {
    rows += `
      <tr>
        <td>${Product.Products[i].id}</td>
        <td>${Product.Products[i].title}</td>
        <td>${Product.Products[i].price}</td>
        <td>${Product.Products[i].taxes}</td>
        <td>${Product.Products[i].ads}</td>
        <td>${Product.Products[i].discount}</td>
        <td>${
          Number(Product.Products[i].price) +
          Number(Product.Products[i].taxes) +
          Number(Product.Products[i].ads) -
          Number(Product.Products[i].discount)
        }</td>
        <td>${Product.Products[i].category}</td>
        <td><button class="update" data-id="${Product.Products[i].id}">update</button></td>
        <td><button class="delete" data-id="${Product.Products[i].id}">delete</button></td>
      </tr>
    `;
  }
  showDeleteAll();
  $("tbody").html(rows);
}
//handling delete all button
function showDeleteAll() {
  if (Product.Products.length) {
    $(".delete-all").html(`
  <button id="deleteAllBtn">Delete All (${Product.Products.length})</button>
`);
  } else {
    $(".delete-all").html("");
  }
}

export { title, price, taxes, ads, discount, total, count, category, submit };
