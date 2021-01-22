// contentful code
const client = contentful.createClient({
  space: "59i9t2wtqsks",
  accessToken: "NijxV8hlFa5Qu9CcqCWfCSfT8f8SuQhwwUoVd9prC0Q",
});

// variables
const main = document.querySelector("main");
const hamburger = document.querySelector(".hamburger_menu");
const nav = document.querySelector(".nav");
const logIN = document.querySelector(".log_in");
const signUP = document.querySelector(".sign_up");
const logINContainer = document.querySelector(".log_in_container");
const signUpContainer = document.querySelector(".signup_container");
const goSignUp = document.getElementById("signup");
const goLogin = document.getElementById("signup_btn");
const user = document.querySelector(".user");
const shoppingCart = document.querySelector(".shopping-cart");
const shoppingContainer = document.querySelector(".shopping_cart");
const closedSignup = document.querySelector(".close_signup");
const closedLogin = document.querySelector(".close_login");
const link = document.querySelectorAll(".list");
const sideBar = document.querySelectorAll(".sidebar");
const closes = document.querySelectorAll(".open_left");
const curDate = document.querySelector(".date span");
const emailErr = document.querySelector(".email_container small");
const passwordErr = document.querySelector(".password_container small");
const Email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.querySelector("form");
const collections = document.querySelector(".collections_layout");
const cartDOM = document.querySelector(".shopping_cart_count");
const totalCartAmount = document.querySelector(".subtotal_amount");
const shopQuantity = document.getElementById("item");
const shopItem = document.getElementById("cart");
const productCardContainer = document.querySelector(".cart");
const container = document.querySelector(".container");
const reviewcontainer = document.querySelector(".review_container");
const button = document.querySelector("button");

/******************GOOGLE API ********************
function googleAPI() {
  window.gapi.load("client:auth2", () => {
    window.gapi.client
      .init({
        clientId:
          "614866311839-vbs9lk21j969dn80suvc2jb6mkgis3cn.apps.googleusercontent.com",
        scope: "email",
      })
      .then(() => {
        init();
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
googleAPI();
function init() {
  const auth = gapi.auth2.getAuthInstance();
  auth.isSignIn = null;
  button.addEventListener("click", () => {
    auth.signIn();
    button.innerText = "LOG OUT WITH GOOGLE";
    if (auth.isSignedIn === true) {
      auth.signOut();
      button.innerText = "LOG IN WITH GOOGLE";
      console.log(auth.isSignedIn);
    }
  });
}
*/
async function fetchData() {
  try {
    // let datas = await fetch("main.json");
    let data = await client.getEntries({
      content_type: "klepo",
    });

    // let data = await datas.json();
    let getData = data.items;
    getData = getData.map((item) => {
      const { id } = item.sys;
      const { productName, price } = item.fields;
      let url = item.fields.images.fields.file.url;
      return { id, productName, price, url };
    });
    return getData;
  } catch (error) {
    console.log(error);
  }
}
let cart = [];
let buttonsDOMs = [];
const savedData = fetchData();
cartDOM.innerText = "";

class GetProduct {
  // constructor(){
  collectionProduct(product) {
    const gettingProduct = product
      .map((product) => {
        return `<div class="collections_product_card" id="five">
        <div class="image_container ">
          <img src="${product.url}" alt="${product.productName}">
        </div>
        <div class="discount_container">
          <p class="discount"> 20% off</p>
        </div>
        <div class="collections_details_container">
          <span class="product_name">${product.productName}</span>
          <span class="review"></span>
          <span class="store">china best</span>
          <span class="product_price">N${product.price}</span>
          <button class="add_cart" data-id='${product.id}'>add to cart
            <span class="fa fa-shopping-cart"></span>  
          </button>
          </div>
        </div>
    </div>`;
      })
      .join("");
    collections.insertAdjacentHTML("beforeend", gettingProduct);
    // addCart(btnArr);
    // this.retriveProduct(btnArr);
  }
  retriveProduct() {
    const getbutton = document.querySelectorAll(".add_cart");
    const btnArr = [...getbutton];
    buttonsDOMs = btnArr;

    buttonsDOMs.forEach((button) => {
      const id = button.dataset.id;
      // product in the cart
      const inCart = cart.find((product) => product.id === id);
      // console.log(cart);
      if (inCart) {
        this.buttonDOM(button);
      }
      button.addEventListener("click", (event) => {
        // get product of clicked button
        this.buttonDOM(button);
        // retrive product from DOM
        this.retriveLocalStorage(id);
        // push data to local storage
        this.storedToSTorage();
        // update cart count value and total price
        // this.updateCartCount();
        // this.updateCartCount();
        // display product in the DOM
      });
    });
  }

