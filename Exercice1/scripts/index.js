let images = [
    "crapeaud1.jpg",
    "crapeaud2.jpg",
    "crapeaud3.jpg",
    "crapeaud4.jpeg",
]


for (let i = 0; i < images.length; i++) {
    let dot = document.createElement('li');
    dot.className = 'dot';
    dot.id = i
    if (i == 0) dot.style.opacity = 1.0
    document.querySelector('#summary').appendChild(dot);
}


let i = 0;

document.querySelectorAll('.bt').forEach(item => {
    item.addEventListener('click', event => {
        if (item.id == 'next') i++;
        if (item.id == 'previous') i--;
        if (i < 0) i = images.length - 1;
        if (i > images.length - 1) i = 0;
        document.querySelector('#img').src = 'images/' + images[i]
        document.querySelector('#img').alt = images[i]

        
        for (let j = 0; j < document.querySelectorAll('.dot').length; j++) {
            if (j == i) document.querySelectorAll('.dot')[j].style.opacity = 1;
            else document.querySelectorAll('.dot')[j].style.opacity = 0.5;
        }

    })})


document.querySelectorAll('.dot').forEach(item => {
    item.addEventListener('click', event => {
        i = item.id
        document.querySelector('#img').src = 'images/' + images[i]
        document.querySelector('#img').alt = images[i]

        for (let j = 0; j < document.querySelectorAll('.dot').length; j++) {
            if (j == i) document.querySelectorAll('.dot')[j].style.opacity = 1;
            else document.querySelectorAll('.dot')[j].style.opacity = 0.5;
        }
    })})