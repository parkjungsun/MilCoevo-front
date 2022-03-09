import * as newsApi from "../api/news"; 

const GET_NEWS = "GET_NEWS";
const CLEAR_NEWS = "CLEAR_NEWS";
const EXPIRE_TOKEN = "EXPIRE_TOKEN";

export const getNews = (token, groupId, index, time) => async (dispatch) => {
    const result = await newsApi.getNews(token, groupId, index, time);
    if(result.status === 200) {
        dispatch({ type: GET_NEWS, payload: {index: index + 1, timeIndex: time, data:  result.data} });
    } else if(result.status === 401) {
        dispatch({ type: EXPIRE_TOKEN });
    } else {
        dispatch({ type: CLEAR_NEWS });
    }
}

export const clearNews = () => ({type: CLEAR_NEWS});

const initialState = {
    index: 0,
    timeIndex: "",
    data: []
};

export default function news(state=initialState, action) {
    switch(action.type) {
        case GET_NEWS:
            return {
                index: action.payload.index,
                timeIndex: action.payload.timeIndex,
                data: state.data.concat(action.payload.data)
            }
        case CLEAR_NEWS:
            return initialState;
        default:
            return state;
    }
}