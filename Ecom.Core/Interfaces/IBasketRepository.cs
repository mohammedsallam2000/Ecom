using Ecom.Core.Dtos;
using Ecom.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecom.Core.Interfaces
{
    public interface IBasketRepository
    {
        Task<CustomerBasket> GetCustomerBasketAsenc(string basketId);
        Task<CustomerBasket> UpdateBasketAsenc(CustomerBasket customerBasket);
        Task<bool> DeleteBasketAsenc(string basketId);
    }
}
