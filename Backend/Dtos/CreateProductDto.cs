using System.ComponentModel.DataAnnotations;

namespace GameStore.Api.Dtos;

public record CreateProductDto(
    [Required][StringLength(50)] string PartNumber,
    [Range(1, 50)] int CategoryId,
    [Range(1, 500000)] decimal Price,
    DateOnly ReleaseDate,
    string? ImageUrl
);

