import {v4 as uuidv4} from "uuid";
import { parse,format,parseISO } from "date-fns";


export const getExpenses = async(date = null) =>{
    try{
           if(date == null){
            const response = await fetch("http://localhost:5258/expenses?startDate=null&endDate=null",{
                method:"GET", 
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        else{
                const response = await fetch(`http://localhost:5258/expenses?startDate=${date[0]}&endDate=${date[1]}`,{
                    method:"GET", 
                    headers:{
                        "Content-Type":"application/json"
                    }
                });
                if(!response.ok){
                    throw new Error("Error grabbing data with specific dates!!!");
                }
                return response;
            }
           

    }catch (error) {
        throw new Error(error.message);
    }
}

export const getExpense = async(id) =>{
    try {
        const response = await fetch(`http://localhost:5258/expenses/${id}`);
        if(!response.ok){
            throw new Error("Error grabbing specific expense, id does not exist in the database :(");
        }
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const postExpenses = async (data) => {
    
    try {
        const response = await fetch("http://localhost:5258/expenses", {
            method: "POST",
            body: JSON.stringify({
                Id: uuidv4(),
                Title: data.title,
                Description:data.description,
                Date:format(parseISO(data.date), "MM/dd/yyyy"),
                Time:format(parse(data.time,"HH:mm",new Date()),'hh:mm a'),
                Cost:parseFloat(data.cost),
                Category:data.category
            }),
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP ERROR! status: ${response.status} `);
        }
        const newData = response.json();
        return newData;
    } catch (error) {
        console.error('Error adding expenses:', error.message);
        return null;
    }
};

export const deleteExpenses = async(ids) =>{

    const promises = ids.map((id) => {
        fetch(`http://localhost:5258/expenses/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
        }).then(response => 
            {
                if(response.status == 204){
                    console.log("Deletion was successful");
                }
            })
            .catch(error => console.error(error.message));
    });
    const result = await Promise.all(promises);
    return result;
}

export const updateExpenses = async(data,id) =>{
    try {
        const response = await fetch(`http://localhost:5258/expenses/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                Id: id,
                Title: data.title,
                Description:data.description,
                Date:format(parseISO(data.date), "MM/dd/yyyy"),
                Time:format(parse(data.time,"HH:mm",new Date()),'hh:mm a'),
                Cost:parseFloat(data.cost),
                Category:data.category
            }),
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP ERROR! status: ${response.status} `);
        }
        const updatedData = response.json();
        return updatedData;
    } catch (error) {
        console.error('Error adding expenses:', error.message);
        return null;
    }
};




