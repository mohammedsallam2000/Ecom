using AutoMapper;
using Ecom.Core.Dtos;
using Ecom.Core.Entities;

namespace Ecom.API.MappingProfiles
{
    public class MappingProduct : Profile
    {
        public MappingProduct()
        {
        CreateMap< Product, ProductDto>()
                .ForMember(x=>x.CategoryName,s=>s.MapFrom(s=>s.Category.Name))
                .ReverseMap();
            CreateMap<CreateProductDto, Product>().ReverseMap();

        }
    }
}
