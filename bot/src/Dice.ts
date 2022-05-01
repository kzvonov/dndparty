interface DiceType {
  readonly name: string;
  readonly sides: number;
}

class Dice {
  public roll(type: DiceType): number {
    return Math.floor(Math.random() * type.sides) + 1;
  }
}

const DiceTypes: Array<DiceType> = [
  { name: 'd4', sides: 4 },
  { name: 'd6', sides: 6 },
  { name: 'd8', sides: 8 },
  { name: 'd10', sides: 10 },
  { name: 'd12', sides: 12 },
  { name: 'd20', sides: 20 },
]

export {
  Dice,
  DiceType,
  DiceTypes
}