  buttonDOM(button) {
    button.disabled = true;
    button.innerText = "added to cart";
  }
  retriveLocalStorage(id) {
    let storedRetrivedData = Storage.getProduct(id);
    // add the amount to stored Retrived Data
    let cartItems = { ...storedRetrivedData, amount: 1 };

    // saved all data to the shopping cart
    this.displayCartDOM(cartItems);
    // add
    cart = [...cart, cartItems];
    // this.removeProductCard();
    this.updateCartCount(cart);

    this.updated();
  }

  storedToSTorage() {
    Storage.savedCart(cart);
  }
  updateCartCount(cart) {
    let cartCount = 0;
    let totalAmount = 0;
    cart.forEach((product) => {
      totalAmount += product.amount * parseInt(product.price);
      cartCount += product.amount;
    });
    cartDOM.innerText = cartCount;
    totalCartAmount.innerText = `N${totalAmount},000`;
  }
  displayCartDOM(product) {
    const cartDiv = document.createElement("div");
    cartDiv.classList.add("products_cart");
    cartDiv.innerHTML = `
      <div class="image_container">
      <img src="${product.url}" alt="${product.productName}">
    </div>
              <!-- product name -->
              <div class="center">
                <div class="product_name">
                  <p>${product.productName}</p>
                </div>
                <div class="shipping">
                  <p>eligible for free shipping with klepo express(lagos only) or klepo prime.</p>
                </div>
                    <!-- product price -->
                <div class="prices">
                  <p>N${product.price}</p>
                </div>
              </div>
             <!-- product buttons -->
        <div class="product_buttons">
    <span class="delete" id="${product.id}">
      <i class="fa fa-trash"></i>
      REMOVE
    </span>
    <span class="quantity">
      <span class= "decrease" id="${product.id}"> 
        <i class="fa fa-minus-circle decrease"></i>
      </span>
      <small class="amount" >${product.amount}</small>
      <span class ="increase" id="${product.id}"> 
        <i class="fa fa-plus-circle increase"></i>
      </span>
    </span>
  </div>      
      `;
    container.appendChild(cartDiv);
  }
  storeOnLoad() {
    cart = Storage.savedProducts();
    this.updateCartCount(cart);
    this.displayToDOM(cart);
    this.updateQuantity(cart);
    // console.log(cart);
  }
  displayToDOM(cart) {
    cart.forEach((cart) => this.displayCartDOM(cart));
    // this.removeProductCard();
  }

