import { Calculators } from '../js/util';

test('should calculate sum of same type of dice', () => {
    const sum = Calculators.calculateSameDice(6, [1, 5, 6, 6, 2]);
    expect(sum).toBe(12);
});

test('should calculate sum of all dice', () => {
    const sum = Calculators.calculateChance([1, 5, 6, 6, 2]);
    expect(sum).toBe(20);
});

test('should calculate sum of top pair of dice', () => {
    const sum = Calculators.calculateOnePair([1, 6, 6, 6, 2]);
    expect(sum).toBe(12);
});

test('should check if all dice are the equal and return 50 if true', () => {
    const sum = Calculators.calculateYatzy([6, 6, 6, 6, 6]);
    expect(sum).toBe(50);
});