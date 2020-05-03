import { Middleware, MiddlewareAPI, Dispatch } from 'redux';

const logger: Middleware = (store: MiddlewareAPI) => (
   next: Dispatch
) => action => {
   console.log('will dispatch', action)

   // Call the next dispatch method in the middleware chain.
   const returnValue = next(action)

   console.log("↓Dispatch後の処理↓")
   console.log('state after dispatch', store.getState())
}

export default logger;