  updateQuantity(cart) {
    if (cart.length === 0) {
      this.empty();
    } else {
      this.updated();
    }
  }
  updated() {
    shopQuantity.innerText = "item quantity has been updated";
    shopItem.innerText = "your cart has been updated";
  }
  empty() {
    shopQuantity.innerText = "item quantity is empty";
    shopItem.innerText = "your cart is empty";
  }
  removeProductCard() {
    const productCard = document.querySelector(".container");
    productCard.addEventListener("click", (event) => {
      const targeted = event.target;
      // REMOVING INDIVIDUAL PRODUCT FROM THE CART
      if (targeted.classList.contains("delete")) {
        const removeID = targeted.id;
        // get product in the Cart
        const ItemID = cart.map((item) => item.id);
        ItemID.forEach((item) => this.deleteFunt(removeID));
        // remove from the dom
        container.removeChild(targeted.parentElement.parentElement);
        // update the "added to cart" to "add to cart with cart icon"
        if (cart.length === 0) {
          this.empty();
          cartDOM.innerText = "";
        }
        buttonsDOMs.forEach((button) => {
          button.disabled = false;
          button.innerHTML = `add to cart <span class="fa fa-shopping-cart"></span>`;
        });
        // INCREASING THE QUANTITY
      } else if (targeted.classList.contains("increase")) {
        const removeElem = targeted.parentElement.id;
        // get the amount from the cart
        let productsItem = cart.find((item) => item.id === removeElem);
        // increase the amount in the cart
        productsItem.amount += 1;
        // get the parent container and find the child with the small container
        const amountDOM = targeted.parentElement.parentElement.children[1];
        // update the amount DOM
        amountDOM.innerText = productsItem.amount;
        //  saved new cart to localStorage
        Storage.savedCart(cart);
        // update cart local storage
        this.updateCartCount(cart);
      } else if (targeted.classList.contains("decrease")) {
        const elemID = targeted.parentElement.id;
        // get the item of the cart
        const item = cart.find((item) => item.id === elemID);
        // get the amount of the item in the cart
        item.amount = item.amount - 1;
        // get the parent container and find the child with the small container
        const amountDOM = targeted.parentElement.parentElement.children[1];
        // Update the amount DOM
        amountDOM.innerText = item.amount;
        //  saved new cart to localStorage
        this.updateCartCount(cart);
        if (item.amount == 0) {
          this.deleteFunt(elemID);
          container.removeChild(
            targeted.parentElement.parentElement.parentElement.parentElement
          );
        }
      }
    });
  }
  deleteFunt(id) {
    cart = cart.filter((item) => item.id !== id);
    // store the new cart array to the local storage
    this.storedToSTorage();
    // update the cart count and total
    this.updateCartCount(cart);
  }
}

class Storage {
  static storeProduct(product) {
    localStorage.setItem("productsList", JSON.stringify(product));
  }
  static getProduct(id) {
    let product = JSON.parse(localStorage.getItem("productsList"));
    return product.find((product) => product.id === id);
  }
  static savedCart(product) {
    localStorage.setItem("cartList", JSON.stringify(product));
  }
  static getSavedCart(id) {
    let product = JSON.parse(localStorage.getItem("cartList"));
    return product.find((product) => product.id === id);
  }
  static savedProducts() {
    // return JSON.parse(localStorage.getItem("cartList"));
    return localStorage.getItem("cartList")
      ? JSON.parse(localStorage.getItem("cartList"))
      : [];
  }
  static deleteStorage(id) {
    // return localStorage.remove(id);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const product = new GetProduct();
  product.storeOnLoad();
  savedData.then((resolve) => {
    product.collectionProduct(resolve);
    product.retriveProduct();
    Storage.storeProduct(resolve);
    product.removeProductCard();
  });
});

/************* HIDE THE UL ON THE DESTOP VIEW ON SCROLL***********/
// const mediaQuery = window.matchMedia("(min-width:768px)");
function onScroll() {
  // if (e.matches) {
  window.addEventListener("scroll", () => {
    const linkHeight = nav.getBoundingClientRect().height;
    const scrollHeight = window.pageYOffset;
    console.log(scrollHeight);
    if (scrollHeight > linkHeight) {
      nav.style.display = "none";
    } else {
      nav.style.display = "block";
    }
  });
  // }
}
onScroll();
// mediaQuery.addListener(onscroll);

