import { Context, Telegraf } from 'telegraf'
import dotenv from 'dotenv'
import { Dice, DiceType, DiceTypes } from './src/Dice'

dotenv.config();

// Define your own context type
interface AppContext extends Context {
  myProp?: number
  commandName?: string
} 

// Create your bot and tell it about your context type
const botToken = String(process.env.BOT_TOKEN)
const bot = new Telegraf<AppContext>(botToken)

const dice = new Dice()

bot.use((ctx, next) => {
  ctx.myProp = ctx.chat?.id;
  console.log(ctx)
  return next()
})

DiceTypes.forEach((diceType: DiceType) => {
  bot.command(diceType.name, (ctx) => {
    const result = dice.roll(diceType)
    ctx.reply(`${ctx.from.first_name} rolled: ${result}/${diceType.sides}`)
  })
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))