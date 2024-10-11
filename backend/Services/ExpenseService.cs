using System.Globalization;
using System.Reflection.Metadata.Ecma335;
using ExpenseTracker.DataPostgreSQL;
using ExpenseTracker.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using Npgsql;

namespace ExpenseTracker.Services;

public interface IExpenseService
{
    Task<List<Expenses>> GetAllExpense();
    Task<Expenses?> GetExpense(Guid id);
   Task<List<Expenses>> GetExpensesDateRanged(String startDate, String endDate);
    Task<Expenses> AddExpense(Expenses expenseItem);
    Task UpdateExpense(Guid id, Expenses expenseItem);
    public Task DeleteExpense(Guid id);
}

public class ExpenseService:IExpenseService
{
    private readonly ExpenseTrackerDbContext _expenseContext;
    private readonly NpgsqlDataSource _dataSource;

    private DateTime convertDateToUTC(String date){

        DateTime newDate = DateTime.ParseExact(date,  "ddd, dd MMM yyyy HH:mm:ss 'GMT'", CultureInfo.InvariantCulture, DateTimeStyles.AdjustToUniversal);

        DateTime utcDate = new DateTime(newDate.Year,newDate.Month,newDate.Day, newDate.Hour,newDate.Minute,newDate.Second,newDate.Millisecond, DateTimeKind.Utc);
     
        return utcDate;
    }
    public ExpenseService(ExpenseTrackerDbContext expenseContext, NpgsqlDataSource datasource)
    {
        _expenseContext = expenseContext;
        _dataSource = datasource;
    }
    public async Task<List<Expenses>> GetAllExpense()
    {
        return await _expenseContext.Expenses.ToListAsync(); 
    }

    public async Task<Expenses?>  GetExpense(Guid id)
    {
        var expense = await _expenseContext.Expenses.FindAsync(id);
        return expense;
    }

    public async Task<List<Expenses>> GetExpensesDateRanged(string startDate, string endDate)
{
    DateTime newStartDate = convertDateToUTC(startDate); 
    DateTime newEndDate = convertDateToUTC(endDate);
    var firstParameter = new NpgsqlParameter("@p1", NpgsqlTypes.NpgsqlDbType.TimestampTz);
    var secondParameter = new NpgsqlParameter("@p2", NpgsqlTypes.NpgsqlDbType.TimestampTz);
    List<Expenses> newExpenseList = new List<Expenses>();

    await using var cmd = _dataSource.CreateCommand("SELECT * FROM expenses WHERE \"Date\" >= @p1 AND \"Date\" <= @p2 ORDER BY \"Date\",\"Cost\",\"Time\"");
    firstParameter.Value = newStartDate;
    secondParameter.Value = newEndDate;

    cmd.Parameters.Add(firstParameter);
    cmd.Parameters.Add(secondParameter);
    
    await using (var reader = await cmd.ExecuteReaderAsync())
    {
        while (await reader.ReadAsync())
        {
            var expense = new Expenses
            {
                Id = reader.GetGuid(6),
                Title = reader.GetString(0),
                Description = reader.GetString(1),
                Date = reader.GetDateTime(2),
                Time = reader.GetDateTime(3),
                Cost = reader.GetDouble(4),
                Category = reader.GetString(5)
            };
            newExpenseList.Add(expense);
        }
    }
    return newExpenseList;
}

    public async Task<Expenses> AddExpense(Expenses expenseItems)
    {
        _expenseContext.Add(expenseItems);
        await _expenseContext.SaveChangesAsync();
        return expenseItems;
    }


    public async Task UpdateExpense(Guid id, Expenses expenseItem)
    {
        var updateExpense = await GetExpense(id);

        if(updateExpense!=null)
        {
            updateExpense.Title = expenseItem.Title??null;
            updateExpense.Cost = expenseItem.Cost;
            updateExpense.Description = expenseItem.Description??null;
            updateExpense.Category = expenseItem.Category??null;
            updateExpense.Date = expenseItem.Date;
            updateExpense.Time = expenseItem.Time??null;
            _expenseContext.Update(updateExpense);
        }
        await _expenseContext.SaveChangesAsync();
        
    }


    public async Task DeleteExpense(Guid id)
    {
        var deleteExpense =  await GetExpense(id);

        if(deleteExpense != null)
        {
            _expenseContext.Remove(deleteExpense);
            await _expenseContext.SaveChangesAsync();
        }
    }

}