export const Calculators = (() => {
    const ones = document.getElementById("ones");
    const twos = document.getElementById("twos");
    const threes = document.getElementById("threes");
    const fours = document.getElementById("fours");
    const fives = document.getElementById("fives");
    const sixes = document.getElementById("sixes");
    const chance = document.getElementById("chance");
    const onePair = document.getElementById("one-pair");
    const yatzy = document.getElementById("yatzy");

    const calculateSameDice = (value, dice) => {
        let sum = 0;
        for (const die of dice) {
            die === value ? (sum += die) : null;
        }
        return sum;
    }

    const calculateChance = (dice) => {
        return dice.reduce((a, b) => a + b);
    }

    const calculateOnePair = (dice) => {
        let sum = 0;
        const duplicatesArray = dice.filter((el, i, arr) => arr.indexOf(el) !== i);
        duplicatesArray.length && (sum = Math.max(...duplicatesArray) * 2);
        return sum;
    }

    const calculateYatzy = (dice) => {
        return dice.every((el, i, arr) => el === arr[0]) ? 50 : 0;
    }

    //TODO: implement the rest of score calculators
    
    const setAllScores = (currentDiceValues) => {
        !ones.classList.contains("scored")    && (ones.innerHTML = calculateSameDice(1, currentDiceValues)) 
        !twos.classList.contains("scored")    && (twos.innerHTML = calculateSameDice(2, currentDiceValues))
        !threes.classList.contains("scored")  && (threes.innerHTML = calculateSameDice(3, currentDiceValues))
        !fours.classList.contains("scored")   && (fours.innerHTML = calculateSameDice(4, currentDiceValues))
        !fives.classList.contains("scored")   && (fives.innerHTML = calculateSameDice(5, currentDiceValues))
        !sixes.classList.contains("scored")   && (sixes.innerHTML = calculateSameDice(6, currentDiceValues))
        !chance.classList.contains("scored")  && (chance.innerHTML = calculateChance(currentDiceValues));
        !onePair.classList.contains("scored") && (onePair.innerHTML = calculateOnePair(currentDiceValues));
        !yatzy.classList.contains("scored")   && (yatzy.innerHTML = calculateYatzy(currentDiceValues));
        //etc.
    }    

    const setUpperSubtotal = (upperSubtotal) => {
        document.getElementById("upper-subtotal").innerHTML = upperSubtotal;
    }

    const setLowerSubtotal = (lowerSubtotal) => {
        document.getElementById("lower-subtotal").innerHTML = lowerSubtotal;
    }

    const setTotal = (upperSubtotal, lowerSubtotal) => {
        const total = upperSubtotal + lowerSubtotal;
        document.getElementById("total").innerHTML = total;
    }

    return {
        calculateSameDice,
        calculateChance,
        calculateOnePair,
        calculateYatzy,
        setAllScores,
        setUpperSubtotal,
        setLowerSubtotal,
        setTotal
    }
})();
