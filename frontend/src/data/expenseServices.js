import {v4 as uuidv4} from "uuid";
import { parse,format } from "date-fns";


export const getExpenses = async() =>{
    try{
        const response = await fetch("http://localhost:5258/expenses",{
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
    }catch (error) {
        throw new Error(error.message);
    }
};

export const postExpenses = async (data) => {
    console.log("Data:",data);
    try {
        const response = await fetch("http://localhost:5258/expenses", {
            method: "POST",
            body: JSON.stringify([{
                id: uuidv4(),
                title: data.title,
                description:data.description,
                date:format(data.date, "MM/dd/yyyy"),
                time:format(parse(data.time,"HH:mm",new Date()),'hh:mm a'),
                cost:data.cost,
                category:data.category
            }]),
            headers: {
                "Content-Type": "application/json"
            },
        });
        const text = await response.text();
        console.log('Response:', text);
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Error: ${response.status} - ${errorData.message}`);
        }

        return text;
    } catch (error) {
        console.error('Error:', error.message);
        // throw new Error(error.message);
    }
};
