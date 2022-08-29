import axios from "axios";
import { 
    NOTES_LIST_FAIL, 
    NOTES_LIST_REQUEST, 
    NOTES_LIST_SUCCESS 
} from "../constants/notesConstants";

import store from '../store'

export const listNotes = () => async(dispatch, getState) => {
    try {
        const token = store.getState().userLogin.userInfo.token
        console.log(token, 'horee')
        dispatch({type: NOTES_LIST_REQUEST, payload: token})

        // const config = {
        //     headers: {
        //         Auhtorization: `Bearer ${userInfo.token}`,
        //     }
        // }
       
        const {data} = await axios.get('/api/notes', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        dispatch({
          type: NOTES_LIST_SUCCESS,
          payload: data,
        });


    } catch (error) {
        const message = 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.response
        dispatch({
            type: NOTES_LIST_FAIL,
            payload: message 
        })
    }
}