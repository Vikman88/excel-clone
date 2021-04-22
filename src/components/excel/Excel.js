import { $ } from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'excel');
    this.components = this.components.map((Component) => {
      const $div = $.create('div', Component.className);
      const component = new Component($div);
      $div.html(component.toHTML());
      $root.append($div);
      return component;
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }

  delListener() {
    this.components.forEach((component) => component.destroy());
  }
}
