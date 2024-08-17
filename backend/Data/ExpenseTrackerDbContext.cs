using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using ExpenseTracker.Models;


namespace ExpenseTracker.DataPostgreSQL;

public class ExpenseTrackerDbContext: DbContext
{
    public DbSet<Expenses> Expenses{get;set;}

    public ExpenseTrackerDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Expenses>()
        .ToTable("expenses")
        .HasKey(c => c.Id);


        base.OnModelCreating(modelBuilder);
    }
    
}
