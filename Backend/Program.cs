using GameStore.Api.Data;
using GameStore.Api.Dtos;
using GameStore.Api.Endpoints;
using GameStore.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowGitHubPages", policy =>
    {
        // Must be ONLY the base domain with NO trailing slash
        policy.WithOrigins("https://marsyleeno.github.io")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddValidation();
builder.AddGameStoreDb();

var app = builder.Build();

app.UseCors("AllowGitHubPages");
app.MapProductsEndpoints();
app.MapCategoriesEndpoints();

app.MigrateDb();

app.Run();