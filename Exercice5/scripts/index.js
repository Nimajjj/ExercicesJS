let images = [
    'images/casino.png',
    'images/cherry.png',
    'images/cherry.png',
    'images/diamond.png',
    'images/diamond.png',
    'images/lemon.png',
    'images/lemon.png',
]

let tokens = 500

function play(mise) {
    console.log("token : ", tokens)
    console.log("mise : ", mise)
    console.log("Effective tokens : ", tokens - mise)
    tokens -= mise

    let r1 = Math.floor(Math.random() * 6)
    let r2 = Math.floor(Math.random() * 6)
    let r3 = Math.floor(Math.random() * 6)

    document.querySelector("#fruit1").src = images[r1]
    document.querySelector("#fruit2").src = images[r2]
    document.querySelector("#fruit3").src = images[r3]

    testResult(r1, r2, r3, mise)
    update()
    console.log(" ")
}

function testResult(r1, r2, r3, mise) {
    let result = [r1, r2, r3]


    for (let i = 0; i < result.length; i++) {   // format result
        if (result[i] == 2) {
            result[i] = 1
        } else if (result[i] == 4) {
            result[i] = 3
        } else if (result[i] == 6) {
            result[i] = 5
        }
    }

    console.log(result[0]," ", result[1]," ", result[2])

    if (result[0] == result[1] && result[1] == result[2]) { // 3 identicals fruits
        if (result[0] == 0) {  // 3 casino
            tokens += parseInt(mise * 10)
            console.log("3 casino mise * 10")
        } else if (result[0] == 1) {   // 3 cherry
            tokens += parseInt(mise * 1.5)
            console.log("3 cherry mise * 1.5")
        } else if (result[0] == 3) {   // 3 diamond
            tokens += parseInt(mise * 2.5)
            console.log("3 diamond mise * 2.5")
        } else if (result[0] == 5) {   // 3 lemon
            tokens += parseInt(mise * 1.25)
            console.log("3 lemon mise * 1.25")
        }
        console.log("resultat : ", tokens)
        return
    }

    let diamond = 0
    for (let i = 0; i < result.length; i++) {
        if (result[i] == 3 || result[i] == 4) {
            diamond++
        }
    }

    if (diamond == 1) { // 1 diamond
        tokens += parseInt(mise * 0.5)
        console.log("1 diamond mise * 0.5")
    } else if (diamond == 2) {  // 2 diamond
        tokens += mise
        console.log("2 diamond mise * 1")
    }
    console.log("resultat : ", tokens)
}

function update() {
    if (tokens < 200) {
        document.querySelector("#play200").style.display = "none";
    } else {
        document.querySelector("#play200").style.display = "block";
    }
    if (tokens < 50) {
        document.querySelector("#play50").style.display = "none";
    } else {
        document.querySelector("#play50").style.display = "block";
    }
    if (tokens < 10) {
        document.querySelector("#play10").style.display = "none";
    } else {
        document.querySelector("#play10").style.display = "block";
    }

    document.querySelector("#tokens").innerHTML = "Jetons : " + tokens

    if (tokens < 10) {
        document.querySelector("#result").innerHTML = "Vous ne pouvez plus jouez, vous êtes ruiné !"
    }
}



update()