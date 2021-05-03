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
    console.log(this);
    const $els = coordsCollection.map((coords) =>
      $root.find(`[data-id="${coords.join(':')}"]`)
    );
    this.group.push(firstEl, ...$els);
    this.group.forEach(($el) => {
      $el.addClass(TableSelection.className);
    });
  }

  moveFocus($root, event) {
    const $el = this.group.shift();
    const coords = $el.id();
    const newCoords = updateCoords(coords, event.key);
    console.log(newCoords);
    const $focusedEl = $root.find(newCoords);
    this.current = $focusedEl;
    $el.removeClass(TableSelection.className);
    this.unselectAll();
    this.group.push($focusedEl);
    $focusedEl.focus().addClass(TableSelection.className);
  }

  /* moveFocusToCoords($root, event) {
    console.log(this.group);
    const $el = this.group.shift();
    this.unselectAll();
    const coords = $el.id();
    //console.log($el, coords);
    const newCoords = updateCoords(coords, event.key);
    //console.log(newCoords);
    const $focusedEl = $root.find(newCoords);
    //console.log($focusedEl);
    const coordsCollection = makeCoords($el, $focusedEl);
    //console.log(coordsCollection);
    const $els = coordsCollection.map((coords1) =>
      $root.find(`[data-id="${coords1.join(':')}"]`)
    );
    //console.log($els);
    this.group.push($el, ...$els);
    this.group.forEach(($el) => {
      $el.addClass(TableSelection.className);
    });
  } */
}
