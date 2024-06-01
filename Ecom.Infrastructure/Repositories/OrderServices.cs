using Ecom.Core.Entities.Orders;
using Ecom.Core.Interfaces;
using Ecom.Core.Services;
using Ecom.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecom.Infrastructure.Repositories
{
    public class OrderServices : IOrderServices
    {
        private readonly IUnitOfWork uOW;
        private readonly ApplicationDbContext context;
        private readonly IPaymentServices paymentServices;

        public OrderServices(IUnitOfWork UOW, ApplicationDbContext context,IPaymentServices paymentServices)
        {
            uOW = UOW;
            this.context = context;
            this.paymentServices = paymentServices;
        }
        public async Task<Order> CreateOrderAsync(string buyerEmail, int delivryMethodId, string basketId, ShipAddress shipAddress)
        {
            //Get basket item
            var basket = await uOW.BasketRepository.GetCustomerBasketAsenc(basketId);
            var items = new List<OrderItem>();

            // Fill Items
            foreach(var item in basket.BasketItems)
            {
                var productItem = await uOW.ProductRepository.GetByIdAsync(item.Id);
                var productItemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.ProductPicture);
                var orderItem = new OrderItem(productItemOrdered, item.Price, item.Quantity);
                lock (items)
                {
                    items.Add(orderItem);
                }
            };

            //Parallel.ForEach(basket.BasketItems, item =>
            //{
            //    var productItem = uOW.ProductRepository.GetByIdAsync(item.Id).GetAwaiter().GetResult();
            //    var productItemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.ProductPicture);
            //    var orderItem = new OrderItem(productItemOrdered, item.Price, item.Quantity);
            //    lock (items)
            //    {
            //        items.Add(orderItem);
            //    }
            //});


            await context.OrderItems.AddRangeAsync(items);
            await context.SaveChangesAsync();
           

            // get deliveryMethod
            var deliveryMethod = await context.DeliveryMethods.Where(x => x.Id == delivryMethodId).FirstOrDefaultAsync();

            // caluclate subTotal
            var subTotal = items.Sum(x => x.Price * x.Quantity);


            //check if order exists
            var exitingOrder = await context.Orders.Where(x=>x.PaymentIntentId == basket.PaymentIntentId).FirstOrDefaultAsync();

            if (exitingOrder is not null)
            {
                 context.Orders.Remove(exitingOrder);
                await paymentServices.CreateOrUpdatePayment(basket.PaymentIntentId);
            }

            // initialization on ctor
            var order = new Order(buyerEmail, shipAddress, deliveryMethod, items, subTotal,basket.PaymentIntentId);

            //check order is not null
            if(order is null) return null;

            //adding order in db
            await context.Orders.AddAsync(order);
            await context.SaveChangesAsync();

            //Remove Basket
            //await uOW.BasketRepository.DeleteBasketAsenc(basketId);

            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodAsync()
        => await context.DeliveryMethods.ToListAsync();

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var order = await context.Orders          
                .Where(x => x.Id == id && x.BuyerEmail ==  buyerEmail)
                .Include(x => x.OrderItem).ThenInclude(x=>x.ProductItemOrdered)
                .Include(x => x.DeliveryMethod)
                .OrderByDescending(x=>x.OrderDate)
                .FirstOrDefaultAsync();

            return order;
                
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var order = await context.Orders
               .Where(x=>x.BuyerEmail == buyerEmail)
               .Include(x => x.OrderItem).ThenInclude(x => x.ProductItemOrdered)
               .Include(x => x.DeliveryMethod)
               .OrderByDescending(x => x.OrderDate)
               .ToListAsync();

            return order;

        }
    }
}
