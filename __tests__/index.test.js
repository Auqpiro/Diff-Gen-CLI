import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  'json',
  'yaml',
  // 'yml',
];

test.each(cases)('test', (ext) => {
  const pathFile1 = getFixturePath(`file1.${ext}`);
  const pathFile2 = getFixturePath(`file2.${ext}`);
  const getDiff = genDiff(pathFile1, pathFile2);
  const result = readFile(`expected_file.${ext}`)
    .replaceAll('"', '')
    .replaceAll(',', '');
  expect(getDiff).toEqual(result);
});
