import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable();
  }

  onClick() {
    console.log('click');
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      console.log('Start resizing', event.target.dataset.resize, event.target);
      this.listeners.push('mousemove');
      this.init();
    }
  }

  onMousemove(e) {
    console.log('mousemove');
    console.log(`
    Screen X/Y: ${e.screenX}, ${e.screenY}
    Client X/Y: ${e.clientX}, ${e.clientY}`);
  }

  onMouseup() {
    console.log('mouseup');
  }
}
