import { postExpenses,updateExpenses,deleteExpenses } from "./expenseServices";
import { redirect } from "react-router-dom";

export async function action({request,params}){
    const formData = await request.formData();
    switch(request.method){

        case "POST":{
            const url = new URL(request.url);
            const data = Object.fromEntries(formData);
            const startDate = url.searchParams.get('startDate');
            const endDate = url.searchParams.get('endDate');
            await postExpenses(data);
            return redirect(`/expenses/?startDate=${startDate}&endDate=${endDate}`);
        }
        case "PUT":{
            const url = new URL(request.url);
            const data = Object.fromEntries(formData);
            const id = params.id;
            const startDate = url.searchParams.get('startDate');
            const endDate = url.searchParams.get('endDate');
            await updateExpenses(data,id);
            return redirect(`/expenses/?startDate=${startDate}&endDate=${endDate}`);
        }
        case "DELETE":{
            const url = new URL(request.url);
            const startDate = url.searchParams.get('startDate');
            const endDate = url.searchParams.get('endDate');
            const ids = formData.getAll('id');
            await deleteExpenses(ids);
            return redirect(`/expenses/?startDate=${startDate}&endDate=${endDate}`);
        }
    }
}