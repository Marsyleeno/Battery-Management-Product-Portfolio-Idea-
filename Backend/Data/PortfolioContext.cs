using System;
using System.Security.Cryptography.X509Certificates;
using GameStore.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Api.Data;

public class PortfolioContext(DbContextOptions<PortfolioContext> options)
    : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();

    public DbSet<Category> Categories => Set<Category>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>().HasData(
            new { Id = 1, Name = "Battery Pack Monitor" },
            new { Id = 2, Name = "Fuel Gauge" },
            new { Id = 3, Name = "Multicell Battery Monitor" },
            new { Id = 4, Name = "Data-Aquisition System" }
        );
    }
}