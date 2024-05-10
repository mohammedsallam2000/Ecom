using Ecom.Core.Entities;
using Ecom.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecom.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentServices paymentServices;

        public PaymentsController(IPaymentServices paymentServices)
        {
            this.paymentServices = paymentServices;
        }

        [HttpPost("{basketId}")]

        public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            return await paymentServices.CreateOrUpdatePayment(basketId);
        } 
    }
}
