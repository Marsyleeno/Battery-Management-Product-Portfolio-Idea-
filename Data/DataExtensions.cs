using Microsoft.EntityFrameworkCore;

namespace GameStore.Api.Data;

public static class DataExtensions
{
    public static void AddGameStoreDb(this WebApplicationBuilder builder)
    {
        var connString = builder.Configuration.GetConnectionString("GameStore");
        // Update this line to use PortfolioContext!
        builder.Services.AddSqlite<PortfolioContext>(connString);
    }

    public static void MigrateDb(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        // Update this line to use PortfolioContext!
        var dbContext = scope.ServiceProvider.GetRequiredService<PortfolioContext>();
        dbContext.Database.Migrate();
    }
}