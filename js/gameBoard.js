import { Calculators } from "./util.js"

export const gameBoard = (() => {
    let diceSlots = [],
        currentDiceValues = [],
        currentRoll = 0,
        upperSubtotal = 0,
        lowerSubtotal = 0,
        gameOver = false

    const rollButton = document.getElementById("roll-button");
    const infoHeading = document.getElementById("info-heading");
    const infoSubheading = document.getElementById("info-subheading");

    const init = () => {
        getDiceSlots();
        displayInitialDice();
        setInitialScoreValues();
        disableScoreBoard();
    }
    
    const setInitialScoreValues = () => {
        const scores = document.getElementsByClassName("score-board-item-button");
        for (const score of scores) {
            score.innerHTML = 0;
            score.classList.remove("scored");
        }
    }

    const getDiceSlots = () => {
        for (let i = 0; i < 5; i++) {
            diceSlots.push(document.getElementById("die-slot-" + i));
        }
    }
    
    const displayInitialDice = () => {
        clearHeldDice();
        for (const slot of diceSlots) {
            slot && (slot.firstElementChild.className = "");
            slot && (slot.firstElementChild.classList.add("dice", "die-init"));
        }
    }

    const rollSingleDie = () => {
        return Math.floor(Math.random() * 6) + 1;
    }

    const toggleDieHold = (id) => {
        const el = document.getElementById(id);
        !el.firstElementChild.classList.contains("die-init") && el.classList.toggle("selected");
    }

    const disableRollButton = () => {
        rollButton.setAttribute("disabled", true);
    }

    const enableRollButton = () => {
        rollButton.removeAttribute("disabled");
        !gameOver && (rollButton.innerHTML = "Roll Dice!");
    }

    const updateRollButton = () => {
        if (gameOver) {
            rollButton.innerHTML = "Start!";
            infoHeading.innerHTML = "Your final score is " + (upperSubtotal + lowerSubtotal) + "!";
            infoSubheading.innerHTML = "Click Start to play again.";
            return;
        }
        infoSubheading.innerHTML = "You have " + (3 - currentRoll) + " roll(s) left.";
        if (currentRoll === 0) {
            infoHeading.innerHTML = "Next turn!";
        }
        if (currentRoll > 0) {
            infoHeading.innerHTML = "Click dice to hold them!";
        }
        if (currentRoll > 2) {
            disableRollButton();
            rollButton.innerHTML = "Out of rolls!";
            infoHeading.innerHTML = "Place your score on the scoreboard!";
        }
    }

    const rollButtonAction = () => {
        if (gameOver) {
            restartGame();
            return;
        }
        rollDice();
    }

    const rollDice = () => {
        for (let i = 0; i < 5; i++) {
            if (!document.getElementById("die-slot-" + i).classList.contains("selected")) {
                currentDiceValues[i] = rollSingleDie();
            }
        }
        currentRoll++;
        updateRollButton();
        displayDice();
        enableScoreBoard();
        Calculators.setAllScores(currentDiceValues);
    }

    const displayDice = () => {
        for (let [i, slot] of diceSlots.entries()) {
            slot = document.getElementById("die-slot-" + i);
            slot.firstElementChild.className = "";
            slot.firstElementChild.classList.add("dice", "die-img-" + currentDiceValues[i]);
        }
    }

    const disableScoreBoard = () => {
        const elements = document.getElementsByClassName("score-board-item-button")
        for (const el of elements) {
            el.setAttribute("disabled", true)
        }
    }

    const enableScoreBoard = () => {
        const elements = document.getElementsByClassName("score-board-item-button")
        for (const el of elements) {
            !el.classList.contains("scored") && el.removeAttribute("disabled")
        }
    }

    const setScore = (id) => {
        const el = document.getElementById(id);
        el.classList.add("scored");
        el.classList.contains("upper") 
            ? upperSubtotal += Number(el.firstChild.nodeValue)
            : lowerSubtotal += Number(el.firstChild.nodeValue)
        
        disableScoreBoard();
        Calculators.setUpperSubtotal(upperSubtotal);
        Calculators.setLowerSubtotal(lowerSubtotal);
        Calculators.setTotal(upperSubtotal, lowerSubtotal);
        resetTurn();
    }

    const clearHeldDice = () => {
        for (const slot of diceSlots) {
            slot.classList.contains("selected") && toggleDieHold(slot.id);
        }
    }
    
    const resetTurn = () => {
        currentRoll = 0;
        checkForGameOver();
        updateRollButton();
        enableRollButton();
        displayInitialDice();
    }

    const checkForGameOver = () => {
        const totalButtons = document.getElementsByClassName("score-board-item-button").length;
        const scoredButtons = document.getElementsByClassName("scored").length 
                                + document.getElementsByClassName("totals").length;
        return totalButtons === scoredButtons && (gameOver = true);
    }
    
    const restartGame = () => {
        gameOver = false;
        upperSubtotal = 0;
        lowerSubtotal = 0;
        setInitialScoreValues();
        enableRollButton();
        updateRollButton();
    }

    init();

    return {
        toggleDieHold,
        rollButtonAction,
        setScore
    }
})();










