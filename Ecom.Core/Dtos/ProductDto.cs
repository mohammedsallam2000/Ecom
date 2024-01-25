using Ecom.Core.Entities;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Ecom.Core.Dtos
{
    public class BaseProduct
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Range(1,5000,ErrorMessage ="Price limited {0} and {1}")]

        public decimal Price { get; set; }
    }
    public class ProductDto: BaseProduct
    {
        public int Id { get; set; }
        public string  CategoryName { get; set; }
    }

    public class CreateProductDto:BaseProduct
    {
        public int CategoryId { get; set; }
        public IFormFile Image { get; set; }
        // public string CategoryName { get; set; }
    }
}
