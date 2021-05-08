import { Excel } from '@/components/excel/Excel';
import { Formula } from '@/components/formula/Formula';
import { Header } from '@/components/header/Header';
import { Table } from '@/components/table/Table';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { createStore } from '@core/createStore';
import { rootReducer } from '@/redux/rootReducer';
import './scss/index.scss';
import { storage } from '@core/utils';

const store = createStore(rootReducer, storage('excel-state'));

store.subscribe((state) => {
  console.log(state);
  storage('excel-state', state);
});

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
//setTimeout(() => excel.delListener(), 5000);
