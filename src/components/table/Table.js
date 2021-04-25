import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import resizeFn from './table.function.js';

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

  onMousedown(event) {
    const { resize } = event.target.dataset;
    if (resize) {
      resizeFn.bind(this, event, resize)();
    }
  }
}
