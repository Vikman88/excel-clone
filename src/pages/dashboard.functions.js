function toHTML(id, nameTable, dataCreateTable) {
  return `<li class="db__record">
  <a href="#excel/${id}">${nameTable}</a>
  <strong>${dataCreateTable.toLocaleDateString()}
  ${dataCreateTable.toLocaleTimeString()}</strong>
</li>`;
}

function getName(key) {
  const store = JSON.parse(localStorage[`excel:${key}`]);
  const dataCreateTable = new Date(store.openedDate);
  const { nameTable } = store;
  return toHTML(key, nameTable, dataCreateTable);
}
function toNumber(arr) {
  return arr.map((key) => {
    const dateString = key.split(':')[1];
    return parseInt(dateString, 10);
  });
}

function getAllKeys() {
  const iter = (keys, i) => {
    if (localStorage.length <= i) {
      return keys;
    }
    const key = localStorage.key(i);
    if (key.includes('excel')) {
      keys.push(key);
    }
    const incI = i + 1;
    return iter(keys, incI);
  };
  return iter([], 0);
}

export default function createRecordsTable() {
  const keys = getAllKeys();
  const keysNum = toNumber(keys);
  if (!keysNum.length) {
    return '<p>Empty content</p>';
  }
  return `<div class="db__list-header">
  <span>Name</span>
  <span>Open data</span>
</div>
<ul class="db__list">
${keysNum
  .sort((a, b) => b - a)
  .map(getName)
  .join('')}
</ul>`;
}
