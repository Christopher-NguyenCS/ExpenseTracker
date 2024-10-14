import {Pie} from "react-chartjs-2";
import { useState, useEffect} from "react";
import { months } from "../data/months.js";
import styles from "../styles/pieChart.module.css"



//Calculate the total cost of each category listed in the expense list
function countCategory(chartData){
    const categoryList = []; 
    let prevCategory = "";
    let totalCost = 0;
    const counterList = [];
    
    //able to push each category and cost as an object into an array.
    chartData.map(c=> categoryList.push({
        category:c.category.toLowerCase(),
        cost: c.cost
    }));
    // sort category ascending order
     categoryList.sort((a,b)=>{
         if(a.category < b.category){
             return -1;
         }
         if(a.category > b.category){
             return 1;
         }
         return 0;
     });


    categoryList.forEach(item => {
        if(prevCategory == ""){
            prevCategory = item.category;
            totalCost = item.cost;
        }
        else if(prevCategory == item.category){
            totalCost = totalCost + item.cost;
        }
        else{
            

            counterList.push({cost:{value:totalCost.toFixed(2)}});
          
            prevCategory = item.category;
            totalCost = item.cost;
        }
    });
    counterList.push({cost:{value:totalCost.toFixed(2)}});
    return counterList;
}

//Find the categories to label in the pie chart. 
function findLabel(chartData){
    const labels = [];
    //Eliminate the worry of including duplicates in the array.
    chartData.forEach(element => {
        if(!labels.includes(element.category.toLowerCase())){
            labels.push(element.category.toLowerCase());
        }
    });
    return labels.sort(); 
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function getCategoryLength(chartData){
    const map = new Map();

    for(let i = 0; i <chartData.length; i++){
        if(map.has(chartData[i].category)){
            continue;
        }
        else{
            map.set(chartData[i].category,i);
        }
    }
    return map.size;
}

function getColors(chartData,backgroundColor){
    let categoryLength = getCategoryLength(chartData);
    if(categoryLength > backgroundColor.length){
        let length = categoryLength - backgroundColor.length;
        for(let i = 0; i < length; i++){
            backgroundColor.push(getRandomColor());
        }
    }
    return backgroundColor
}


export default function PieChart({chartData}){
    let backgroundColor = ["#36a2eb","#ff6384","#4bc0c0","#ff9f40","#9966ff","#ffcd56"];
    const [formatData, setFormatData] = useState({
        labels: findLabel(chartData),
        datasets:[
            {
                data:countCategory(chartData),
                backgroundColor:getColors(chartData,backgroundColor),
            }
        ]
    });

    useEffect(()=>{
        if(chartData){
            setFormatData({
                    labels:findLabel(chartData),
                    datasets:[
                        {
                            data:countCategory(chartData),
                            backgroundColor:getColors(chartData,backgroundColor),
                        }
                    ],
                })
        }
    },[chartData]);


    return(
        <>
        <section className={styles.chartContainer}>
            <Pie
                data={formatData}
                options={{
                    parsing:{
                        key:'cost.value',
                    },
                    responsive:true,
  
                }}
            />
        </section>
        </>
    );
}