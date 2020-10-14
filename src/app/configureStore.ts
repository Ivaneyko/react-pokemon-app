import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
// Root reducer
import createRootReducer from 'app/rootReducer';

export const history = createBrowserHistory();

// ToDO: prealoadState:any should be replaced with global state type
export default function(preloadState?: any){
  const composeEnhancers =
    typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose
  ;

  const enhancer = composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      logger
    )
  );

  const store = createStore(
    createRootReducer(history),
    preloadState,
    enhancer
  )
  return store;
}
