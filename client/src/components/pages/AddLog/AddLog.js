import React, {useState, useEffect} from 'react'
import Footer from "../../Footer/Footer"
import { Link } from "react-router-dom";
import ReturnToBabyActions from '../../Return/ReturnToBabyActions';
import { addNewCategory, getCategory } from "../../Functions/categoryFunctions"

import "./AddLog.css"
import { List } from 'antd';

//this page is where the user picks what category of log he/she wishes to add.

function AddLog() {
    const userId = localStorage.getItem("userId")
    const babyInfo = JSON.parse(localStorage.getItem("babyClicked"));
    const category = ["Meal", "Nap", "Doctor's Appointment", "Vaccination"]
    const [addMyOwn,setAddMyOwn] = useState(false);
    const [newCategory, setNewCategory] = useState ({
        category: "",
        parentUserId: userId,
    })
    const [thisUserCategory, setThisUserCategory] = useState([]);

    useEffect(() => {
        getCategory().then(data => {
            const list = data.filter(result => result.parentUserId === userId);
            setThisUserCategory(list)
        })},[])

    function storeAction(each) {
        const nameCapitalized = each.charAt(0).toUpperCase() + each.slice(1)
        localStorage.removeItem("actionClicked")
        localStorage.setItem("actionClicked", nameCapitalized)
    }

    function storeActionArray(each) {
        localStorage.removeItem("actionClicked")
        localStorage.setItem("actionClicked", each.category)
    }

    function onChange(e){
        setNewCategory({ category: e.target.value });
    }

    function AddMyOwn(){
        setAddMyOwn(true)
    }

    function Submit(e) {
        e.preventDefault();

        const capitalized = newCategory.category.charAt(0).toUpperCase() + newCategory.category.slice(1)

        if (!newCategory.category){
            alert("this field cannot be left empty. please try again.")
            return false
        }

        const newCategoryData = {
            category: capitalized,
            parentUserId : userId
        }
        addNewCategory(newCategoryData)
        window.location.reload();
    }

 
   return (
        <div>
            <div className='container'>
                <h1 className="top-header">With {babyInfo.baby_first_name}, I would like to add...</h1>
                <div>
                    <ul className="AddLogBtn-List">
                        {category.map((each ,i) =>{
                            return <li key={i}>
                                        <button className="active">
                                            <Link to="/logData" onClick={() => storeAction(each)}>{each}</Link>
                                        </button>
                                    </li>
                        })}
                        
                        
                        <ul>
                    
                            
                            {thisUserCategory.map((each, i) => {
                            return <li key={i}>
                                        <button className="active">
                                            <Link to="/logData" onClick={() => storeActionArray(each)}>{each.category}</Link>
                                        </button>
                                    </li>
                            })}
                        </ul>
                        
                  
                    </ul>
                </div>
                <button onClick={()=> AddMyOwn()}>Add My Own Category</button>
                        
                {addMyOwn ? 
                <div>
                    <form noValidate onSubmit={Submit}>
                        <input placeholder="Type the New Category..." onChange={(e) => onChange(e)}></input>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                : null}
                <ReturnToBabyActions />
            </div>
            <Footer />
        </div>
    )
}

export default AddLog
