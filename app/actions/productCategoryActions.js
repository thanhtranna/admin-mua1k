import agent from '../agent';
import {
    DELETE_PRODUCT_CATEGORY, 
    GET_PRODUCT_CATEGORIES, 
    POST_PRODUCT_CATEGORY,
    PRODUCT_CATEGORIES_UNLOAD
} from '../constants/actionTypes';

export function getCategories(page = 1) {
    return {
        type: GET_PRODUCT_CATEGORIES,
        payload: Promise.all([
            agent.ProductCategory.getAll(page)
        ])
    }
}

export function onUnLoad() {
    return {
        type: PRODUCT_CATEGORIES_UNLOAD,
    }
}

export function postProductCategory(data) {
    return {
        type: POST_PRODUCT_CATEGORY,
        payload: agent.ProductCategory.postCategory(data)
    }
}

export function deleteCategory(id) {
    return {
        type: DELETE_PRODUCT_CATEGORY,
        payload: agent.ProductCategory.del(id)
    }
}
