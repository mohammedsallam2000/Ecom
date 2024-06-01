using Ecom.Core.Entities;
using Ecom.Core.Interfaces;
using Ecom.Core.Services;
using Ecom.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecom.Infrastructure.Repositories
{
    public class PaymentServices : IPaymentServices
    {
        private readonly ApplicationDbContext applicationDbContext;
        private readonly IUnitOfWork unitOfWork;
        private readonly IConfiguration configuration;

        public PaymentServices(ApplicationDbContext applicationDbContext,IUnitOfWork unitOfWork,IConfiguration configuration)
        {
            this.applicationDbContext = applicationDbContext;
            this.unitOfWork = unitOfWork;
            this.configuration = configuration;
        }
        public async Task<CustomerBasket> CreateOrUpdatePayment(string basketId)
        {
            StripeConfiguration.ApiKey = configuration["StripeSettings:Secretkey"];

            var basket = await unitOfWork.BasketRepository.GetCustomerBasketAsenc(basketId);
            var shippingPrice = 0m;

            if (basket == null)
                return null;

            if(basket.DeliveryMethodId.HasValue)
            {
                var deliveryMethod = await applicationDbContext.DeliveryMethods.Where(x => x.Id == basket.DeliveryMethodId.Value).FirstOrDefaultAsync();
                shippingPrice = deliveryMethod.Price;
            }

            foreach (var item in basket.BasketItems)
            {
                var productItem = await unitOfWork.ProductRepository.GetByIdAsync(item.Id);
                if (item.Price != productItem.Price)
                {
                    item.Price = productItem.Price;
                }
            }

            var services = new PaymentIntentService();
            PaymentIntent intent;
            if (string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long)basket.BasketItems.Sum(x => x.Quantity * (x.Price * 100)) + (long)shippingPrice * 100,
                    Currency = "usd",
                    PaymentMethodTypes = new List<string>
                    {
                        "card"
                    }
                };
                intent = await services.CreateAsync(options);
                basket.PaymentIntentId = intent.Id;
                basket.ClientSecrete = intent.ClientSecret;

            }
            else
            {
                //update
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = (long)basket.BasketItems.Sum(x => x.Quantity * (x.Price * 100)) + (long)shippingPrice * 100

                };
                await services.UpdateAsync(basket.PaymentIntentId, options);
            }

            await unitOfWork.BasketRepository.UpdateBasketAsenc(basket);
            return basket;
        }
    }
}
