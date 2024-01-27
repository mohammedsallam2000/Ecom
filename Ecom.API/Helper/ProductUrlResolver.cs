using AutoMapper;
using AutoMapper.Execution;
using Ecom.Core.Dtos;
using Ecom.Core.Entities;
using Microsoft.IdentityModel.Tokens;

namespace Ecom.API.Helper
{
    public class ProductUrlResolver : IValueResolver<Product, ProductDto, string>
    {
        private readonly IConfiguration config;

        // To Can Access AppSettings
        public ProductUrlResolver(IConfiguration config)
        {
            this.config = config;
        }
        public string Resolve(Product source, ProductDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.ProductPicture))
            {
                return config["ApiUrl"] + source.ProductPicture;
            }
            return null;
        }
    }
}
