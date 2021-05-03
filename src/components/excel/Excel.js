import { $ } from '@core/dom';
import { Emitter } from '../../core/Emitter';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  getRoot() {
    const $root = $.create('div', 'excel');
    const componentOptions = {
      emitter: this.emitter,
    };
    this.components = this.components.map((Component) => {
      const $div = $.create('div', Component.className);
      const component = new Component($div, componentOptions);
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

  destroy() {
    this.components.forEach((component) => component.destroy());
  }
}
