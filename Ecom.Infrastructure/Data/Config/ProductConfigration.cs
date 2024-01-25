using Ecom.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecom.Infrastructure.Data.Config
{
    public class ProductConfigration : IEntityTypeConfiguration<Product>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Product> builder)
        {
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x => x.Name).HasMaxLength(50);
            builder.Property(x => x.Price).HasColumnType("decimal (18,2)");

            //Seeding
            builder.HasData(
                new Product { Id = 1, Name = "Product 1", Price = 200,CategoryId = 1,ProductPicture="https://" },
                new Product { Id = 2, Name = "Product 2", Price = 300, CategoryId = 2, ProductPicture = "https://" },
                new Product { Id = 3, Name = "Product 3", Price = 500, CategoryId = 1, ProductPicture = "https://" }
                );
        }
    }
}
