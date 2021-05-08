const CODES = {
  A: 65,
  Z: 90,
};

const createCell = (row, cols) => (_, col) => {
  const ids = Object.keys(cols);
  if (ids.includes(col.toString())) {
    const coord = cols[col];
    return `<div class="cell" contenteditable="" data-col="${col}" data-id="${col}:${row}" data-type="cell" style="width: ${coord}px;"></div>`;
  }
  return `<div class="cell" contenteditable="" data-col="${col}" data-id="${col}:${row}" data-type="cell"></div>`;
};

const createRow = (content, num = '') => {
  const resize =
    num !== '' ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `<div class="row" data-type="resizable">
  <div class="row-info">${num}
  ${resize}
  </div>
  <div class="row-data">${content}</div>
</div>`;
};

const toColumn = (cols) => (col, index) => {
  const ids = Object.keys(cols);
  if (ids.includes(index.toString())) {
    const coord = cols[index];
    return `<div class="column" data-type="resizable" data-col="${index}"style="width: ${coord}px;">
  ${col}
  <div class="col-resize" data-resize="col"></div>
  </div>`;
  }
  return `<div class="column" data-type="resizable" data-col="${index}">
  ${col}
  <div class="col-resize" data-resize="col"></div>
  </div>`;
};

const toChar = (_, i) => String.fromCharCode(CODES.A + i);

export const createTable = (coords, rowsCount = 32) => {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn(coords))
    .join('');

  rows.push(createRow(cols));

  const iter = (i) => {
    if (i >= rowsCount) return rows;
    const indexRow = i + 1;
    const cells = new Array(colsCount)
      .fill('')
      .map(createCell(i, coords))
      .join('');
    rows.push(createRow(cells, indexRow));
    return iter(++i);
  };
  iter(0);

  return rows.join('');
};
