import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {connect, Provider} from "react-redux";
import {reduce} from "./reduser"
import {actionLike} from "./action"
import {actionDelete} from "./action"

(async function () {
    await fetch("https://gutendex.com/books", {//Получаем промис с книгами
 
})
.then((result) => {
    return result.json()
})
.then((data) => { 
    
    if(!localStorage.getItem("listBooks")) {//если данных нет в локал стор, запишем их туда 
        //но перед этим добавим в каждый объект состояние лайка true или false
 
        for(let key in data.results) {
            data.results[key].like = false
        }
        
        localStorage.setItem("listBooks", JSON.stringify(data.results)) 
    
    } 
    
})
.catch( err => {
    console.log("Error: " + err)
});



const store = createStore(reduce, JSON.parse(localStorage.getItem("listBooks")));// записываем из локалстора 

function ListBooks () {

    let result = [];
    let storege = store.getState();

    for (let key in storege) {
        
        result.push(
        <li className="item" key={key}>
            <h2 className="title">{storege[key]["title"]}</h2>
            <img className="image" src={storege[key]["formats"]["image/jpeg"]} alt="Обложка"/>
            <button className={(function () {
                
                if(storege[key]["like"] == false) {
                    return "like"
                } else if (storege[key]["like"] == true) {
                    return "like__yes"
                }
            })()} onClick={(item)=> {
                store.dispatch(actionLike(store,storege[key]["id"]))
            
            }}>Like</button>

            <button onClick={(item) => {
                store.dispatch(actionDelete(store, key))
            }}>delete</button>
        </li>
        );
    }

    return ( 
    <div>
        <button
        onClick={()=> {
            let result = [];
            let arr = store.getState();//перебираем и вставляем элементы массива где like == true
            arr.map((item) => {
                if(item["like"] == true) {
                    
                    result.push(item)

                } 
            });

            let list = document.createElement("ul");
            
            result.map((obj) => {
                let item = document.createElement("li");
                let title = document.createElement("h2");
                title.textContent = `${obj["title"]}`;
                let image = document.createElement("img");
                image.setAttribute("src", `${obj["formats"]["image/jpeg"]}`);
                image.setAttribute("alt", `Обложка ${obj["title"]}`);

                item.append(title);
                item.append(image);
                list.append(item);
            })

            let elem = document.getElementById("list");
            elem.replaceWith(list)

        }}>Показать только книги с лайком</button>
        
        <ul className="list" id="list">
            {result}
        </ul>
    </div>
    )
}

const mapDispatchToProps = (dispatch)=> {
    return {
        UPDATE__STATE: () => dispatch({type:"UPDATE__STATE"}), 
        DELETE: () => dispatch({type:"DELETE"})
    }
}

const WrapperMainComponent = connect(mapDispatchToProps)(ListBooks);

ReactDOM.render(
    <Provider store={store}>
        <WrapperMainComponent/>
    </Provider>, document.getElementById("root")
)
})()