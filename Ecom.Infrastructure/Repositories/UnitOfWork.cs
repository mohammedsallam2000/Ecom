using AutoMapper;
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
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private readonly IFileProvider fileProvider;
        private readonly IMapper mapper;

        public ICategoryRepository CategoryRepository { get; }

        public IProductRepository ProductRepository { get; }

        public UnitOfWork(ApplicationDbContext context, IFileProvider fileProvider, IMapper mapper)
        {
            this._context = context;
            this.fileProvider = fileProvider;
            this.mapper = mapper;
            CategoryRepository = new CategoryRepository(_context);
            ProductRepository = new ProductRepository(_context,fileProvider,mapper); 
        }
    }
}
