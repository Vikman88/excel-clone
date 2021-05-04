import { ExcelComponent } from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
      ...options,
    });
  }

  init() {
    super.init();
    this.$on('dsds', (text) => {
      console.log(text);
      const $input = this.$root.find('[class="input"]');
      $input.text(text);
    });
  }

  toHTML() {
    return `<div class="info">fx</div><div class="input" contenteditable="" spellcheck="false"></div>`;
  }

  onInput(event) {
    const $input = this.$root.find('[class="input"]');
    if (event.inputType === 'insertParagraph') {
      event.preventDefault();
      $input.blur();
    }
    const text = event.target.textContent.trim();
    this.$emit('Formula: onInput', text, event.inputType);
  }
}
