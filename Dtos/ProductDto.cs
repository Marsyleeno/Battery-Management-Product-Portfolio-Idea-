namespace GameStore.Api.Dtos;

public record ProductDto(
    int Id,
    string PartNumber,
    string Category,
    decimal Price,
    DateOnly ReleaseDate,
    string? ImageUrl
);

