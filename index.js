const productList = [
  {
    name: "Gold Necklaces",
    imgUrl:
      "https://host5.omgnhosting.com/~omgtest10/wp-content/uploads/2023/11/necklaces.png",
  },
  {
    name: "Bracelets",
    imgUrl:
      "https://host5.omgnhosting.com/~omgtest10/wp-content/uploads/2023/11/bracelets.png",
  },
  {
    name: "Earrings",
    imgUrl:
      "https://host5.omgnhosting.com/~omgtest10/wp-content/uploads/2023/11/earrings.png",
  },
  {
    name: "Engagement Rings",
    imgUrl:
      "https://host5.omgnhosting.com/~omgtest10/wp-content/uploads/2023/11/engagement-rings.png",
  },
  {
    name: "Jewelry and Watch Repair",
    imgUrl:
      "https://host5.omgnhosting.com/~omgtest10/wp-content/uploads/2023/11/jewelry-and-watch-repair.png",
  },
  {
    name: "Jewelry Sales",
    imgUrl:
      "https://host5.omgnhosting.com/~omgtest10/wp-content/uploads/2023/11/jewelry-sales.png",
  },
];

let currProductIndex = 1;

const sliderWrapper = document.querySelector(".product-slider");

const init1 = document.querySelector(".last-product");
const init2 = document.querySelector(".curr-product");
const init3 = document.querySelector(".next-product");

init1.innerHTML = `
<img src="${productList[0].imgUrl}" alt="${productList[0].name}" />
<span class="product-description">${productList[0].name}</span>
`;
init2.innerHTML = `
<img src="${productList[1].imgUrl}" alt="${productList[1].name}" />
<span class="product-description">${productList[1].name}</span>
`;
init3.innerHTML = `
<img src="${productList[2].imgUrl}" alt="${productList[2].name}" />
<span class="product-description">${productList[2].name}</span>
`;

init1.addEventListener("click", goToLastProduct);
init3.addEventListener("click", goToNextProduct);

document
  .querySelector(".goto-last-product svg")
  .addEventListener("click", goToLastProduct);
document
  .querySelector(".goto-next-product svg")
  .addEventListener("click", goToNextProduct);

function clearImgEventListeners(lastProduct, newProduct) {
  lastProduct.removeEventListener("click", goToLastProduct);
  newProduct.removeEventListener("click", goToNextProduct);
}

function createNewImgEventListeners(lastProduct, newProduct) {
  lastProduct.addEventListener("click", goToLastProduct);
  newProduct.addEventListener("click", goToNextProduct);
}

function goToLastProduct() {
  const removeProduct = document.querySelector(".next-product");
  const nextProduct = document.querySelector(".last-product");

  clearImgEventListeners(nextProduct, removeProduct);

  currProductIndex = decrementIndex();

  removeProduct.remove();

  const currProduct = document.querySelector(".curr-product");
  currProduct.classList.remove("curr-product");
  currProduct.classList.add("next-product");

  nextProduct.classList.remove("last-product");
  nextProduct.classList.add("curr-product");

  const leftProductIndex = decrementIndex();
  const leftProduct = document.createElement("div");
  leftProduct.innerHTML = `
    <img src="${productList[leftProductIndex].imgUrl}" alt="${productList[leftProductIndex].name}" />
    <span class="product-description">${productList[leftProductIndex].name}</span>
    `;
  leftProduct.classList.add("product");
  leftProduct.classList.add("last-product");
  sliderWrapper.insertBefore(leftProduct, sliderWrapper.firstChild);

  createNewImgEventListeners(leftProduct, currProduct);
}

function decrementIndex() {
  return currProductIndex - 1 < 0
    ? productList.length - 1
    : currProductIndex - 1;
}

function goToNextProduct() {
  const lastProduct = document.querySelector(".last-product");
  const nextProduct = document.querySelector(".next-product");

  clearImgEventListeners(lastProduct, nextProduct);

  currProductIndex = (currProductIndex + 1) % productList.length;

  lastProduct.remove();

  const currProduct = document.querySelector(".curr-product");
  currProduct.classList.remove("curr-product");
  currProduct.classList.add("last-product");

  nextProduct.classList.remove("next-product");
  nextProduct.classList.add("curr-product");

  const newProductIndex = (currProductIndex + 1) % productList.length;
  const newProduct = document.createElement("div");
  newProduct.innerHTML = `
    <img src="${productList[newProductIndex].imgUrl}" alt="${productList[newProductIndex].name}" />
    <span class="product-description">${productList[newProductIndex].name}</span>
    `;
  newProduct.classList.add("product");
  newProduct.classList.add("next-product");
  sliderWrapper.appendChild(newProduct);

  createNewImgEventListeners(currProduct, newProduct);
}
