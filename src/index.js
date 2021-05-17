import './scss/index.scss';
import Router from '@core/routes/Router';
import DashboardPage from './pages/DashboardPage';
import ExcelPages from './pages/ExcelPage';

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPages,
});
