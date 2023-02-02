//Consegna (1a parte)
// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.

// Bonus
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;


//Consegna (2a parte)
//Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
//Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell'array delle bombe non potranno esserci due numeri uguali.
//In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
// Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

// SUPERBONUS 1:
// Quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle.
// SUPERBONUS 2:
// Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.


/**************************************************************************
*                                                                         *
*                                 ON LOAD                                 *
*                                                                         *
***************************************************************************/
let playButton = document.getElementById("play");
const playLevel = document.getElementById("mySelect");



/**************************************************************************
 *                                                                         *
 *                              EVENT LISTENER                             *
 *                                                                         *
***************************************************************************/
playButton.addEventListener(
    "click",
    function () {
        const gridEl = document.getElementById("grid");
        const chooseLevel = playLevel.value;
        let dimension;

        if (chooseLevel == "l-1") {
            dimension = 100;
        } else if (chooseLevel == "l-2") {
            dimension = 81;
        } else {
            dimension = 49;
        }
        createGrid(gridEl, dimension, chooseLevel);
    }
);



/**************************************************************************
*                                                                         *
*                                 FUNCTIONS                               *
*                                                                         *
***************************************************************************/
function createGrid(gridEl, dim, chooseLevel) {
    gridEl.innerHTML = "";

    //creazione bombe
    const diffBombs = [];
    let randomNum;
    const howManyBombs = 16;
    while (diffBombs.length < howManyBombs) {
        randomNum = Math.floor((Math.random() * dim) + 1);

        if (!diffBombs.includes(randomNum)) {
            diffBombs.push(randomNum);
        }
    }
    console.log(diffBombs);

    for (let i = 0; i < dim; i++) {
        //per creare e aggiungere le celle
        const square = document.createElement("div");
        square.classList.add("square", "text-white", "fw-bold");

        //per determinare dimensione celle in base al livello scelto
        if (chooseLevel == "l-1") {
            square.classList.add("diff-1");
        } else if (chooseLevel == "l-2") {
            square.classList.add("diff-2");
        } else {
            square.classList.add("diff-3");
        }

        //per aggiungere alla griglia la cella appena creata
        gridEl.append(square);

        //per aggiungere i numeri alle celle
        const squareNum = i + 1;
        square.innerHTML = squareNum;


        //per far cambiare colore alla cella se cliccata
        square.addEventListener(
            "click",
            function () {
                this.classList.toggle("active");
                console.log("Il numero corrispondente alla cella è ", this.innerHTML);

                //casella rossa se corrisponde ad una bomba
                for (let j = 0; j < howManyBombs; j++) {
                    if (this.innerHTML == diffBombs[j]) {
                        this.classList.add("red-bomb");
                        // return gridEl.innerHTML = "";
                    }
                }
            }
        )
    }



}
