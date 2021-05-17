import { defaultNameTable, defaultStyles } from '@/constants';

const defaultState = {
  sizeState: {},
  currentText: '',
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  nameTable: defaultNameTable,
  opendDate: new Date().toJSON(),
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

export default function normalizeInitialState(state) {
  return state ? normalize(state) : defaultState;
}
