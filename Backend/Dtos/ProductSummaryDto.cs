namespace GameStore.Api.Dtos;

public record ProductSummaryDto(
    int Id,
    string PartNumber,
    string CategoryName,
    decimal Price,
    DateOnly ReleaseDate,
    string? ImageUrl
);

