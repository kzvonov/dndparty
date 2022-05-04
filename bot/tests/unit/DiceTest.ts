import * as _ from "lodash";
import {Dice, DiceType, DiceTypes} from '../../src/Dice'


test('we have dices for DnD', () => {
  const neededDices = [4, 6, 8, 10, 12, 20];

  DiceTypes.map((diceType) => {
    expect(diceType.sides in neededDices).toBeTruthy;
  });
});

test('roll is working properly', () => {
  const randomDiceType = _.sample(DiceTypes) || DiceTypes[0];
  const dice = new Dice(randomDiceType);

  _.times(20, () => {
    const result = dice.roll();
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(randomDiceType.sides);
  })
});