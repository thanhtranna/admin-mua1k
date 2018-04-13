import {
    LOAD_USER_COMMENTS_FULFILLED,
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_USER_COMMENTS_FULFILLED:
                return {
                    ...state,
                    comments: action.payload.data.docs,
                    total: action.payload ? action.payload.data.total : null,
                    limit: action.payload ? action.payload.data.limit : null,
                    page: action.payload ? action.payload.data.page : null,
                    pages: action.payload ? action.payload.data.pages : null,
                };
                break;
        default:
            return state;
    }
};
