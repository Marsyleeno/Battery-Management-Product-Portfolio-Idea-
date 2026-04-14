using System.ComponentModel.DataAnnotations;

namespace GameStore.Api.Dtos;

public record class UpdateProductDto(
    [Required][StringLength(20)] string PartNumber, // e.g., "ADBMS2950B"
    int CategoryId,
    [Range(1, 500000)] decimal Price,
    DateOnly ReleaseDate,
    string? ImageUrl
);