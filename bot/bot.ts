import { Context, Telegraf } from 'telegraf'
import dotenv from 'dotenv'
import { Dice, DiceType, DiceTypes } from './src/Dice'
import { Command, CommandParser } from './src/Command'

dotenv.config()

interface AppContext extends Context {
  myProp?: number
  commandName?: string
} 

const botToken = String(process.env.BOT_TOKEN)
const bot = new Telegraf<AppContext>(botToken)

bot.use((ctx, next) => {
  ctx.myProp = ctx.chat?.id
  return next()
})

Object.values(DiceTypes).forEach((diceType: DiceType) => {
  bot.command(diceType.name, (ctx) => {
    const dice = new Dice(diceType)
    const result = dice.roll()
    ctx.reply(`${ctx.from.first_name} rolled: ${result}/${diceType.sides}`)
  })
})

bot.command('roll', (ctx) => {
  const parser = new CommandParser();
  const command = parser.execute(ctx.update.message.text)

  if (command.args.length < 0) {
    ctx.reply(`${ctx.from.first_name} please specify the number after /roll command`)
    return
  }

  const sides: number = +command.args[0]
  const diceType: DiceType|null = DiceTypes[sides]

  if (diceType == null) {

    ctx.reply(`No such dice, sorry\n${ctx.from.first_name}, try one of these: ${Object.keys(DiceTypes)}`)
    return
  }

  const dice = new Dice(diceType)
  const result = dice.roll()
  ctx.reply(`${ctx.from.first_name} rolled: ${result}/${diceType.sides}`)
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))