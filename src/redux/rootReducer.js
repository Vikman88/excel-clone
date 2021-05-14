import {
  CHANGE_TEXT,
  CHANGE_STYLES,
  TABLE_RESIZE,
  APPLY_STYLE,
  NAME_TABLE,
} from './types';

export function rootReducer(state, action) {
  let prevState;
  switch (action.type) {
    case TABLE_RESIZE:
      prevState = state.sizeState || {};
      prevState[action.data.id] = {
        ...prevState[action.data.id],
        ...action.data.values,
      };
      return { ...state, sizeState: prevState };
    case CHANGE_TEXT:
      prevState = state.dataState || {};
      prevState[action.data.id] = action.data.value;
      return { ...state, currentText: action.data.value, dataState: prevState };
    case CHANGE_STYLES:
      return { ...state, currentStyles: action.data };
    case APPLY_STYLE:
      const value = state.stylesState || {};
      action.data.ids.forEach((id) => {
        value[id] = { ...value[id], ...action.data.value };
        //value[id] = toInlineStyles(action.data.value);
      });
      return {
        ...state,
        stylesState: value,
        currentStyles: { ...state.currentStyles, ...action.data.value },
      };
    case NAME_TABLE:
      return { ...state, nameTable: action.data };
    default:
      return state;
  }
}
