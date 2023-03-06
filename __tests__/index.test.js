import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('output as default', () => {
  test.each(['json', 'yml'])('type: %p', (ext) => {
    const pathFile1 = getFixturePath(`file1.${ext}`);
    const pathFile2 = getFixturePath(`file2.${ext}`);
    const getDiff = genDiff(pathFile1, pathFile2);
    const result = readFile('stylish.txt');
    expect(getDiff).toEqual(result);
  });
});

describe('basics testing', () => {
  const cases = [
    ['json', 'stylish'],
    ['yaml', 'stylish'],
    ['json', 'plain'],
    ['yaml', 'plain'],
    ['json', 'json'],
    ['yaml', 'json'],
  ];
  test.each(cases)('type: %p output format: %p', (ext, format) => {
    const pathFile1 = getFixturePath(`file1.${ext}`);
    const pathFile2 = getFixturePath(`file2.${ext}`);
    const getDiff = genDiff(pathFile1, pathFile2, format);
    const result = readFile(`${format}.txt`);
    expect(getDiff).toEqual(result);
  });
});

describe('border conditions', () => {
  const cases = [
    ['txt', 'stylish'],
    ['yml', 'default'],
  ];
  test.each(cases)('type: %p output format: %p', (ext, format) => {
    const pathFile1 = getFixturePath(`file1.${ext}`);
    const pathFile2 = getFixturePath(`file2.${ext}`);
    expect(() => {
      genDiff(pathFile1, pathFile2, format);
    }).toThrow();
  });
});
