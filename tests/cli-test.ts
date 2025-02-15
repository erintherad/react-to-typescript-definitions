// tslint:disable:no-implicit-dependencies
import test from 'ava';
import { shell } from 'execa';
import * as fs from 'fs';

function normalize(input: string): string {
  return input
    .replace(/\s+/g, ' ')
    .replace(/ => /g, '=>');
}

test('cli should read from stdin', async t => {
  const expected = fs.readFileSync('./tests/import-react-component.d.ts').toString();

  const result = await shell(
    `cat ./tests/import-react-component.jsx |${process.argv[0]} ./cli.js --module-name component`);

  t.is(normalize(result.stdout), normalize(expected));
});

test('cli should read from file', async t => {
  const expected = fs.readFileSync('./tests/import-react-component.d.ts').toString();

  const result = await shell(
    `${process.argv[0]} ./cli.js --module-name component --file ./tests/import-react-component.jsx`);

  t.is(normalize(result.stdout), normalize(expected));
});
