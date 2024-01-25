﻿using AutoMapper;
using Ecom.API.Dtos;
using Ecom.Core.Entities;

namespace Ecom.API.MappingProfiles
{
    public class MappingCategory:Profile
    {
        public MappingCategory()
        {
            CreateMap<CategoryDto,Category>().ReverseMap();
            CreateMap<ListingCategoryDto, Category>().ReverseMap();
            CreateMap<UpdateCategoryDto, Category>().ReverseMap();


        }
    }
}
