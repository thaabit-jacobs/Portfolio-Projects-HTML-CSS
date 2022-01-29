const productContainer = document.querySelector("#productContainer");

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
                    label.innerHTML = `
                    <svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-cart-fill">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>

                    <p>add to cart</p>`

                    productDiv.appendChild(label);
                });
console.log(json)
})