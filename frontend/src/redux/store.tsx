import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import ControllerReducer from '../redux/controllerRedux/ControllerReducer';
import WidgetReducer from '../redux/widgetRedux/WidgetReducer';


export const rootReducer = combineReducers({
  controller: ControllerReducer,
  widget: WidgetReducer
});

const localStorageMiddleware = ({ getState }: any) => (next:any) => (action: any) => {
  // eslint-disable-next-line callback-return
  const result = next(action);
  const { map } = getState();
  // console.log('...localStorageMiddleware ->', getState(), result, action);
  localStorage.setItem('ApplicationState', JSON.stringify(
    { map },
  ));
  return result;
};

const reHydrateStore = () => {
  try {
    const dataString = localStorage.getItem('ApplicationState');
    if (dataString) {
      const data = JSON.parse(dataString);
      data.map.currentViewName = 'WIDGET_POLLING';
      // console.log('...reHydrateStore', data);
      return data;
    }
  } catch (ee) {
    console.log('...reHydrateStore', ee);
  }

  return undefined;
};


const composeEnhancers = (
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true })
) || compose;

export function configureStore() {
  return createStore(
    rootReducer,
      composeEnhancers(
      applyMiddleware(
        thunk,
      ),
      // DevTools instrument must be after applying all middleware
      // DevTools.instrument(),
    ),
  );
}

const store = configureStore();

export default store;
