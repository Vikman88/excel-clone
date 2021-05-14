import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import resizeFn from './table.function.js';
import { TableSelection } from './TableSelection';
import * as actions from '@/redux/actions';
import { defaultStyles } from '@/constants';
import { parse } from '@core/parse';
import { $ } from '@core/dom';

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
    const state = this.$getState();
    return createTable(state);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  fillCell() {
    const state = this.$getState();
    const dataId = state.dataState;
    const ids = Object.keys(dataId);
    ids.forEach((id) => {
      const [x, y] = id.split(',');
      const $cell = this.$root.find(`[data-id="${x}:${y}"]`);
      const text = parse(dataId[id]);
      $cell.text(text);
    });
  }

  init() {
    super.init();
    this.fillCell();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
    this.selectCell();
    $cell.focus();
    this.$on('Formula: onInput', (text) => {
      this.selection.current.attr('data-value', text).text(parse(text));
      this.updateTextInStore(text);
    });
    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:appStyle', (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(
        actions.applyStyle({ value, ids: this.selection.selectedIds })
      );
    });
    /* this.$subscribe((state) => {
      console.log('TableState', state);
    }); */
  }

  selectCell() {
    this.$emit('table:select', this.selection.current);
    const styles = this.selection.current.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
    /* this.$dispatch({ type: 'TEST' }); */
  }

  updateTextInStore(text) {
    this.$dispatch(
      actions.changeText({
        id: this.selection.current.id(),
        value: text,
      })
    );
  }

  onInput(event) {
    //this.$emit('table:input', this.selection.current);
    const text = $(event.target).text();
    this.updateTextInStore(text);
    this.selection.current.attr('data-value', text);
  }

  async resizeTable(event, resize) {
    try {
      const data = await resizeFn.call(this, event, resize);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn(e.message);
    }
  }

  onMousedown(event) {
    const { resize } = event.target.dataset;
    const { type } = event.target.dataset;
    if (resize) {
      this.resizeTable(event, resize);
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
