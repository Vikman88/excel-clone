import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import * as actions from '@/redux/actions';
import { defaultNameTable } from '@/constants';
import { debounce } from '@core/utils';
import ActiveRoute from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    const title = this.store.getState().nameTable || defaultNameTable;
    return `<input class="input" type="text" value="${title}" />
    <div>
      <div class="button", data-value="delete">
        <i class="material-icons" data-value="delete">delete</i>
      </div>
      <div class="button" data-value="exit">
        <i class="material-icons" data-value="exit">exit_to_app</i>
      </div>
    </div>`;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(actions.nameTable($target.text()));
  }

  onClick(event) {
    const $target = $(event.target);
    const origin = ActiveRoute.origin;
    if ($target.data.value === 'delete') {
      const decision = confirm('Are you sure you want to delete this table?');
      const hash = ActiveRoute.param;
      if (decision) {
        localStorage.removeItem(`excel:${hash}`);
      }
      document.location.href = origin;
    }
    if ($target.data.value === 'exit') {
      document.location.href = origin;
    }
  }
}
