import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubsubscr = [];
    this.prepare();
  }

  // Настриваем наш компонент до init
  prepare() {}

  // Возвращаем шаблон компонента
  toHTML() {
    return '';
  }
  // Уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // Подписываемя на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubsubscr.push(unsub);
  }

  // Инициализируем компонент
  // Добавляем DOM слушателей
  init() {
    this.initDomListeners();
  }

  // Удалем компонент
  // Чистим слушатели
  destroy() {
    this.removeDomListeners();
    this.unsubsubscr.forEach((unsub) => unsub());
  }
}
