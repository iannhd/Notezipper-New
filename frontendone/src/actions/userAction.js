import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userLoginConstants"
import axios from "axios"
export const login = (email, password) => async(dispatch )=> {
 
    try {
        dispatch({type: USER_LOGIN_REQUEST})
        const config = {
            headers : {
                "Content-type" : "application/json"
            }
        }

        const {data} = await axios.post('/api/users/login', {
            email,
            password
        }, config)
        console.log(data, "===> dari dispatch")

        dispatch({type: USER_LOGIN_SUCCESS, payload:data})

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({type: USER_LOGIN_FAIL, 
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const logout = ()=> async(dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
}

export const register = (name, email, password, pic) => async (dispatch) => {
    try {
        dispatch({type: USER_REGISTER_REQUEST})

        const config = {
            headers : {
                "Content-type" : "application/json"
            }
        }

        const {data} = axios.post('/api/users/',
        {name, email, password, pic}, 
        config
        )
        .then((data)=>{
            console.log(data, "response dari axios")
            dispatch({type: USER_REGISTER_SUCCESS, payload:data})
            console.log(data, "===> bawah register")
            dispatch({type: USER_LOGIN_SUCCESS, payload:data})
            console.log(data, "====> bawah login")
            localStorage.setItem('userInfo', JSON.stringify(data))
        })
        .catch((error)=>{
            console.log(error)
        })

       
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
            error.response && error.data.response.message 
            ? error.response
            : error.data.response.message
        })
    }
}