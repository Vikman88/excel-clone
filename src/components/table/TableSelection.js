import { makeCoords, updateCoords } from './table.utils';

export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    this.group.push($el);
    $el.addClass(TableSelection.className);
    this.current = $el;
  }

  unselectAll() {
    this.group.forEach(($el) => $el.removeClass(TableSelection.className));
    this.group = [];
  }

  selectGroup($root, $el) {
    const firstEl = this.current;
    this.unselectAll();
    const coordsCollection = makeCoords(firstEl, $el);
    const $els = coordsCollection.map((coords) =>
      $root.find(`[data-id="${coords.join(':')}"]`)
    );
    this.group.push(firstEl, ...$els);
    this.group.forEach(($el) => {
      $el.addClass(TableSelection.className);
    });
  }

  get selectedIds() {
    return this.group.map(($el) => $el.id());
  }

  moveFocus($root, event) {
    const $el = this.group.shift();
    const coords = $el.id();
    const newCoords = updateCoords(coords, event.key);
    const $focusedEl = $root.find(newCoords);
    this.current = $focusedEl;
    $el.removeClass(TableSelection.className);
    this.unselectAll();
    this.group.push($focusedEl);
    $focusedEl.focus().addClass(TableSelection.className);
  }

  applyStyle(style) {
    this.group.forEach(($el) => {
      $el.css(style);
    });
  }
}
