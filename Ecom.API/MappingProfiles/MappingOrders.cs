using AutoMapper;
using Ecom.API.Helper;
using Ecom.Core.Dtos;
using Ecom.Core.Entities;
using Ecom.Core.Entities.Orders;

namespace Ecom.API.MappingProfiles
{
    public class MappingOrders:Profile
    {
        public MappingOrders()
        {
            CreateMap<ShipAddress, AddressDto>().ReverseMap();
            CreateMap<Order, OrderToReturnDto>()
                .ForMember(d=>d.DeliveryMethod,o=>o.MapFrom(s=>s.DeliveryMethod.ShortName))
                .ForMember(d=>d.shippingPrice,o=>o.MapFrom(s=>s.DeliveryMethod.Price))
                .ReverseMap();
            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(d=>d.ProductItemId,o=>o.MapFrom(s=>s.Id))
                .ForMember(d => d.ProductItemName, o => o.MapFrom(s => s.ProductItemOrdered.ProductItemName))
                .ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.ProductItemOrdered.PictureUrl))
                .ForMember(d=>d.PictureUrl,o=>o.MapFrom<OrderItemUrlResolver>())
                .ReverseMap();
        }
    }
}
