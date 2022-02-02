const productContainer = document.querySelector("#productContainer");
const cartItemCount = document.querySelector("#cartItemCount");
const cartElement = document.querySelector("#cart");
const overLay = document.querySelector(".over-lay");
const cartContainer = document.querySelector(".cart-container");
const closeBtn = document.querySelector(".close-btn");
const cartItemContainer = document.querySelector(".cart-item-container");
const clearBtn = document.querySelector(".clear-btn");

let cart = {
    products: [],
    totalCost: 0,
    productCount: 0
};

cartElement.addEventListener("click", (event) => {
    overLay.className = "over-lay";

    renderCartProducts();
})

closeBtn.addEventListener("click", (event) => {
    clearBasket();

    overLay.className = "over-lay hide";
})


function addProduct(product){
    let products = cart.products;
    if(products.length === 0){
        product.count = 1; 
        products.push(product);
    } else{
        let foundProduct = products.find(p => p.id === product.id);

        if(foundProduct !== undefined){
            product.count = ++product.count; 
        }else{
            product.count = 1; 
            products.push(product);
        }
    }

    setCartPrice();
    setProductLenth();
}

function setCartPrice(){
    let totalCost = 0;

    cart.products
        .forEach(product => {
                totalCost += product.price * product.count;
        });

    cart.totalCost = Math.round(totalCost * 100) / 100;

}

function setProductLenth(){
    let productCount = 0;

    cart.products
        .forEach(product => {
            productCount += product.count;
        });

    cart.productCount = productCount;
}

fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=> {
                json.forEach(product => {
                    let productDiv = document.createElement("div");
                    productDiv.className = "product";
                    
                    productContainer.appendChild(productDiv);

                    let imgContainer = document.createElement("div");
                    imgContainer.className = "img-container";

                    let img = document.createElement("img");
                    img.className = "product-img  mb-05";
                    img.setAttribute("src", product.image);

                    imgContainer.appendChild(img);

                    productDiv.appendChild(imgContainer);

                    let productName = document.createElement("p");
                    productName.className = "product-name bold mb-05";
                    productName.innerText = product.title;

                    productDiv.appendChild(productName);

                    let productPrce = document.createElement("p");
                    productPrce.className = "product-price bold  mb-05 sec-color";
                    productPrce.innerText = "$" + product.price;

                    productDiv.appendChild(productPrce);

                    let label = document.createElement("div");
                    label.className = "label";
                    label.innerHTML = 
                    `
                    <svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-cart-fill">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <p>add to cart</p>
                    `

                    label.addEventListener("click", () => { 
                       addProduct(product);
                       cartItemCount.innerText = cart.productCount;
                    })

                    productDiv.appendChild(label);
                });
})


function renderCartProducts(){
    renderCartItems();

    const cartCost = document.querySelector("#cartCost");
    cartCost.innerText = cart.totalCost;
}

function renderCartItems(){
    cart.products.forEach(product => {
        let cartItem = document.createElement("div");
        cartItem.className = "cart-item mb-1";

        let cartItemImg = document.createElement("img");
        cartItemImg.setAttribute("src", product.image);
        cartItem.appendChild(cartItemImg);

        let cartItemInfo = document.createElement("div");
        cartItemInfo.className = "cart-item-info";

        let itemName = document.createElement("h3");
        itemName.innerText = product.title;

        let itemPrice = document.createElement("p");
        itemPrice.innerText = `$${product.price}`;

        cartItemInfo.appendChild(itemName);
        cartItemInfo.appendChild(itemPrice);
        cartItem.appendChild(cartItemInfo);

        let itemCount = document.createElement("div");
        itemCount.className = "cart-item-count";

        let count = document.createElement("p");
        count.innerText = product.count;

        itemCount.appendChild(count);

        let btnGrp = document.createElement("div");
        btnGrp.className = "btn-grp";

        let imgPlus = document.createElement("img");
        imgPlus.setAttribute("src", "images/plus.svg");
        addProductListener(imgPlus, product);

        let imgMinus = document.createElement("img");
        imgMinus.setAttribute("src", "images/minus.svg");
        minusProductListener(imgMinus, product);

        btnGrp.appendChild(imgMinus);
        btnGrp.appendChild(imgPlus);

        itemCount.appendChild(btnGrp);

        cartItem.appendChild(itemCount);
        
        cartItemContainer.appendChild(cartItem);
    })
}

function minusProductListener(img, product){
    img.addEventListener("click", (event) => {
        let currentProduct = product.count;

        if(--currentProduct === 0) 
            deleteProduct(product);
        else 
        product.count = currentProduct;

        clearBasket();
        renderCartProducts();

        updateCartDetails();
    })
}

function updateCartDetails(){
    setCartPrice();
    setProductLenth();

    const cartCost = document.querySelector("#cartCost");
    cartCost.innerText = cart.totalCost;

    cartItemCount.innerText = cart.productCount;
}

function addProductListener(img, product){
    img.addEventListener("click", (event) => {
        let currentProduct = product.count;

        product.count = ++currentProduct;

        clearBasket();
        renderCartProducts();
        
        updateCartDetails();
    })

}

function deleteProduct(product){
    cart.products = cart.products
                        .filter(p => p.title !== product.title);
                            
}

clearBtn.addEventListener("click", (event) => {
    resetCart();
})

function resetCart(){
    cart.products = [];
    cart.productCount = 0;
    cart.totalCost = 0;

    clearBasket();

    cartItemCount.innerText = cart.productCount;

    const cartCost = document.querySelector("#cartCost");
    cartCost.innerText = cart.totalCost;
}

function clearBasket(){
    cartItemContainer.querySelectorAll(".cart-item").forEach(n => n.remove());
}