/*DYNAMIC REVIEW */
const Product = [
  {
    id: 201,
    name: "Nulla",
    price: 207,
    subCategoryId: 101,
    categoryId: 1,
    rate: 2.44,
    content:
      "Culpa sed tenetur incidunt quia veniam sed mollitia exercitationem. Laboriosam reprehenderit laborum pariatur",
    review: 78,
    typeVariant: "D",
    colorVariant: "5",
    imageUrl:
      "https://placeholdit.imgix.net/~text?txtsize=55&txt=137x945&w=137&h=945",
  },
  {
    id: 202,
    name: "Corporis",
    price: 271,
    subCategoryId: 101,
    categoryId: 1,
    rate: 2.18,
    content:
      "Nam incidunt blanditiis odio inventore. Nobis voluptatum quibusdam laboriosam a numquam. Delectus sequi ipsa possimus.",
    review: 67,
    typeVariant: "A",
    colorVariant: "4",
    imageUrl: "https://dummyimage.com/931x785",
  },
  {
    id: 203,
    name: "Minus",
    price: 295,
    subCategoryId: 101,
    categoryId: 1,
    rate: 0.91,
    content:
      "Quod reiciendis aspernatur ipsum cum debitis. Quisquam tempore doloremque quo ipsum ipsa tempora. Dignissimos qui ex.",
    review: 116,
    typeVariant: "E",
    colorVariant: "2",
    imageUrl: "https://dummyimage.com/556x985",
  },
  {
    id: 204,
    name: "Qui",
    price: 280,
    subCategoryId: 101,
    categoryId: 1,
    rate: 3.11,
    content:
      "Occaecati dolore assumenda facilis error quaerat. Rem harum alias cum eum quam corporis. Esse numquam vero facilis labore.",
    review: 78,
    typeVariant: "D",
    colorVariant: "3",
    imageUrl: "https://dummyimage.com/855x573",
  },
  {
    id: 205,
    name: "Blanditiis",
    price: 138,
    subCategoryId: 101,
    categoryId: 1,
    rate: 2.42,
    content:
      "Reiciendis dolorum debitis occaecati assumenda totam ex. Ullam iure dolore excepturi unde in libero modi molestiae. Voluptate .",
    review: 156,
    typeVariant: "A",
    colorVariant: "2",
    imageUrl:
      "https://placeholdit.imgix.net/~text?txtsize=55&txt=79x934&w=79&h=934",
  },
  {
    id: 206,
    name: "Est",
    price: 296,
    subCategoryId: 101,
    categoryId: 1,
    rate: 4.32,
    content:
      "Aut consequatur fugit ut voluptates fugit numquam vero velit. Distinctio minima quo nesciunt maiores.",
    review: 107,
    typeVariant: "E",
    colorVariant: "3",
    imageUrl: "https://dummyimage.com/135x733",
  },
  {
    id: 207,
    name: "Incidunt",
    price: 183,
    subCategoryId: 101,
    categoryId: 1,
    rate: 4.19,
    content:
      "Nam aperiam rem atque ut eius molestiae ex omnis. Ex consequatur ipsam quaerat nam provident. Maiores q.",
    review: 174,
    typeVariant: "E",
    colorVariant: "3",
    imageUrl:
      "https://placeholdit.imgix.net/~text?txtsize=55&txt=578x984&w=578&h=984",
  },
  {
    id: 208,
    name: "Ratione",
    price: 104,
    subCategoryId: 101,
    categoryId: 1,
    rate: 4.64,
    content:
      "Occaecati nam laudantium est quos. Fuga molestias facere consequatur sapiente cum reprehenderit quibusdam. Earum omnis i.",
    review: 104,
    typeVariant: "B",
    colorVariant: "3",
    imageUrl:
      "https://placeholdit.imgix.net/~text?txtsize=55&txt=808x46&w=808&h=46",
  },
  {
    id: 209,
    name: "Similique",
    price: 262,
    subCategoryId: 101,
    categoryId: 1,
    rate: 0.29,
    content:
      "Autem blanditiis similique saepe excepturi at error. Fugit qui accusantium.",
    review: 44,
    typeVariant: "C",
    colorVariant: "3",
    imageUrl: "http://www.lorempixel.com/577/852",
  },
  {
    id: 210,
    name: "Molestias",
    price: 145,
    subCategoryId: 101,
    categoryId: 1,
    rate: 0.15,
    content:
      "Deserunt ad ducimus recusandae praesentium. Repudiandae officia aliquam quas mollitia. Voluptatum ipsam iure eos.",
    review: 95,
    typeVariant: "E",
    colorVariant: "2",
    imageUrl: "https://dummyimage.com/76x231",
  },
  {
    id: 211,
    name: "Modi",
    price: 228,
    subCategoryId: 101,
    categoryId: 1,
    rate: 2.94,
    content:
      "Iure similique perferendis quia optio provident asperiores ad. Perferendis i.",
    review: 153,
    typeVariant: "E",
    colorVariant: "4",
    imageUrl:
      "https://placeholdit.imgix.net/~text?txtsize=55&txt=533x992&w=533&h=992",
  },
  {
    id: 212,
    name: "Voluptatibus",
    price: 172,
    subCategoryId: 101,
    categoryId: 1,
    rate: 2.68,
    content:
      "Cum aperiam sapiente non magni sequi facere. Et nihil soluta illum ips.",
    review: 29,
    typeVariant: "C",
    colorVariant: "4",
    imageUrl: "https://dummyimage.com/153x1011",
  },
  {
    id: 213,
    name: "Sapiente",
    price: 100,
    subCategoryId: 101,
    categoryId: 1,
    rate: 1.89,
    content:
      "Totam repudiandae assumenda facilis quod suscipit repellat delectus eligendi. .",
    review: 200,
    typeVariant: "B",
    colorVariant: "1",
    imageUrl: "https://dummyimage.com/379x367",
  },
  {
    id: 214,
    name: "Alias",
    price: 152,
    subCategoryId: 101,
    categoryId: 1,
    rate: 0.17,
    content:
      "At non doloribus alias optio delectus sit. Aperiam officiis soluta molestias .",
    review: 68,
    typeVariant: "B",
    colorVariant: "4",
    imageUrl:
      "https://placeholdit.imgix.net/~text?txtsize=55&txt=470x604&w=470&h=604",
  },
  {
    id: 215,
    name: "Non",
    price: 189,
    subCategoryId: 101,
    categoryId: 1,
    rate: 3.51,
    content:
      "Eligendi rem perspiciatis quas accusamus. Consequatur perferendis placea.",
    review: 86,
    typeVariant: "B",
    colorVariant: "3",
    imageUrl: "https://dummyimage.com/624x281",
  },
  {
    id: 216,
    name: "Quaerat",
    price: 280,
    subCategoryId: 102,
    categoryId: 1,
    rate: 0.81,
    content:
      "Nisi eos aspernatur exercitationem eius architecto dignissimos. Nam recusandae repellat saepe hic.",
    review: 135,
    typeVariant: "E",
    colorVariant: "2",
    imageUrl: "http://www.lorempixel.com/864/326",
  },
  {
    id: 217,
    name: "Odit",
    price: 238,
    subCategoryId: 102,
    categoryId: 1,
    rate: 2.35,
    content:
      "Beatae voluptatem soluta maxime non dignissimos. Doloribus asperiores dicta iusto itaque vel quos.",
    review: 186,
    typeVariant: "A",
    colorVariant: "3",
    imageUrl:
      "https://placeholdit.imgix.net/~text?txtsize=55&txt=270x252&w=270&h=252",
  },
  {
    id: 218,
    name: "Quibusdam",
    price: 100,
    subCategoryId: 102,
    categoryId: 1,
    rate: 3.44,
    content:
      "Consectetur nihil inventore ut delectus. Soluta eius soluta nisi.",
    review: 125,
    typeVariant: "B",
    colorVariant: "3",
    imageUrl:
      "https://placeholdit.imgix.net/~text?txtsize=55&txt=757x645&w=757&h=645",
  },
  {
    id: 219,
    name: "Velit",
    price: 130,
    subCategoryId: 102,
    categoryId: 1,
    rate: 3.27,
    content:
      "Sint quibusdam ratione eos. Alias accusantium fugit eum dolores aliquid eum. Odit repellendus.",
    review: 125,
    typeVariant: "D",
    colorVariant: "5",
    imageUrl: "https://dummyimage.com/839x368",
  },
];
const review = Product.map((review) => {
  // const { name, content, imageUrl } = review;
  // return [name, content, imageUrl];
  return review;
});
const displayReview = review
  .map((curReview) => {
    return `
    <div class="individual_review up" id="one">
    <div class="reviewer_image">
      <img src="${curReview.imageUrl}" alt="${curReview.name}">
    </div>
    <div class="text_container">
      <span class="reviewer_heading">
        <h1>${curReview.name}</h1>
      </span>
      <span class="reviewer_location">
      <p>Lagos, Nigeria</p>
        </span>
      <span class="comments">
      <p>
         ${curReview.content}
         </P>
      </span>
    </div>
  </div>
    `;
  })
  .join("");
