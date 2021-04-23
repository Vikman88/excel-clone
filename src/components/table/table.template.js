const CODES = {
  A: 65,
  Z: 90,
};

const createCell = () => {
  return `<div class="cell" contenteditable=""></div>`;
};

const createRow = (content, num = '') => {
  const resize =
    num !== '' ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `<div class="row">
  <div class="row-info">${num}
  ${resize}
  </div>
  <div class="row-data">${content}</div>
</div>`;
};

const toColumn = (col) => {
  return `<div class="column">
  ${col}
  <div class="col-resize" data-resize="col"></div>
  </div>`;
};

const toChar = (_, i) => String.fromCharCode(CODES.A + i);

export const createTable = (rowsCount = 32) => {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount).fill('').map(toChar).map(toColumn).join('');
  const cells = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(createCell)
    .join('');
  rows.push(createRow(cols));

  const iter = (i) => {
    if (i >= rowsCount) return rows;
    const indexRow = i + 1;
    rows.push(createRow(cells, indexRow));
    return iter(++i);
  };
  iter(0);
  /* for (let i = 0; i < rowsCount; i++) {
    const indexRow = i + 1;
    rows.push(createRow(cells, indexRow));
  } */

  return rows.join('');
};
