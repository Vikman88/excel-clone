import Excel from '@/components/excel/Excel';
import { Formula } from '@/components/formula/Formula';
import { Header } from '@/components/header/Header';
import { Table } from '@/components/table/Table';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { createStore } from '@core/store/createStore';
import rootReducer from '@/redux/rootReducer';
import { storage, debounce } from '@core/utils';
import { Page } from '@core/Page';
import normalizeInitialState from '@/redux/initialState';

function storageName(param) {
  return `excel:${param}`;
}

export default class ExcelPages extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();
    const state = storage(storageName(params));
    const store = createStore(rootReducer, normalizeInitialState(state));

    const stateListener = debounce((st) => {
      storage(storageName(params), st);
    }, 300);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });
    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
