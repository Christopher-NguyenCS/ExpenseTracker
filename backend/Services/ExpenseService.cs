using System.Globalization;
using ExpenseTracker.DataPostgreSQL;
using ExpenseTracker.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Services;

public interface IExpenseService
{
    Task<List<Expenses>> GetAllExpense();
    Task<Expenses?> GetExpense(Guid id);
    Task AddExpense(Expenses expenseItem);
    Task UpdateExpense(Guid id, Expenses expenseItem);
    public Task DeleteExpense(Guid id);
}

public class ExpenseService:IExpenseService
{
    private readonly ExpenseTrackerDbContext _expenseContext;
    
    public ExpenseService(ExpenseTrackerDbContext expenseContext)
    {
        _expenseContext = expenseContext;

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


    public async Task AddExpense(Expenses expenseItems)
    {
        _expenseContext.Add(expenseItems);
        await _expenseContext.SaveChangesAsync();
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