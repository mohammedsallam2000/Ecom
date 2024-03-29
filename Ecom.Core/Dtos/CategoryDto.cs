﻿using System.ComponentModel.DataAnnotations;

namespace Ecom.Core.Dtos
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
    public class UpdateCategoryDto : CategoryDto
    {
        public int Id { get; set; }
    }
}
