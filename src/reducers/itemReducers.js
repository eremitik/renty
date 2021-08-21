
import {
    ITEM_CREATE,
    ITEM_REQUEST_ALL,
    ITEM_UPDATE,
    ITEM_DELETE,
    ITEM_REQUEST_SEARCH
} from '../types/itemTypes.js'



export const itemCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ITEM_CREATE:
            return { item: action.payload };

        default:
            return state;
    }
};

export const itemRequestAllReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case ITEM_REQUEST_ALL:
            return { items: action.payload };

        default:
            return state;
    }
}

export const itemUpdateReducer = (state = { item: {} }, action) => {
    switch (action.type) {
        case ITEM_UPDATE:
            return { item: action.payload };

        default:
            return state;
    }
}

export const itemDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ITEM_DELETE:
            return { item: action.payload };

        default:
            return state;
    }
}

export const itemSearchReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case ITEM_REQUEST_SEARCH:
            return { items: action.payload };

        default:
            return state;
    }
}