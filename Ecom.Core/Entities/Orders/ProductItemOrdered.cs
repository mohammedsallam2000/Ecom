namespace Ecom.Core.Entities.Orders
{
    public class ProductItemOrdered:BaseEntity<int>
    {
        public ProductItemOrdered()
        {
            
        }
        public ProductItemOrdered(int productItemId, string productItemName, string pictureUrl)
        {
            ProductItemId = productItemId;
            ProductItemName = productItemName;
            PictureUrl = pictureUrl;
        }

        public int ProductItemId { get; set; }
        public string ProductItemName { get; set; }
        public string PictureUrl { get; set; }

    }
}