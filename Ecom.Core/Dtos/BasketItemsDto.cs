using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecom.Core.Dtos
{
    public class BasketItemsDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string ProductName { get; set; }
        [Required]
        public string ProductPicture { get; set; }
        [Range(0.1, double.MaxValue)]
        public decimal Price { get; set; }
        [Range(1, double.MaxValue)]
        public int Quantity { get; set; }
        public string category { get; }
    }
}
