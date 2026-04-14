using GameStore.Api.Data;
using GameStore.Api.Dtos;
using GameStore.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Api.Endpoints;

public static class ProductsEndpoints
{
    const string GetProductEndpointName = "GetProduct";

    public static void MapProductsEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/products");

        // GET /products 
        group.MapGet("/", async (PortfolioContext dbContext)
            => await dbContext.Products // Changed from Games to Products
                .Include(product => product.Category)
                .Select(product => new ProductSummaryDto(
                    product.Id,
                    product.PartNumber,
                    product.Category!.Name, // A category has a Name, not a PartNumber
                    product.Price,
                    product.ReleaseDate,
                    product.ImageUrl
                ))
                .AsNoTracking()
                .ToListAsync());

        // GET /products/1
        group.MapGet("/{id}", async (int id, PortfolioContext dbContext) =>
        {
            var product = await dbContext.Products.FindAsync(id); // Pluralized to Products

            return product is null ? Results.NotFound() : Results.Ok(
                new ProductDetailsDto(
                    product.Id,
                    product.PartNumber,
                    product.CategoryId, // Changed from GenreId to CategoryId
                    product.Price,
                    product.ReleaseDate,
                    product.ImageUrl
                )
            );
        })
        .WithName(GetProductEndpointName);

        // POST /products
        // Completely updated to use Product DTOs and entities
        group.MapPost("/", async (CreateProductDto newProduct, PortfolioContext dbContext) =>
        {
            Product product = new()
            {
                PartNumber = newProduct.PartNumber,
                CategoryId = newProduct.CategoryId,
                Price = newProduct.Price,
                ReleaseDate = newProduct.ReleaseDate,
                ImageUrl = newProduct.ImageUrl
            };

            dbContext.Products.Add(product);
            await dbContext.SaveChangesAsync();

            ProductDetailsDto productDto = new(
                product.Id,
                product.PartNumber,
                product.CategoryId,
                product.Price,
                product.ReleaseDate,
                product.ImageUrl
            );

            return Results.CreatedAtRoute(GetProductEndpointName, new { id = productDto.Id }, productDto);
        });

        // PUT /products/1
        group.MapPut("/{id}", async (
            int id,
            UpdateProductDto updatedProduct, // Standardized the variable name
            PortfolioContext dbContext) =>
        {
            var existingProduct = await dbContext.Products.FindAsync(id); // Changed from Games to Products

            if (existingProduct is null)
            {
                return Results.NotFound();
            }

            // Fixed typos and mapping
            existingProduct.PartNumber = updatedProduct.PartNumber;
            existingProduct.CategoryId = updatedProduct.CategoryId;
            existingProduct.Price = updatedProduct.Price;
            existingProduct.ReleaseDate = updatedProduct.ReleaseDate;
            existingProduct.ImageUrl = updatedProduct.ImageUrl;

            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        });

        // DELETE /products/1
        group.MapDelete("/{id}", async (int id, PortfolioContext dbContext) =>
        {
            await dbContext.Products
                .Where(product => product.Id == id)
                .ExecuteDeleteAsync();

            return Results.NoContent();
        });
    }
}