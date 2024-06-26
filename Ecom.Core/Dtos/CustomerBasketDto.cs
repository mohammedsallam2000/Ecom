﻿using Ecom.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecom.Core.Dtos
{
    public class CustomerBasketDto
    {
        [Required]
        public string Id { get; set; }
        public List<BasketItemsDto> BasketItems { get; set; } = new List<BasketItemsDto>();
        public int? DeliveryMethodId { get; set; }
        public string ClientSecrete { get; set; }
        public string PaymentIntentId { get; set; }
        public decimal shippingPrice { get; set; }

    }
}
