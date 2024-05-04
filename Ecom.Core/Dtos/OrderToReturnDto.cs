using Ecom.Core.Entities.Orders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecom.Core.Dtos
{
    public class OrderToReturnDto
    {
        public int id { get; set; }
        public string BuyerEmail { get; set; }
        public DateTime OrderDate { get; set; } 
        public ShipAddress ShipToAddress { get; set; }
        public string DeliveryMethod { get; set; }
        public decimal shippingPrice { get; set; }
        public IReadOnlyList<OrderItemDto> OrderItem { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Total { get; set; }
        public string OrderStatus { get; set; } 
    }
}