reviewcontainer.innerHTML = displayReview;

/****************************BEST SELLING*************************/
const bestSelling = [
  {
    productName: "Female Shirt",
    productPrice: "N2,700",
    images: "./img/product-1.jpg",
  },
  {
    productName: "Gucci Jeans",
    productPrice: "N12,000",
    images: "./img/product-2.jpg",
  },
  {
    productName: "Ladies Butterfly",
    productPrice: "N5,000",
    images: "./img/product-3.jpg",
  },
  {
    productName: "Navy-Colored Shirt",
    productPrice: "N20,00",
    images: "./img/product-4.jpg",
  },
  {
    productName: "Paul Smit Male Jeans",
    productPrice: "N20,000",
    images: "/img/product-5.jpg",
  },
  {
    productName: "Male Free",
    productPrice: "N12,00",
    images: "/img/product-6.jpg",
  },
  {
    productName: "Female Hoodie",
    productPrice: "N30,000",
    images: "./img/product-7.jpg",
  },
];
const bestSell = function (product) {
  const bestSellingDOM = product
    .map((product) => {
      return `
       <div class="product_card" id="five">
       <div class="image_container ">
         <img src="${product.images}" alt="joggers">
       </div>
       <div class="price_details_container">
         <span class="name">${product.productName}</span>
         <span class="review"></span>
         <span class="price">${product.productPrice}</span>
       </div>
     </div>
     `;
    })
    .join("");
  const bestSellingContainer = document.querySelector(".product_card_layout");
  bestSellingContainer.insertAdjacentHTML("beforeend", bestSellingDOM);
};
bestSell(bestSelling);
/********************LOGIN VALIDATION***********************/
// function smallEl(input, error) {
//   const trial = input.parentElement;
//   let small = trial.querySelector("small");
//   small.innerText = error;
// }
function classError(input) {
  input.classList.add("error");
}

