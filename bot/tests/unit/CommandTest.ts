import * as _ from "lodash";
import { Command, CommandParser } from "../../src/Command";

test('parse command name', () => {
  const text = '/ok';
  const parser = new CommandParser();
  const command = parser.execute(text);

  expect(command.name).toBe('ok');
});

test('throw an error for wrong command', () => {
  const text = 'not a command';
  const parser = new CommandParser();

  expect(() => parser.execute(text)).toThrow(Error('not a command'));
});

test('parse command with one arg', () => {
  const text = '/roll 20';
  const parser = new CommandParser();
  const command = parser.execute(text);

  expect(command).toEqual({ name: 'roll', args: ['20'] });
});

test('parse command with many args', () => {
  const text = '/roll 20 kirill go';
  const parser = new CommandParser();
  const command = parser.execute(text);

  expect(command).toEqual({ name: 'roll', args: ['20' , 'kirill', 'go'] });
});

test('parse command with invalid args', () => {
  const text = '/roll ~~ ___ !.,\\';
  const parser = new CommandParser();
  const command = parser.execute(text);

  expect(command).toEqual({ name: 'roll', args: [] });
});

test('parse invalid command', () => {
  const text = '/,.[] ~~ ___ !.,\\';
  const parser = new CommandParser();

  expect(() => parser.execute(text)).toThrow(Error('not a command'));
});