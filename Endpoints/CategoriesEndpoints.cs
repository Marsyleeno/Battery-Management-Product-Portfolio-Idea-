using GameStore.Api.Data;
using GameStore.Api.Dtos;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Api.Endpoints;

public static class CategoriesEndpoints
{
    public static void MapCategoriesEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/categories");

        group.MapGet("/", async (PortfolioContext dbContext) =>
            await dbContext.Categories
                .Select(category => new CategoryDto(category.Id, category.Name))
                .AsNoTracking()
                .ToListAsync());
    }
}