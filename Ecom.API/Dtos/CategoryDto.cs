using System.ComponentModel.DataAnnotations;

namespace Ecom.API.Dtos
{
    public class CategoryDto
    {
        [Required]
        public String Name { get; set; }
        public String Description { get; set; }
    }

    public class ListingCategoryDto:CategoryDto
    {
        public int Id { get; set; }
    }
}