function classCorrect(input) {
  input.classList.add("correct");
}

function onEmpty(input) {
  input.forEach((input) => {
    if (input.value.trim() === "") {
      input.value = "";
      // smallEl(input, `${input.id} must be filled!`);
      classError(input);
    }
  });
}
// email validation
function EmailValidation(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(input.value.trim())) {
    classError(input);
    // smallEl(input, `${input.id} is invalid!`);
  } else {
    classCorrect(input);
  }
}

// password length
function passwordLength(input, min, max) {
  if (input.value.length < min) {
    classError(input);
    // smallEl(input, `${input.id} should be not less than ${min} charaters.`);
  } else if (input.value.length > max) {
    classError(input);
    // smallEl(input, `${input.id} should not be more than ${max} charaters.`);
  } else {
    classCorrect(input);
  }
}

submit.addEventListener("submit", (e) => {
  e.preventDefault();
  onEmpty([Email, password]);
  EmailValidation(Email);
  passwordLength(password, 6, 30);
});

// function emptyInput(inputArr) {
//   // if (!input.value === "") {
//   console.log(inputArr.value);
//   // }
// }

/********************SIGN UP VALIDATION***********************/

/********************TOGGLING HAMBURGER  MENU***********************/
//toggling the menu bar function
function toggleMenu(val) {
  val.classList.toggle("open_sidebar");
}

// changing icon on click of the menu bar function
function changeIcon(menu, val) {
  if (val.classList.contains("open_sidebar")) {
    menu.innerHTML = `<i class="fa fa-times"></i>`;
  } else {
    menu.innerHTML = `<i class="fa fa-bars"></i>`;
  }
}
// togggling the hamburger menu event
hamburger.addEventListener("click", () => {
  toggleMenu(nav);
  changeIcon(hamburger, nav);
});
// close hamburger menu
function CloseMenu(menu) {
  menu.classList.remove("open_sidebar");
}
/********************TOGGLING PRODUCT SIDE BAR***********************/
// opening each product side bar

