export const Calculators = (() => {
    const ones = document.getElementById("ones");
    const twos = document.getElementById("twos");
    const threes = document.getElementById("threes");
    const fours = document.getElementById("fours");
    const fives = document.getElementById("fives");
    const sixes = document.getElementById("sixes");
    const chance = document.getElementById("chance");
    const onePair = document.getElementById("one-pair");
    const twoPairs = document.getElementById("two-pairs");
    const threeOfAKind = document.getElementById("three-of-a-kind");
    const fourOfAKind = document.getElementById("four-of-a-kind");
    const smallStraight = document.getElementById("small-straight");
    const largeStraight = document.getElementById("large-straight");
    const fullHouse = document.getElementById("full-house");
    const yatzy = document.getElementById("yatzy");

    const sortDice = (dice) => {
        let sortedDice = {};
        dice.forEach( key => sortedDice[key] = (sortedDice[key] || 0) + 1 );
        return sortedDice;
    }

    const calculateSameDice = (value, dice) => {
        let sum = 0;
        for (const die of dice) {
            die === value ? (sum += die) : null;
        }
        return sum;
    }

    const calculateSumOfAllDice = (dice) => {
        return dice.reduce((a, b) => a + b);
    }

    const calculateOnePair = (dice) => {
        let sum = 0;
        let pairs = [];
        const sortedDice = sortDice(dice);
        for (const key in sortedDice) {
            sortedDice[key] > 1 && pairs.push(Number(key));
        }
        pairs.length && (sum = Math.max(...pairs) * 2);
        return sum;
    }

    const calculateTwoPairs = (dice) => {
        // Assuming four of a kind is not considered two pairs
        let sum = 0;
        let pairs = 0; 
        const sortedDice = sortDice(dice);
        for (const key in sortedDice) {
            if (sortedDice[key] > 1) {
                sum += (key * 2);
                pairs++;
            }
        }
        return pairs === 2 ? sum : 0;
    }

    const calculateThreeOfAKind = (dice) => {
        let sum = 0;
        const sortedDice = sortDice(dice);
        for (const key in sortedDice) {
            sortedDice[key] > 2 && (sum = (Number(key) * 3));
        }
        return sum;
    }

    const calculateFourOfAKind = (dice) => {
        let sum = 0;
        const sortedDice = sortDice(dice);
        for (const key in sortedDice) {
            sortedDice[key] > 3 && (sum = (Number(key) * 4));
        }
        return sum;
    }

    const calculateSmallStraight = (dice) => {
        let result = true;
        for (let i = 1; i < 6; i++) {
            if (!dice.includes(i)) {
                result = false;
                break;
            }
        }
        return result ? calculateSumOfAllDice(dice) : 0;
    }

    const calculateLargeStraight = (dice) => {
        let result = true;
        for (let i = 2; i < 7; i++) {
            if (!dice.includes(i)) {
                result = false;
                break;
            }
        }
        return result ? calculateSumOfAllDice(dice) : 0;
    }

    const calculateFullHouse = (dice) => {
        let sum = 0;
        const sortedDice = sortDice(dice);
        const values = Object.values(sortedDice); 
        values.includes(3) && values.includes(2) && (sum = calculateSumOfAllDice(dice))
        return sum;
    }
    
    const calculateYatzy = (dice) => {
        return dice.every((el, i, arr) => el === arr[0]) ? 50 : 0;
    }

    const setAllScores = (currentDiceValues) => {
        !ones.classList.contains("scored")          && (ones.innerHTML = calculateSameDice(1, currentDiceValues)) 
        !twos.classList.contains("scored")          && (twos.innerHTML = calculateSameDice(2, currentDiceValues))
        !threes.classList.contains("scored")        && (threes.innerHTML = calculateSameDice(3, currentDiceValues))
        !fours.classList.contains("scored")         && (fours.innerHTML = calculateSameDice(4, currentDiceValues))
        !fives.classList.contains("scored")         && (fives.innerHTML = calculateSameDice(5, currentDiceValues))
        !sixes.classList.contains("scored")         && (sixes.innerHTML = calculateSameDice(6, currentDiceValues))
        !chance.classList.contains("scored")        && (chance.innerHTML = calculateSumOfAllDice(currentDiceValues));
        !onePair.classList.contains("scored")       && (onePair.innerHTML = calculateOnePair(currentDiceValues));
        !twoPairs.classList.contains("scored")      && (twoPairs.innerHTML = calculateTwoPairs(currentDiceValues));
        !threeOfAKind.classList.contains("scored")  && (threeOfAKind.innerHTML = calculateThreeOfAKind(currentDiceValues));
        !fourOfAKind.classList.contains("scored")   && (fourOfAKind.innerHTML = calculateFourOfAKind(currentDiceValues));
        !fullHouse.classList.contains("scored")     && (fullHouse.innerHTML = calculateFullHouse(currentDiceValues));
        !smallStraight.classList.contains("scored") && (smallStraight.innerHTML = calculateSmallStraight(currentDiceValues));
        !largeStraight.classList.contains("scored") && (largeStraight.innerHTML = calculateLargeStraight(currentDiceValues));
        !yatzy.classList.contains("scored")         && (yatzy.innerHTML = calculateYatzy(currentDiceValues));
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
        setAllScores,
        setUpperSubtotal,
        setLowerSubtotal,
        setTotal
    }
})();
