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

        public ProductRepository(ApplicationDbContext context, IFileProvider fileProvider, IMapper mapper) : base(context)
        {
            this.context = context;
            this.fileProvider = fileProvider;
            this.mapper = mapper;
        }

        public async Task<bool> AddAsync(CreateProductDto dto)
        {
            var src = "";
            if (dto.Image is not null)
            {
                var root = "/Images/Products/";
                var productImage = $"{Guid.NewGuid()}" + dto.Image.FileName;
                if (!Directory.Exists("wwwroot" + root))
                {
                    Directory.CreateDirectory("wwwroot" + root);
                }
                src = root + productImage;
                var picInfo = fileProvider.GetFileInfo(src);
                var rootPath = picInfo.PhysicalPath;
                using (var fileStream = new FileStream(rootPath, FileMode.Create))
                {
                    await dto.Image.CopyToAsync(fileStream);
                }
            }
            // Create New Product
            var res = mapper.Map<Product>(dto);
            res.ProductPicture = src;
            await context.Products.AddAsync(res);
            await context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateAsync(int id, UpdateProductDto dto)
        {
            var CurrentProduct = await context.Products.FindAsync(id);
            if (CurrentProduct != null)
            {
                var src = "";
                if (dto.Image is not null)
                {
                    var root = "/Images/Products/";
                    var productImage = $"{Guid.NewGuid()}" + dto.Image.FileName;
                    if (!Directory.Exists("wwwroot" + root))
                    {
                        Directory.CreateDirectory("wwwroot" + root);
                    }
                    src = root + productImage;
                    var picInfo = fileProvider.GetFileInfo(src);
                    var rootPath = picInfo.PhysicalPath;
                    using (var fileStream = new FileStream(rootPath, FileMode.Create))
                    {
                        await dto.Image.CopyToAsync(fileStream);
                    }
                }
                // Remove Old Picture
                if (!string.IsNullOrEmpty(CurrentProduct.ProductPicture))
                {
                    var PictureInfo = fileProvider.GetFileInfo(CurrentProduct.ProductPicture);
                    var rootPath = PictureInfo.PhysicalPath;
                    System.IO.File.Delete(rootPath);

                }

                // Update Product
                var res = mapper.Map<Product>(dto);
                res.ProductPicture = src;
                context.Products.Update(res);
                await context.SaveChangesAsync();



                return true;

            }
            return false;
        }

        public async Task<bool> DeleteAsyncWithPicture(int id)
        {
            var CurrentProduct = await context.Products.FindAsync(id);
            if (CurrentProduct is not null)
            {
                // Remove Old Picture
                if (!string.IsNullOrEmpty(CurrentProduct.ProductPicture))
                {
                    var PictureInfo = fileProvider.GetFileInfo(CurrentProduct.ProductPicture);
                    var rootPath = PictureInfo.PhysicalPath;
                    System.IO.File.Delete(rootPath);

                }
                //Remove
                context.Products.Remove(CurrentProduct);
                await context.SaveChangesAsync();
                return true;
            }
            return true;
        }
    }
}
