using AutoMapper;
using Ecom.API.Error;
using Ecom.Core.Dtos;
using Ecom.Core.Entities;
using Ecom.Core.Entities.Orders;
using Ecom.Core.Interfaces;
using Ecom.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Ecom.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
     [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly IUnitOfWork uOW;
        private readonly IOrderServices orderServices;
        private readonly IMapper mapper;

        public OrdersController(IUnitOfWork UOW,IOrderServices orderServices,IMapper mapper)
        {
            uOW = UOW;
            this.orderServices = orderServices;
            this.mapper = mapper;
        }
        [HttpPost("create-order")]
        public async Task<IActionResult> CreateOrder(OrderDto orderDto)
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x=>x.Type == ClaimTypes.Email)?.Value;

            var address = mapper.Map<AddressDto,ShipAddress>(orderDto.ShipToAddress);

            var order = await orderServices.CreateOrderAsync(email,orderDto.DeliveryMethodId,orderDto.BasketId,address);

            if (order == null) { return BadRequest(new BaseCommonResponse(400, "Error While creating order")); }

            return Ok(order);
        }

        [HttpGet("get-orders-for-user")]
        public async Task<IActionResult> GetOrdersForUser()
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var order = await orderServices.GetOrdersForUserAsync(email);

            var result = mapper.Map<IReadOnlyList< Order>, IReadOnlyList<OrderToReturnDto>>(order);

            return Ok(result);
        }

        [HttpGet("get-order-by-id/{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var order = await orderServices.GetOrderByIdAsync(id,email);
            if(order is null) { return NotFound(new BaseCommonResponse(404)); }
            var result = mapper.Map<Order, OrderToReturnDto>(order);

            return Ok(result);
        }

        [HttpGet("get-delivery-methods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMothods()
        {
            return Ok( await orderServices.GetDeliveryMethodAsync());
        }
    }
}
