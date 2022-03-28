
export function actionLike (store,id) {

    const result = store.getState().map((item) => {//ищем объект который выбрали, и изменяем свойство like с false на true
        if(item["id"] == id) {
            if( item["like"] == false) {
                item["like"] = true;
            } else if (item["like"] == true) {
                item["like"] = false
            }
        }

        return item
    })
    return {
        type: "UPDATE__STATE",
        arr: [...result]
    }
}


export function actionDelete (store, obj) {
    store.getState().splice(obj, 1);

    return {
        type: "DELETE",
        arr: [...store.getState()]
    }
}