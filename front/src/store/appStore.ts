import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from './reducer';
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
//const store = createStore(login);

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.
//see http://stackoverflow.com/a/37690899/6849186
// should consider other solutions http://stackoverflow.com/a/35327035/6849186
//or move away from localStorage to cookie?
//TODO: need to use cookie fallback for safari private mode
const maybeItem = localStorage.getItem('reduxState')
const persistedState = maybeItem ? JSON.parse(maybeItem) : {}

// Create a history of your choosing (we're using a browser history in this case)
// const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
// const routeMiddlware = routerMiddleware(history);

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify here name, actionsBlacklist, actionsCreators and other options
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(
      thunk,
      routerMiddleware(history)
    ),
    // other store enhancers if any
);

const store = createStore(
  createRootReducer(history),
  persistedState,
  enhancer
)

store.subscribe(() =>
    localStorage.setItem(
        'reduxState',
        JSON.stringify(store.getState())
    )
)

export default store;

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.