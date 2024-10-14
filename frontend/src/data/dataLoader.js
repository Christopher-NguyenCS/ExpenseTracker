import { getExpenses } from "./expenseServices";

export const expenseLoader = async ({ request }) => {
    const url = new URL(request.url);
    let startDate = url.searchParams.get('startDate') || new Date();
    let endDate = url.searchParams.get('endDate') || new Date();
    if(Object.prototype.toString.call(startDate) ==='[object Date]' && Object.prototype.toString.call(endDate) ==='[object Date]'){
         startDate = startDate.toUTCString();
         endDate = endDate.toUTCString();
    }
    const date = [startDate, endDate];
    const response = await getExpenses(date);
    const data = await response.json();
    return data;
};