import agent from '../agent';
import {
    CREATE_PRODUCT,
    DELETE_PRODUCT,
    GET_CATEGORIES_CONDITIONS,
    GET_DETAIL_PRODUCT,
    GET_PRODUCTS,
    LOAD_EDIT_PRODUCT,
    PRODUCTS_PAGE_UNLOAD,
    REDIRECT
} from '../constants/actionTypes';

export function getProducts(page = 1) {
    if (page < 0) page = 1;
    return {
        type: GET_PRODUCTS,
        payload: Promise.all([
            agent.Product.getAll(page),
            agent.Category.getAll()
        ])
    }
}

export function onUnload() {
    return {
        type: PRODUCTS_PAGE_UNLOAD,
    }
}

export function getProduct(id) {
    return {
        type: GET_DETAIL_PRODUCT,
        payload: agent.Product.show(id)
    }
}

export function deleteProduct(id) {
    return {
        type: DELETE_PRODUCT,
        payload: agent.Product.delete(id)
    }
}

export function getCategoriesAndConditions() {
    return {
        type: GET_CATEGORIES_CONDITIONS,
        payload: Promise.all([
            agent.Category.getAll(),
            agent.Condition.getAllSelect()
        ])
    }
}

export function postProduct(data) {
    return {
        type: CREATE_PRODUCT,
        payload: agent.Product.create(data)
    }
}

export function onRedirect() {
    return {
        type: REDIRECT
    }
}

export function onLoadEdit(id) {
    return {
        type: LOAD_EDIT_PRODUCT,
        payload: Promise.all([
            agent.Product.show(id),
            agent.Category.getAll(),
            agent.Condition.getAllSelect()
        ])
    }
}

export function putProduct(id, data) {
    return {
        type: "UPDATE_PRODUCT",
        payload: agent.Product.update(id, data)
    }
}

export function onSearch(name, page = 1) {
    return {
        type: "SEARCH_PRODUCT",
        payload: Promise.all([
            agent.Product.search(name, page),
            agent.Category.getAll()
        ])
    }
}

export function onFilter(type, category = null, page = 1) {
    return {
        type: "FILTER_PRODUCT",
        payload: Promise.all([
            agent.Product.filter(type, category, page),
            agent.Category.getAll()
        ])
    }
}
