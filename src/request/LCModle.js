import store from '../redux/configureStore'


export function point(className,objectId) {
    return {
        "__type": "Pointer",
        "className": className,
        "objectId": objectId
    }
}
export function pointModel(name,objectId,className) {
    return {
        [name]:  point(className||name,objectId),
    }
}

export function user(objectId) {
    return   pointModel("user",objectId,'_User')
}

export function selfUser() {
    const state = store.getState()
    const id = state.user.data.objectId;
    return user(id)
}

export function iCard(id) {
    return pointModel('iCard',id)
}

