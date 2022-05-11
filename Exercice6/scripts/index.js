let cart = {
    article1 : {
        id: 1,
        name: "Air Jordan 1 Retro High University Blue",
        price : 545,
        qt : 0,
        img : "../images/article_1_front.jpg"
    },
    article2 : {
        id: 2,
        name: "Air Force 1 Low White Supreme",
        price : 250,
        qt : 0,
        img : "../images/article_2_front.jpg"
    },
    article3 : {
        id: 3,
        name: "Air Force 1 Low Metallic Chrome",
        price : 200,
        qt : 0,
        img : "../images/article_3_front.jpg"
    }
}
//localStorage.setItem("cart", JSON.stringify(cart));

function changeItemQt(item, qt) {
    let element = document.querySelector("#qt_art_" + item);
    if (parseInt(element.innerHTML) == 0 && qt == -1) {
        return
    }
    element.innerHTML = parseInt(element.innerHTML) + qt;
    switch(item) {
        case 1:
            cart.article1.qt = parseInt(element.innerHTML);
            break
        case 2:
            cart.article2.qt = parseInt(element.innerHTML);
            break
        case 3:
            cart.article3.qt = parseInt(element.innerHTML);
            break
    }
}

function add(item, qt) {
    let c = JSON.parse(localStorage.getItem('cart'));
    switch (item) {
        case 1:
            c.article1.qt += qt;
            break
        case 2:
            c.article2.qt += qt;
            break
        case 3:
            c.article3.qt += qt;
            break
    }
    cart = c
    localStorage.setItem("cart", JSON.stringify(c));
    loadCart()
}


function addToCart(item) {
    let c = JSON.parse(localStorage.getItem('cart'));
    switch (item) {
        case 1:
            c.article1.qt += parseInt(document.querySelector("#qt_art_" + item).innerHTML);
            document.querySelector("#qt_art_" + item).innerHTML = 0;
            break
        case 2:
            c.article2.qt += parseInt(document.querySelector("#qt_art_" + item).innerHTML);
            document.querySelector("#qt_art_" + item).innerHTML = 0;
            break
        case 3:
            c.article3.qt += parseInt(document.querySelector("#qt_art_" + item).innerHTML);
            document.querySelector("#qt_art_" + item).innerHTML = 0;
            break
    }
    cart = c
    localStorage.setItem("cart", JSON.stringify(c));
    loadCart()
}



function changeState(state) {
    if (state == "shop") {
        document.querySelector("#shop").style.display = "flex";
        document.querySelector("#cart").style.display = "none";
        document.querySelector("#total_price").style.display = "none";
    } else if (state == "cart") {
        document.querySelector("#shop").style.display = "none";
        document.querySelector("#cart").style.display = "block";
        document.querySelector("#total_price").style.display = "block";
        loadCart()
    }
}
let itemContainer = document.querySelector("#items_container")

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    itemContainer.innerHTML = "";
    createItem(cart.article1)
    createItem(cart.article2)
    createItem(cart.article3)

    document.querySelector("#total_price").innerHTML = "Total : " + parseInt    (cart.article1.qt * cart.article1.price + cart.article2.qt * cart.article2.price + cart.article3.qt * cart.article3.price) + "€";
}

function removeFromCart(item) {
    let c = JSON.parse(localStorage.getItem('cart'));
    switch (item) {
        case 1:
            c.article1.qt = 0;
            break
        case 2:
            c.article2.qt = 0;
            break
        case 3:
            c.article3.qt = 0;
            break
    }
    cart = c
    localStorage.setItem("cart", JSON.stringify(c));
    loadCart()
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
    minusBt.onclick = add.bind(null, item.id, -1);
    
    let qt = document.createElement("div");
    qt.classList.add("qt");
    qt.id = "qt_art_" + item.id;
    qt.innerHTML = item.qt;

    let plusBt = document.createElement("div");
    plusBt.classList.add("plus");
    plusBt.classList.add("bt");
    plusBt.innerHTML = "+";
    plusBt.onclick = add.bind(null, item.id, 1);

    let removeBt = document.createElement("div");
    removeBt.classList.add("remove");
    removeBt.classList.add("bt");
    removeBt.innerHTML = "remove";
    removeBt.onclick = removeFromCart.bind(null, item.id);

    liQt.appendChild(minusBt);
    liQt.appendChild(qt);
    liQt.appendChild(plusBt);
    liQt.appendChild(removeBt);

    ul.appendChild(liQt);

    li.appendChild(ul);

    itemContainer.appendChild(li);
}


cart = JSON.parse(localStorage.getItem("cart"))