import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import resizeFn from './table.function.js';
import { TableSelection } from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
    this.unsubs = [];
  }

  toHTML() {
    return createTable();
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
    this.selectCell();
    $cell.focus();
    this.$on('Formula: onInput', (text) => {
      this.selection.current.text(text);
    });
    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
  }

  selectCell() {
    this.$emit('table:select', this.selection.current);
  }

  onInput(event) {
    this.$emit('table:input', this.selection.current);
  }

  onMousedown(event) {
    console.log(event);
    const { resize } = event.target.dataset;
    const { type } = event.target.dataset;
    if (resize) {
      resizeFn.bind(this, event, resize)();
    } else if (type === 'cell') {
      const { id } = event.target.dataset;
      const $cell = this.$root.find(`[data-id="${id}"]`);
      if (event.shiftKey) {
        this.selection.selectGroup(this.$root, $cell);
      } else if (event.ctrlKey) {
        this.selection.select($cell);
      } else {
        this.selection.unselectAll();
        this.selection.select($cell);
      }
      this.selectCell();
    }
  }

  onKeydown(event) {
    const keys = [
      'ArrowRight',
      'ArrowLeft',
      'ArrowUp',
      'ArrowDown',
      'Enter',
      'Tab',
    ];
    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault();
      this.selection.moveFocus(this.$root, event);
      this.selectCell();
    }
  }
}
