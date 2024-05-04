namespace Ecom.Core.Entities.Orders
{
    public class DeliveryMethod:BaseEntity<int>
    {
        public DeliveryMethod()
        {
            
        }
        public DeliveryMethod(string shortName, string deliveryTime, string description, decimal price)
        {
            ShortName = shortName;
            DeliveryTime = deliveryTime;
            Description = description;
            Price = price;
        }

        public string ShortName { get; set; }
        public string DeliveryTime { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }

    }
}