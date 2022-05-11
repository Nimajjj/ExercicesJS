let itemContainer = document.querySelector("#items_container")

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    createItem(cart.article1)
    createItem(cart.article2)
    createItem(cart.article3)
}

function createItem(item) {
    if (item.qt == 0) {
        return
    }
    let li = document.createElement("li");
    li.classList.add("item");

    let img = document.createElement("img");
    img.src = item.img;
    img.id = "item_img_" + item.id;

    li.appendChild(img);

    let ul = document.createElement("ul");
    let liName = document.createElement("li");
    liName.innerHTML = item.name;
    let liPrice = document.createElement("li");
    liPrice.innerHTML = item.price + "€";

    ul.appendChild(liName);
    ul.appendChild(liPrice);


    let liQt = document.createElement("li");

    let minusBt = document.createElement("div");
    minusBt.classList.add("minus");
    minusBt.classList.add("bt");
    minusBt.innerHTML = "-";
    
    let qt = document.createElement("div");
    qt.classList.add("qt");
    qt.id = "qt_art_" + item.id;
    qt.innerHTML = item.qt;

    let plusBt = document.createElement("div");
    plusBt.classList.add("plus");
    plusBt.classList.add("bt");
    plusBt.innerHTML = "+";

    liQt.appendChild(minusBt);
    liQt.appendChild(qt);
    liQt.appendChild(plusBt);

    ul.appendChild(liQt);

    li.appendChild(ul);

    itemContainer.appendChild(li);
}

loadCart()