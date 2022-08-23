import axios from "axios";
import { NOTES_LIST_REQUEST } from "../constants/notesConstants";

export const listNotes = () => async(dispatch, getState) => {
    try {
        dispatch({type: NOTES_LIST_REQUEST,
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                Auhtorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.get('/api/notes', config)

        

    } catch (error) {
        
    }
}