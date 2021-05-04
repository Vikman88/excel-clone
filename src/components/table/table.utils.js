const findMinMaxCoords = (crd1, crd2) =>
  crd1 >= crd2 ? [crd1, crd2] : [crd2, crd1];

export const makeCoords = (firstEl, lastEl) => {
  const [x1, y1] = firstEl.id();
  const [x2, y2] = lastEl.id();
  const [maxX, minX] = findMinMaxCoords(x1, x2);
  const [maxY, minY] = findMinMaxCoords(y1, y2);
  const makeHorizontalCoords = (arr, minY, i) => {
    const currentX = minX + i;
    if (currentX > maxX) return arr;
    arr.push([currentX, minY]);
    return makeHorizontalCoords(arr, minY, (i += 1));
  };

  const makeCoords = (arr, i) => {
    const currentY = minY + i;
    if (currentY > maxY) return arr;
    const arrHorizontalCoords = makeHorizontalCoords([], currentY, 0);
    arr.push(...arrHorizontalCoords);
    return makeCoords(arr, (i += 1));
  };
  return makeCoords([], 0);
};

export const updateCoords = ([x, y], key) => {
  switch (key) {
    case 'ArrowRight':
    case 'Tab':
      x += 1;
      break;
    case 'ArrowLeft':
      x -= x === 0 ? 0 : 1;
      break;
    case 'ArrowUp':
      y -= y === 0 ? 0 : 1;
      break;
    case 'ArrowDown':
    case 'Enter':
      y += 1;
      break;
    default:
      break;
  }
  return `[data-id="${x}:${y}"]`;
};
