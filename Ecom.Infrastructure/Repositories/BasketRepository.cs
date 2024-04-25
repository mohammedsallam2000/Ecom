using AutoMapper;
using Ecom.Core.Dtos;
using Ecom.Core.Entities;
using Ecom.Core.Interfaces;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Ecom.Infrastructure.Repositories
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IDatabase _dataBase;

        public BasketRepository(IConnectionMultiplexer redis,IMapper mapper)
        {
            _dataBase = redis.GetDatabase();
            Mapper = mapper;
        }

        public IMapper Mapper { get; }

        public async Task<bool> DeleteBasketAsenc(string basketId)
        {
            //var check = await _dataBase.KeyExistsAsync(basketId);
            //if (check)
            //{
            //    return await _dataBase.KeyDeleteAsync(basketId);
            //}
            //return false; 
            return await _dataBase.KeyDeleteAsync(basketId);
        }

        public async Task<CustomerBasket> GetCustomerBasketAsenc(string basketId)
        {
            var data = await _dataBase.StringGetAsync(basketId);
            //if (!string.IsNullOrEmpty(data))
            //{
            //    return JsonSerializer.Deserialize<CustomerBasket>(data);
            //}
            //return null;

            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);
        }

        public async Task<CustomerBasket> UpdateBasketAsenc(CustomerBasket customerBasket)
        {
            var _basket = await _dataBase.StringSetAsync(customerBasket.Id, JsonSerializer.Serialize(customerBasket), TimeSpan.FromDays(30));
            if (!_basket)
            {
                return null;
            }
            return await GetCustomerBasketAsenc(customerBasket.Id);
        }
    }
}
