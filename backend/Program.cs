
using ExpenseTracker.DataPostgreSQL;
using ExpenseTracker.Models;
using ExpenseTracker.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SystemTextJson;

var MyAllowSpecificOrigins = "expenseTracker";
var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

//services for DI
builder.Services.AddCors(options =>
{
    options.AddPolicy(name:MyAllowSpecificOrigins,
    policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .WithMethods("GET","POST","DELETE","PUT")
            .WithHeaders("Content-Type","Authorization");
    });
});
builder.Services.AddScoped<IExpenseService,ExpenseService>();
builder.Services.AddDbContext<ExpenseTrackerDbContext>(options => options
    .UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers().AddJsonOptions(options => {
    options.JsonSerializerOptions.Converters.Add(new DateConverter());
    options.JsonSerializerOptions.Converters.Add(new TimeConverter());
});

var app = builder.Build();

app.UseRouting();
app.UseCors(MyAllowSpecificOrigins);

app.MapGet("/expenses", async(IExpenseService service) =>
{
    var expenses = await service.GetAllExpense();
    return Results.Json(expenses);
    // return await service.GetAllExpense();

});

app.MapGet("/test-connection", async (ExpenseTrackerDbContext context) =>
{
    var canConnect = await context.Database.CanConnectAsync();
    return canConnect ? Results.Ok("Connection successful!") : Results.Problem("Connection failed.");
});


app.MapGet("/expenses/{id}", async Task<Results<Ok<Expenses>,NotFound<String>>> (Guid id, IExpenseService expenseService, ExpenseTrackerDbContext context) =>
{
    var expense =  await expenseService.GetExpense(id);
    if(expense != null)
    {
        return TypedResults.Ok<Expenses>(expense);
    }
    return TypedResults.NotFound("The expenses you are looking for was not found");
});


app.MapPost("/expenses",async Task<IResult> (IExpenseService expenseService,Expenses expensesItems)=>
{
    var addedExpenses = await expenseService.AddExpense(expensesItems);
    return Results.Json(addedExpenses);
});


app.MapPut("/expenses/{id}", async Task<Results<Ok<Expenses>,NotFound>>(Guid id,[FromBody]Expenses updateExpenseItem, ExpenseTrackerDbContext context, IExpenseService expenseService) =>
{
    var expenseItem =  await expenseService.GetExpense(id);
    if(expenseItem == null)
    {
        return TypedResults.NotFound();
    }
    await expenseService.UpdateExpense(id,updateExpenseItem);
    return TypedResults.Ok<Expenses>(expenseItem);
});



app.MapDelete("expenses/{id}", async (Guid id, IExpenseService expenseService) =>
{
    var expense = await expenseService.GetExpense(id);
    if(expense == null)
    {
        return Results.NotFound();
    }
    await expenseService.DeleteExpense(id);
    return Results.StatusCode(204);
});

app.Run();
