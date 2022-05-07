import _ from "lodash"

interface Command {
  readonly name: string;
  readonly args: string[];
}

class CommandParser {
  static re: RegExp = new RegExp(
    '\/([a-zA-Z0-9]+)\S?(([a-zA-Z0-9]+)\s*)*',
    'gmi'
  )

  public execute(rawText: string): Command {
    
    if (rawText[0] != '/') {
      throw Error('not a command')
    }

    const data: string[] = rawText
      .slice(1)
      .replace(/[^a-zA-Z0-9\s]+/g, '')
      .trim()
      .split(/\s+/)
      .filter((word) => word != '' )


    if (data.length < 1) {
      throw Error('not a command')
    }

    let args: string[] = [];
    if (data.length > 1) {
      args = data.slice(1)
    }

    return { name: data[0], args: args }
  }
}

export {
  Command,
  CommandParser
}