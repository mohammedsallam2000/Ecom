﻿using Ecom.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecom.Infrastructure.Data.Config
{
    public class CategoryConfigration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x => x.Name).HasMaxLength(30);

            //Seeding
            builder.HasData(
                new Category { Id = 1, Name = "Category 1", Description = "One" },
                new Category { Id = 2, Name = "Category 2", Description = "Two" },
                new Category { Id = 3, Name = "Category 3", Description = "Three" }
                );
        }
    }
}
