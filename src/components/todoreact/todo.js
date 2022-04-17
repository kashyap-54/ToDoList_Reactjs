import React, { useState, useEffect } from 'react'
import './todo.css'

//gettingLocalData

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");
    if (lists) {
        return JSON.parse(lists);
    }
    else {
        return [];
    }
}

const Todo = () => {

    const [inputdata, setInputdata] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isedititem, setIsEditItem] = useState("");
    const [togglebtn, setToggleBtn] = useState(false);

    const addItem = () => {
        if (!inputdata) {
            alert("Please fill the data")
        }
        else if (inputdata && togglebtn) {
            setItems(
                items.map((currEle) => {
                    if (currEle.id === isedititem) {
                        return { ...currEle, name: inputdata };
                    }
                    return currEle;
                })
            );

            setInputdata("");
            setIsEditItem(null);
            setToggleBtn(false);
        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
            };
            setItems([...items, myNewInputData]);
            setInputdata("");
        }
    }

    const editItem = (index) => {
        const items_todo_edited = items.find((currEle) => {
            return currEle.id === index;
        });
        setInputdata(items_todo_edited.name);
        setIsEditItem(index);
        setToggleBtn(true);
    };

    const deleteItem = (index) => {
        const updatedItems = items.filter((currEle) => {
            return currEle.id !== index;
        });
        setItems(updatedItems);
    }

    const removeAll = () => {
        setItems([]);
    }

    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);

    return (

        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add your list here!</figcaption>
                    </figure>
                    <div className='additems'>
                        <input type="text" placeholder='✍ add item' className='form-control'
                            value={inputdata}
                            onChange={(event) => setInputdata(event.target.value)} />
                        {togglebtn ? (<i className="far fa-edit add-btn" onClick={addItem}></i>) : (<i className="fa fa-plus add-btn" onClick={addItem}></i>)}
                    </div>
                    <div className='showItems'>
                        {items.map((currEle) => {
                            return (
                                <div className='eachItem' key={currEle.id}>
                                    <h3>{currEle.name}</h3>
                                    <div className='todo-btn'>
                                        <i className="far fa-edit add-btn" onClick={() => editItem(currEle.id)}></i>
                                        <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(currEle.id)}></i>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text="Remove all" onClick={removeAll}>
                            <span>CheckList</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Todo

