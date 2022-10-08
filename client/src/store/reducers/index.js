import {combineReducers} from 'redux';
import users from './users.reducer';
import products from './products.reducer';
import notificationReducer from './notifications.reducer';
import brands from './brand.reducer';
import site from './site.reducer';

const appReducers = combineReducers({
    users,
    products,
    notificationReducer,
    brands,
    site
});

export default appReducers;