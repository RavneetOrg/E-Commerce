import handleCart from './reducer/handleCart';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
const store = configureStore({
    reducer: combineReducers({
        handleCart
    }),

})

export default store ;