function openSideBar(id) {
  id.classList.add("active");
}
// remove the active class
function closeSideBar(id) {
  id.classList.remove("active");
}
// get links id
link.forEach((curlink) => {
  curlink.addEventListener("click", (e) => {
    let listID = e.currentTarget.dataset.id;
    let Id = document.getElementById(listID);
    openSideBar(Id);
  });
});
// remove active class from sideBar
closes.forEach((cur) => {
  cur.addEventListener("click", () => {
    sideBar.forEach((curr) => {
      closeSideBar(curr);
    });
  });
});

/****************DROP DOWN FOR LARGER SCREEN***********************/
const jsMedia = window.matchMedia("(min-width:768px)");
// console.log(jsMedia);
function hoverMenu(e) {
  if (e.matches) {
    link.forEach((curLink) => {
      // console.log("hey");
      curLink.addEventListener("mouseover", (e) => {
        // console.log(e);

        const clicked = e.currentTarget.dataset.id;
        const clickedID = document.getElementById(clicked);
        clickedID.classList.toggle("active");
      });
    });
  }
}
// jsMedia.addEventListener("change", hoverMenu);
// hoverMenu(jsMedia);
// link.forEach((cur) => {
//   cur.addEventListener("click", () => {
//     console.log("working");
//   });
// });

/****************OPEN AND CLOSE SIGN UP CONTAINERS******************/
// sign up function
function signUp(sign) {
  sign.classList.add("sign");
}
// sign up events
signUP.addEventListener("click", () => {
  // open the sign up
  signUp(signUpContainer);
  // close hamburger menu
  CloseMenu(nav);
  // change the icon
  changeIcon(hamburger, nav);
  // close log in container if present
  closeLogin(logINContainer);
});
//close signup container
function closeSignUp(sign) {
  sign.classList.remove("sign");
}
// close signup toggle
closedSignup.addEventListener("click", () => {
  closeSignUp(signUpContainer);
});
// access login container from the sign up
goLogin.addEventListener("click", () => {
  //open the login
  logIn(logINContainer);
  // close hamburger menu
  CloseMenu(nav);
  // change the icon
  changeIcon(hamburger, nav);
  // close sign up container if present
  closeSignUp(signUpContainer);
});

/****************OPEN AND CLOSE LOGIN CONTAINERS******************/
// log in function
function logIn(varl) {
  varl.classList.add("open");
}
// log in events
logIN.addEventListener("click", () => {
  //open the login
  logIn(logINContainer);
  // close hamburger menu
  CloseMenu(nav);
  // change the icon
  changeIcon(hamburger, nav);
  // close sign up container if present
  closeSignUp(signUpContainer);
});
//close login container
function closeLogin(varl) {
  varl.classList.remove("open");
}
// access sign up container from the login button
goSignUp.addEventListener("click", () => {
  // open the sign up
  signUp(signUpContainer);
  // close hamburger menu
  CloseMenu(nav);
  // change the icon
  changeIcon(hamburger, nav);
  // close log in container if present
  closeLogin(logINContainer);
});
closedLogin.addEventListener("click", () => {
  closeLogin(logINContainer);
});

/*******************SHOPPING CART FUNCTION**************************/
// shopping cart toggling
shoppingCart.addEventListener("click", () => {
  shoppingContainer.classList.toggle("shop");
});

/*******************USER ICON TOGGLE LOGIN BAR*******************/
// toggle the login from the user icon
user.addEventListener("click", () => {
  logINContainer.classList.toggle("open");
  closeSignUp(signUpContainer);
});

/************GET CURRENT DATE******************************/
let currentDate = new Date().getFullYear();
curDate.innerText = currentDate;
// window.addEventListener("click", () => {
//   CloseMenu(nav);
//   console.log(nav);
// });
