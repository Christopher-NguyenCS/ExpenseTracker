
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using SystemTextJson;

namespace ExpenseTracker.Models;


public class Expenses
{
    public int Id{get;set;}
    public string? Title{get;set;}
    public string? Description{get;set;}
      [JsonConverter(typeof(DateConverter))]
    public DateTimeOffset Date{get;set;}
    [JsonConverter(typeof(TimeConverter))]
    public DateTimeOffset? Time{get;set;}
    public double Cost{get;set;}
    public string? Category{get;set;}
}