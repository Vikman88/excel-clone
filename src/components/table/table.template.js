import { toInlineStyles } from '@core/utils';
import { defaultStyles } from '@/constants';
import { getCoords } from './table.utils';

const CODES = {
  A: 65,
  Z: 90,
};

const createCell = (row, coordsResize, state) => (_, col) => {
  const coords = getCoords(coordsResize, col);
  const id = `${col},${row}`;
  const dataStyles = state.stylesState[id];
  const styles = toInlineStyles({ ...defaultStyles, ...dataStyles });
  const dataText = state.dataState[id];
  const coordsToHTML = coords ? `width: ${coords.width}px;` : '';
  return `<div class="cell" contenteditable="" data-col="${col}" data-id="${col}:${row}" data-type="cell" style="${styles}; ${coordsToHTML}" data-value="${
    dataText || ''
  }";></div>`;
};

const createRow = (content, coordsResize, num = '') => {
  const resize =
    num !== '' ? '<div class="row-resize" data-resize="row"></div>' : '';
  const coords = getCoords(coordsResize, num - 1);
  const coordsToHTML = coords ? `style="height: ${coords.height}px;"` : '';
  return `<div class="row" data-type="resizable" data-row="${
    num - 1
  }" ${coordsToHTML}>
    <div class="row-info">${num}
    ${resize}
    </div>
    <div class="row-data">${content}</div>
  </div>`;
};

const toColumn = (coordsResize) => (col, index) => {
  const coords = getCoords(coordsResize, index);
  const coordsToHTML = coords ? `style="width: ${coords.width}px;"` : '';
  return `<div class="column" data-type="resizable" data-col="${index}" ${coordsToHTML}>
  ${col}
  <div class="col-resize" data-resize="col"></div>
  </div>`;
};

const toChar = (_, i) => String.fromCharCode(CODES.A + i);

export const createTable = (state = {}, rowsCount = 32) => {
  const coords = state.sizeState;
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn(coords))
    .join('');

  rows.push(createRow(cols, coords));

  const iter = (i) => {
    if (i >= rowsCount) return rows;

    const indexRow = i + 1;
    const cells = new Array(colsCount)
      .fill('')
      .map(createCell(i, coords, state))
      .join('');
    rows.push(createRow(cells, coords, indexRow));
    return iter(++i);
  };
  iter(0);

  return rows.join('');
};
