// let arr = [['x','x','o'],
//            ['x','o','o'],
//            ['x','o','x']];

// let a = arr[0][0];
// let b = arr[0][1];
// let c = arr[0][2];
// let d = arr[1][0];
// let e = arr[2][0];
//  let a1,b1,c1,d1,e1;

// for(let j=0; j<=2; j++){
//     if(arr[0][j] = a){
//             a1++;
//             if(a1==3){
//                 console.log(a)
//             }
//     }

//     if(arr[1][j] = b){
//             b1++;
//             if(b1==3){
//                 console.log(b)
//             }
//     }

//     if(arr[2][j] = c){
//             c1++;
//             if(c1==3){
//                 console.log(c)
//             }
//     }

//     if(arr[j][0] = a){
//             a1++;
//             if(a1==3){
//                 console.log(a)
//             }
//     }

//     if(arr[j][1] = d){
//         d1++;
//         if(d1==3){
//             console.log(d)
//         }
//     }
//     if(arr[j][2] = e){
//         e1++;
//         if(e1==3){
//             console.log(e)
//         }
//     }
//     if(arr[j][j] = a){
//         a1++;
//         if(a1==3){
//             console.log(a)
//         }
//     }
//     if(arr[j][2-j] = e){
//         e1++;
//         if(e1==3){
//             console.log(e)
//         }
//     }
// }

let cells = ["", "", "", "", "", "", "", "", ""]; // O X

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach((item, i) => {
    const cell = document.createElement('span');
    cell.className = "cell";
    cell.id = i;
    cell.innerText = "";
    cell.addEventListener("click", cellClick);
    document.getElementById("gamePanel").appendChild(cell);
    cell.innerText = "";
});

let stepCount = 1;
let winner = "";
let currentPlayer = "X";

function startGame() {
    Array.from({ length: 9 }).forEach((item, i) => {
        document.getElementById(i).innerText = "";
        cells[i] = "";
    });
    winner = "";
    stepCount = 1;
    console.log("New Game:", cells);
    document.getElementById("header").innerText = `Turn: ${currentPlayer} | Step: ${stepCount}`;
    document.getElementById("result").innerText = winner;

}


document.getElementById("header").innerText = `Turn: ${currentPlayer} | Step: ${stepCount}`;


let X = 0, O = 0;
let previousPlayer;

function cellClick(e) {
    if (e.target.innerText == "" && !winner.length && (X+O) < 5) {
        e.target.innerText = currentPlayer;
        cells[e.target.id] = currentPlayer;
        previousPlayer = currentPlayer;
        currentPlayer = currentPlayer == "X" ? "O" : "X";

        (document.getElementsByClassName(`player${currentPlayer}`))[0].style.color = "red";
        (document.getElementsByClassName(`player${previousPlayer}`))[0].style.color = "black";

        console.log(cells);


        if (stepCount >= 5) {
            for (pattern of winningPatterns) {
                const [p1, p2, p3] = pattern;

                if (cells[p1] !== "" && cells[p1] == cells[p2] && cells[p2] == cells[p3]) {
                    winner = `Winner is ${cells[p1]}`;
                    console.log(winner);
                    document.getElementById("result").innerText = winner;
                    document.getElementById("playBtn").innerText = "Play again!";
                    if (cells[p1] == 'X') {
                        X += 1;
                        console.log(X);
                        document.getElementById("player1").innerText = X;
                    } else {
                        O += 1;
                        document.getElementById("player2").innerText = O;

                    }
                    // stepCount=1;
                    // return;
                }
            }
        }
        if ((X+O) == 5) {
            if (X >= 3) {
                document.getElementById("lastwin").innerText = "player 1 win";
            } else {
                document.getElementById("lastwin").innerText = "player 2 win";

            }
        }

        if (stepCount == 9) {
            winner = "Its Tie!"
            console.log(winner);
            document.getElementById("result").innerText = winner;
            document.getElementById("playBtn").innerText = "Play again!";
            // stepCount =1;
        }
        stepCount++;
        // if (stepCount == 9) {
        //     stepCount =1; 
        // }
        document.getElementById("header").innerText = `Turn: ${currentPlayer} | Step: ${stepCount}`;
    }
}

document.getElementById("playBtn").innerText = "Start";