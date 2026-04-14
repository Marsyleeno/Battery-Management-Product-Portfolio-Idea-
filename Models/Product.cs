using System;
using System.Security.Cryptography.X509Certificates;

namespace GameStore.Api.Models;

public class Product
{
    public int Id { get; set; }

    public required string PartNumber { get; set; }

    public Category? Category { get; set; }

    public int CategoryId { get; set; }

    public decimal Price { get; set; }

    public DateOnly ReleaseDate { get; set; }

    public string? ImageUrl { get; set; }
}

