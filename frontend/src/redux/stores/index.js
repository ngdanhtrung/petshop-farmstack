import { createStore} from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import ShopApp from '../reducers/index'
const store =  createStore(ShopApp,composeWithDevTools());
export default store;