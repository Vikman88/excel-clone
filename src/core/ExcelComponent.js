import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unsubscr = [];
    //this.storeSub = null;
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
    this.unsubscr.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  // Сюда приходят только изменения по тем полям на которые мы подписались
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  /* $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn);
  } */

  $getState() {
    return this.store.getState();
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
    this.unsubscr.forEach((unsub) => unsub());
    /* this.storeSub.unsubscribe(); */
  }
}
