using Ecom.Core.Entities;
using Ecom.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecom.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly IUnitOfWork uOK;

        public BasketController(IUnitOfWork UOK)
        {
            uOK = UOK;
        }

        [HttpGet("Get-basket-item/{Id}")]
        public async Task<IActionResult> GetBasketById( string Id)
        {
            var _basket = await uOK.BasketRepository.GetCustomerBasketAsenc(Id);
            return Ok(_basket ?? new CustomerBasket(Id));
        }

        [HttpPost("Update-basket")]
        public async Task<IActionResult> UpdateBasket(CustomerBasket customerBasket)
        {
            var _basket = await uOK.BasketRepository.UpdateBasketAsenc(customerBasket);
            return Ok(_basket);
        }

        [HttpDelete("Delete-basket-item/{Id}")]
        public async Task<IActionResult> DeleteBasket(string Id)
        {
            var _basket = await uOK.BasketRepository.DeleteBasketAsenc(Id);
            return Ok(_basket);
        }
    }
}
