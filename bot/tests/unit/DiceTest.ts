import * as _ from "lodash"
import { range } from "lodash";
import {Dice, DiceType, DiceTypes} from '../../src/Dice'

test('we have dices for DnD', () => {
  const neededDices = [4, 6, 8, 10, 12, 20];

  Object.values(DiceTypes).map((diceType) => {
    expect(diceType.sides in neededDices).toBeTruthy
  })
})

test('roll is working properly', () => {
  const randomDiceType = _.sample(Object.values(DiceTypes)) || DiceTypes[4]
  const dice = new Dice(randomDiceType)

  range(0, 20).forEach(() => {
    const result = dice.roll()
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(randomDiceType.sides)
  })
})