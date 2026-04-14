namespace GameStore.Api.Dtos;

public record class ProductDetailsDto(
    int Id,
    string PartNumber,
    int CategoryId,
    decimal Price,
    DateOnly ReleaseDate,
    string? ImageUrl
);

