using AutoMapper;
using Ecom.Core.Dtos;
using Ecom.Core.Entities.Orders;

namespace Ecom.API.Helper
{
    public class OrderItemUrlResolver : IValueResolver<OrderItem, OrderItemDto, string>
    {
        private readonly IConfiguration configuration;

        public OrderItemUrlResolver(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public string Resolve(OrderItem source, OrderItemDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.ProductItemOrdered.PictureUrl))
            {
                return configuration["ApiUrl"] +source.ProductItemOrdered.PictureUrl;
            }
            return null;
        }
    }
}
