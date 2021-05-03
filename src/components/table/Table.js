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
    $cell.focus();
    this.$on('Formula: onInput', (text, focus) => {
      if (focus === 'insertParagraph') {
        this.selection.current.focus();
      }
      this.selection.current.text(text);
    });
  }

  onInput(event) {
    this.$emit('dsds', this.selection.current.text());
    console.log(this.selection.current.text());
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
      this.$emit('dsds', this.selection.current.text());
    }
  }

  onKeydown(event) {
    //console.log(event.key);
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
      this.$emit('dsds', this.selection.current.text());
    } /* else {
      this.selection.moveFocusToCoords(this.$root, event);
    } */
  }
  /* onKeyup(event) {
    console.log(event);
  } */
}
