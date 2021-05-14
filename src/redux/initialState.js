import { storage } from '@core/utils';
import { defaultStyles } from '@/constants';
import { defaultNameTable } from '../constants';

const defaultState = {
  sizeState: {},
  currentText: '',
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  nameTable: defaultNameTable,
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState;
