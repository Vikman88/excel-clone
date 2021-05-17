import {
  CHANGE_TEXT,
  CHANGE_STYLES,
  TABLE_RESIZE,
  APPLY_STYLE,
  NAME_TABLE,
  UPDATE_DATE,
} from './types';

export function updateDate() {
  return {
    type: UPDATE_DATE,
  };
}

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  };
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  };
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data,
  };
}

export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data,
  };
}

export function nameTable(data) {
  return {
    type: NAME_TABLE,
    data,
  };
}
