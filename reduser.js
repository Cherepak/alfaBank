

export function reduce(store, action) {
    if(action.type == "UPDATE__STATE") {
        let result = action.arr;
        localStorage.setItem("listBooks", JSON.stringify(result)) //обновим вместе со стором наш локал стор

        return result;

    } else if (action.type == "DELETE") {
        let result = action.arr;
        localStorage.setItem("listBooks", JSON.stringify(result))

        return result;
    }
    
    return store
}