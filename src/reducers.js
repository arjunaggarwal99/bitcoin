import thunk from "redux-thunk"

const initialState = {
    loading: false,
    tweets:[],
    error: ''
}

const reducer = (state=initialState, action) => {
    if(action.type == "FETCH_TWEETS_REQUEST") {
        return {
            ...state,
            loading: true,
            tweets:[]
        }
    }

    if(action.type == "FETCH_TWEETS_SUCCESS") {
        return {
            loading: false,
            tweets: action.payload,
            error: ''
        }
    }

    if(action.type == "FETCH_TWEETS_FAILURE") {
        return {
            loading: false,
            tweets:[],
            error: action.payload
        }
    }



}

export default reducer