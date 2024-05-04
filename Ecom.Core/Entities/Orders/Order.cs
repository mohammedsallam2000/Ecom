using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecom.Core.Entities.Orders
{
    public class Order:BaseEntity<int>
    {
        public Order()
        {
            
        }
        public Order(string buyerEmail, ShipAddress shipToAddress, DeliveryMethod deliveryMethod, IReadOnlyList<OrderItem> orderItem, decimal subTotal)
        {
            BuyerEmail = buyerEmail;
            ShipToAddress = shipToAddress;
            DeliveryMethod = deliveryMethod;
            OrderItem = orderItem;
            SubTotal = subTotal;
        }

        public string BuyerEmail { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public ShipAddress  ShipToAddress { get; set; }
        public DeliveryMethod DeliveryMethod { get; set; }
        public IReadOnlyList<OrderItem> OrderItem { get; set; }
        public decimal SubTotal { get; set; }
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;

        public decimal GetTotal()
        {
            return SubTotal +DeliveryMethod.Price;
        }
    }
}
