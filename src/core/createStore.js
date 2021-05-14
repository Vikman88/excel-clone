export function createStore(rootReducer, initial = {}) {
  let state = rootReducer({ ...initial }, { type: '__INIT__' });
  let listeners = [];
  return {
    subscribe(fn) {
      listeners.push(fn);
      return {
        unsubscribe() {
          listeners = listeners.filter((l) => l !== fn);
        },
      };
    },
    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach((l) => l(state));
    },
    getState() {
      return JSON.parse(JSON.stringify(state));
    },
  };
}
