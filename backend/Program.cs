
using ExpenseTracker.DataPostgreSQL;
using ExpenseTracker.Models;
using ExpenseTracker.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SystemTextJson;

var builder = WebApplication.CreateBuilder(args);

//services for DI
builder.Services.AddScoped<IExpenseService,ExpenseService>();
builder.Services.AddDbContext<ExpenseTrackerDbContext>(options => options
    .UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers().AddJsonOptions(options => {
    options.JsonSerializerOptions.Converters.Add(new DateConverter());
    options.JsonSerializerOptions.Converters.Add(new TimeConverter());
});

var app = builder.Build();

app.MapGet("/expenses", async Task<List<Expenses>>(IExpenseService service) =>
{
    return await service.GetAllExpense();
});

app.MapGet("/test-connection", async (ExpenseTrackerDbContext context) =>
{
         var canConnect = await context.Database.CanConnectAsync();
         return canConnect ? Results.Ok("Connection successful!") : Results.Problem("Connection failed.");
});


app.MapGet("/expenses/{id}", async Task<Results<Ok<Expenses>,NotFound<String>>> (int id, IExpenseService expenseService, ExpenseTrackerDbContext context) =>
{
    var expense =  await expenseService.GetExpense(id);
    if(expense != null)
    {
        return TypedResults.Ok<Expenses>(expense);
    }
    return TypedResults.NotFound("The expenses you are looking for was not found");
});


app.MapPost("/expenses", async(List<Expenses> expensesItems, IExpenseService expenseService,ExpenseTrackerDbContext context)=>
{
    await expenseService.AddExpense(expensesItems);
    return TypedResults.Ok(await context.Expenses.ToListAsync());
});


app.MapPut("/expenses/{id}", async Task<Results<Ok,NotFound>>(int id,[FromBody]Expenses updateExpenseItem, ExpenseTrackerDbContext context, IExpenseService expenseService) =>
{
    var expenseItem =  await expenseService.GetExpense(id);
    if(expenseItem == null)
    {
        return TypedResults.NotFound();
    }
    await expenseService.UpdateExpense(id,updateExpenseItem);
    return TypedResults.Ok();
});



app.MapDelete("expenses/{id}", async Task <Results<Ok, NotFound>?>  (int id, IExpenseService expenseService) =>
{
    var expense = await expenseService.GetExpense(id);
    if(expense == null)
    {
        return TypedResults.NotFound();
    }
    await expenseService.DeleteExpense(id);
    return TypedResults.Ok();
});

app.Run();
