// INIT VAR
class Vector2D {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let canvas = {
    cvs : document.querySelector("#canvas"),
    ctx : document.querySelector("#canvas").getContext('2d'),
}

const filledCellColor = "#ce9ac9";
const visitedCellColor = "#a0789c";
const cellSize = 64;
let currentLever = 1

let numberOfCells = 0
let cellsVisited = 0
let playing = false

let currentLevel = 1
let difficulty = 5


// GENERAL FUNCTIONS
function drawRect(x, y) {
    canvas.ctx.beginPath();
    canvas.ctx.rect(x, y, cellSize, cellSize);
    canvas.ctx.stroke();
}

function fillRect(x, y, color) {
    canvas.ctx.fillStyle = color;
    canvas.ctx.fillRect(x*cellSize+1, y*cellSize+1, cellSize-2, cellSize-2);
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}


// INIT GAME FUNCTIONS
function initGrid(gridSize) {
    canvas.cvs.attributes.width.value = gridSize * cellSize;
    canvas.cvs.attributes.height.value = gridSize * cellSize;

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            drawRect(x * cellSize, y * cellSize);
        }
    }
    initPath(gridSize)
    playing = true
}



function initPath(gridSize) {
    numberOfCells = gridSize + Math.floor(Math.random() * gridSize + gridSize/2);    // random number of cells to fill
    let currentCell = new Vector2D(                                         // random start position
        Math.floor(Math.random() * gridSize),
        Math.floor(Math.random() * gridSize)
    )
    fillRect(currentCell.x, currentCell.y, filledCellColor);

    let i = 0   // counter for the number of displayed cells
    let j = 0   // counter for the number of loop iteration, if it goes above 50 we force faillur to retry

    let avoidedDirections = []
    while (i < numberOfCells) {   // make path
        let direction = Math.floor(Math.random() * 4)  // 0top, 1right, 2bottom, 3left
        if (avoidedDirections.indexOf(direction) != -1) {
            if (avoidedDirections.length == 4) { break }
            continue
        }
        switch (direction) {   
            case 0:
                let v0 = new Vector2D(currentCell.x, currentCell.y-1);
                if (v0.y > 0 && getCellState(v0) == 0) {
                    currentCell = v0;
                    fillRect(currentCell.x, currentCell.y, filledCellColor);
                    avoidedDirections = [];
                    i++;
                } else { avoidedDirections.push(0); }
                break;
            case 1:
                let v1 = new Vector2D(currentCell.x+1, currentCell.y);
                if (v1.x < gridSize - 1 && getCellState(v1) == 0) {
                    currentCell = v1;
                    fillRect(currentCell.x, currentCell.y, filledCellColor);
                    avoidedDirections = [];
                    i++;
                } else { avoidedDirections.push(1); }
                break;
            case 2:
                let v2 = new Vector2D(currentCell.x, currentCell.y+1);
                if (v2.y < gridSize - 1 && getCellState(v2) == 0) {
                    currentCell = v2;
                    fillRect(currentCell.x, currentCell.y, filledCellColor);
                    avoidedDirections = [];
                    i++;
                } else { avoidedDirections.push(2); }
                break;
            case 3:
                let v3 = new Vector2D(currentCell.x-1, currentCell.y);
                if (v3.x > 0 && getCellState(v3) == 0) {
                    currentCell = v3;
                    fillRect(currentCell.x, currentCell.y, filledCellColor);
                    avoidedDirections = [];
                    i++;
                } else { avoidedDirections.push(3); }
                break;
            }

            j++; if (j > 50) { break }  // avoid infinite loop
    }
    if (i+1 != numberOfCells) {   // if path not complete
        initGrid(gridSize)
    }
}

/**
 * @breif: return the cell state at the given position
 * 
 * @return: 0 if the cell is empty, 1 if the cell is filled, 2 if cell has been visited
 */
function getCellState(v) {
    if (v.x < 0 || v.x >= cellSize*5 || v.y < 0 || v.y >= cellSize*5) {
        return 0
    }
    let xPos = (v.x * cellSize) + (cellSize/2)
    let yPos = (v.y * cellSize) + (cellSize/2)
    if (xPos > canvas.cvs.width) {
        xPos -= 32
    }
    if (yPos > canvas.cvs.height) {
        yPos -= 32
    }
    let pixelData = canvas.ctx.getImageData(xPos, yPos, 1, 1).data; 

    let hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);

    if (hex == filledCellColor) {
        return 1
    } else if (hex == visitedCellColor) {
        return 2
    } else {
        return 0
    }
}


// MOUSE RELATED FUNCTIONS
let mousePress = false;

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

let lastCell = new Vector2D(-1, -1);
function mouseOn(evt) {
    if (!playing) { return }

    let mousePos = getMousePos(canvas.cvs, evt);
    mousePos = new Vector2D(
        Math.floor(mousePos.x / cellSize),
        Math.floor(mousePos.y / cellSize)
    )

    if (lastCell.x == mousePos.x && lastCell.y == mousePos.y) { return }

    let state = getCellState(mousePos)
    if (state == 1) {
        fillRect(mousePos.x, mousePos.y, visitedCellColor)
        cellsVisited++
        if (cellsVisited == numberOfCells) {
            playing = false
        }
    } else if (state == 0 || state == 2) {
        document.querySelector("#result").innerHTML = "YOU LOOSE!"
        playing = false
    }

    lastCell = mousePos
}

canvas.cvs.addEventListener(
    "mousedown",
    function(evt) {
        mousePress = true;
    },
    false
)

canvas.cvs.addEventListener(
    "mouseup",
    function(evt) {
        mousePress = false;
        console.log("numberOfCells: ", numberOfCells," \ncellsVisited: " ,cellsVisited, "\nwin : ", cellsVisited == numberOfCells)
        if (cellsVisited == numberOfCells) {
            currentLevel++
        } else {
            currentLevel = 1
            document.querySelector("#result").innerHTML = "YOU LOOSE!"
            resetStats()
            return
        }
        playing = false
        reset()
        initGrid(difficulty)
        testVictory()
    },
    false
)

canvas.cvs.onmousemove = function(evt) {
    if (mousePress) {
        mouseOn(evt)
    }
};



// MAIN
document.querySelector("#start").addEventListener("click", function() {
    reset()
    initGrid(difficulty)
})

document.querySelector("#reset").addEventListener("click", function() {
    reset()
    initGrid(difficulty)
})

function reset() {
    document.querySelector("#game").style.display = "block"
    lastCell = new Vector2D(-1, -1)
    playing = true
    numberOfCells = 0
    cellsVisited = 0
    if (currentLevel > 5 && currentLevel < 10) { difficulty = 6 }
    else if (currentLevel > 10 ) { difficulty = 8 }
    document.querySelector("#result").innerHTML = ""
    document.querySelector("#level").innerHTML = "Level : " + currentLevel + "/15"
    if (difficulty == 5) { document.querySelector("#difficulty").innerHTML = "Difficulty : easy" }
    else if (difficulty == 6) { document.querySelector("#difficulty").innerHTML = "Difficulty : average" }
    else if (difficulty == 8) { document.querySelector("#difficulty").innerHTML = "Difficulty : hard" }
}

function testVictory() {
    if (currentLevel == 15) { 
        document.querySelector("#result").innerHTML = "YOU WIN!"
        playing = false
        document.querySelector("#game").style.display = "none"
        resetStats()
    }
}

function resetStats() {
    currentLevel = 1
    difficulty = 5
}