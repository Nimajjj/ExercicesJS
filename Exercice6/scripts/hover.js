let img_art_1 = document.querySelector("#img_art_1");
img_art_1.addEventListener("mouseover", event => {
    img_art_1.src = "../images/article_1_back.jpg";
});

img_art_1.addEventListener("mouseout", event => {
    img_art_1.src = "../images/article_1_front.jpg";
});


let img_art_2 = document.querySelector("#img_art_2");
img_art_2.addEventListener("mouseover", event => {
    img_art_2.src = "../images/article_2_back.jpg";
});

img_art_2.addEventListener("mouseout", event => {
    img_art_2.src = "../images/article_2_front.jpg";
});


let img_art_3 = document.querySelector("#img_art_3");
img_art_3.addEventListener("mouseover", event => {
    img_art_3.src = "../images/article_3_back.jpg";
});

img_art_3.addEventListener("mouseout", event => {
    img_art_3.src = "../images/article_3_front.jpg";
});