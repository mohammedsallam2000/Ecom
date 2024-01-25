using AutoMapper;
using Ecom.Core.Dtos;
using Ecom.Core.Entities;
using Ecom.Core.Interfaces;
using Ecom.Infrastructure.Data;
using Microsoft.Extensions.FileProviders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecom.Infrastructure.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        private readonly ApplicationDbContext context;
        private readonly IFileProvider fileProvider;
        private readonly IMapper mapper;

        public ProductRepository(ApplicationDbContext context,IFileProvider fileProvider,IMapper mapper) : base(context)
        {
            this.context = context;
            this.fileProvider = fileProvider;
            this.mapper = mapper;
        }

        public async Task<bool> AddAsync(CreateProductDto dto)
        {
            if (dto.Image is not null)
            {
                var root = "/Images/Products";
                var productImage = $"{Guid.NewGuid()}"+dto.Image.FileName;
                if (!Directory.Exists("wwwroot" + root))
                {
                    Directory.CreateDirectory("wwwroot"+root);
                }
                var src = root + productImage;
                var picInfo = fileProvider.GetFileInfo(src);
                var rootPath = picInfo.PhysicalPath;
                using (var fileStream = new FileStream(rootPath,FileMode.Create))
                {
                    await dto.Image.CopyToAsync(fileStream);
                }

                // Create New Product
                var res = mapper.Map<Product>(dto);
                res.ProductPicture = src;
                await context.Products.AddAsync(res);
                await context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
