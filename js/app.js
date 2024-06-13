"use strict";

const productList = document.querySelector(".product-list");

function loadJson() {
  fetch("data/products.json")
    .then((responce) => responce.json())
    .then((data) => {
      const categories = document.querySelector(".filters");
      let item = "";

      categories.innerHTML = "";
      data.forEach((element) => {
        if (element.filter_name == "All categories") {
          element.products.forEach((element) => {
            item += productView(element);
          });
        }
        categories.innerHTML += categoryView(element);
      });
      productList.innerHTML = item;
    })
    .catch((error) => {
      alert(error);
    });
}
loadJson();

function categoryView(category) {
  return `
  <button type="button" class="filter-option" onclick="categoryFilter(${category.filter_id})">${category.filter_name}</button>
  `;
}

function addToCart(id) {
  let cart = localStorage.getItem("cart");
  fetch("data/products.json")
    .then((responce) => responce.json())
    .then((data) => {
      var fullData = [];
      data.forEach((element) => {
        element.products.forEach((product) => {
          fullData.push(product);
        });
      });
      console.log(fullData);
      const product = fullData.find((element) => element.id == id);
      console.log(product);
      if (cart) {
        cart = JSON.parse(cart);
        const index = cart.findIndex((element) => element.id == id);
        if (index == -1) {
          product.quantity = 1;
          cart.push(product);
        } else {
          cart[index].quantity++;
        }
      } else {
        product.quantity = 1;
        cart = [product];
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product added to cart");
      document.querySelector(".cart-count").innerText = cart
        .map((element) => element.quantity)
        .reduce((a, b) => a + b, 0);
      loadJson();
    })
    .catch((error) => {
      alert(error);
    });
}

function removeFromCart(id) {
  let cart = localStorage.getItem("cart");
  if (cart) {
    cart = JSON.parse(cart);
    const index = cart.findIndex((element) => element.id == id);
    if (index != -1) {
      cart[index].quantity--;
      if (cart[index].quantity == 0) {
        cart.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product removed from cart");
      document.querySelector(".cart-count").innerText = cart
        .map((element) => element.quantity)
        .reduce((a, b) => a + b, 0);
      loadJson();
    }
  }
}

function productView(product) {
  return `
  <div class="col-3 product-item" data="${product.id}">
     <div class="product-img-box">
       <img src="${product.imgSrc}" alt="product image" class="product-img" />
       <div class="overlay">
         <a class="overlay-link" href="product.html?id=${product.id}">
           <img src="images/arrow.png" alt="arrow" class="arrow-img" />
         </a>
         <div class="overlay-info">
           <p>Design | Branding</p>
           <h2>Creative Web Design</h2>
         </div>
       </div>
       <p class="num-box"></p>
     </div>
     <hr />
     <div class="product-content">
       <p class="product-price">${product.price}</p>
       ${
         localStorage.getItem("cart") &&
         !JSON.parse(localStorage.getItem("cart")).find(
           (element) => element.id == product.id
         )
           ? `<button type="button" onclick="addToCart(${product.id})" class="btn btn-add-cart">Add to cart</button>`
           : `<button type="button" onclick="addToCart(${product.id})" class="btn btn-add-cart">
        +
       </button>`
       }
       ${
         localStorage.getItem("cart") &&
         JSON.parse(localStorage.getItem("cart")).find(
           (element) => element.id == product.id
         )
           ? `<span class="quantity"> ${
               JSON.parse(localStorage.getItem("cart")).find(
                 (element) => element.id == product.id
               ).quantity
             }
              </span>`
           : ""
       }
       ${
         localStorage.getItem("cart") &&
         JSON.parse(localStorage.getItem("cart")).find(
           (element) => element.id == product.id
         )
           ? `
           <button
             type="button"
             onclick="removeFromCart(${product.id})"
             class="btn btn-add-cart"
           >
             -
           </button>
           `
           : ""
       }
     </div>
 </div>
  `;
}

function categoryFilter(id) {
  fetch("data/products.json")
    .then((responce) => responce.json())
    .then((data) => {
      const buttons = document.querySelectorAll(".filter-option");
      buttons.forEach((button) => {
        button.style.color = "var(--secondary-color)";
      });
      buttons[id - 1].style.color = "var(--red-color)";

      const products = document.querySelector(".product-list");
      products.innerHTML = "";
      for (const category of data) {
        if (category.filter_id == id) {
          category.products.forEach((element) => {
            products.innerHTML += productView(element);
          });
        }
      }
    })
    .catch((error) => {
      alert(error);
    });
}

document.querySelector(".cart-count").innerText = JSON.parse(
  localStorage.getItem("cart") || "[]"
)
  .map((element) => element.quantity)
  .reduce((a, b) => a + b, 0);
