import { Context, Telegraf } from 'telegraf'
import dotenv from 'dotenv'
import { Dice, DiceType, DiceTypes } from './src/Dice'
import Command from './src/Command'

dotenv.config();

interface AppContext extends Context {
  myProp?: number
  commandName?: string
} 

const botToken = String(process.env.BOT_TOKEN)
const bot = new Telegraf<AppContext>(botToken)

bot.use((ctx, next) => {
  ctx.myProp = ctx.chat?.id;
  return next()
})

DiceTypes.forEach((diceType: DiceType) => {
  bot.command(diceType.name, (ctx) => {
    const dice = new Dice(diceType);
    const result = dice.roll();
    ctx.reply(`${ctx.from.first_name} rolled: ${result}/${diceType.sides}`);
  })
})

bot.command('roll', (ctx) => {
  console.log(ctx.update.message.from)
  console.log(ctx.update.message.chat)
  console.log(ctx.update.message.entities)
  Command.parse(ctx.update.message.text)
  // const result = dice.roll(diceType)
  // ctx.reply(`${ctx.from.first_name} rolled: ${result}/${diceType.sides}`)
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))