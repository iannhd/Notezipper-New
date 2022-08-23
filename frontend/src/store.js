import {createStore, combineReducers, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { noteListReducer } from './reducers/notesReducers'
import { userLoginReducers, userRegisterReducers } from './reducers/userLoginReducers'

const reducer = combineReducers({
    userLogin:userLoginReducers,
    userRegister:userRegisterReducers,
    notesList:noteListReducer
})

const userInfoFromLocalStorage = localStorage.getItem('userInfo') 
? JSON.parse(localStorage.getItem('userInfo')) 
: undefined

const initialState = {
    userLogin: userInfoFromLocalStorage
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store