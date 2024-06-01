using Ecom.API.Error;
using Ecom.Core.Entities;
using Ecom.Core.Entities.Orders;
using Ecom.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace Ecom.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentServices paymentServices;
        private readonly ILogger<PaymentsController> logger;

        // This is your Stripe CLI webhook secret for testing your endpoint locally.
        private const string endpointSecret = "whsec_c17b81cad6fe1fa1b04a1192d9ecb7ebe3e9e05e18a63cba2420a38e451c6a8a";

        public PaymentsController(IPaymentServices paymentServices,ILogger<PaymentsController> logger)
        {
            this.paymentServices = paymentServices;
            this.logger = logger;
        }

        [HttpPost("{basketId}")]

        public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            var basket =  await paymentServices.CreateOrUpdatePayment(basketId);

            if (basket is null)
            {
                return BadRequest(new BaseCommonResponse(400, "Problem with payment"));
            }

            return basket;
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> StripeWebHook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            try
            {
                var stripeEvent = EventUtility.ConstructEvent(json,
                    Request.Headers["Stripe-Signature"], endpointSecret);


                // Handle the event
                PaymentIntent intent;
                Order order;


                switch (stripeEvent.Type)
                {
                    case Events.PaymentIntentPaymentFailed:
                        intent = (PaymentIntent)stripeEvent.Data.Object;
                        logger.LogInformation("Payment Sussess",intent.Id);
                        order = await paymentServices.UpdateOrderPaymentFailed(intent.Id);
                        logger.LogInformation("Updated order status Sussessfully", order.Id);
                        break;
                    case Events.PaymentIntentSucceeded:
                        intent = (PaymentIntent)stripeEvent.Data.Object;
                        logger.LogInformation("Payment Failed", intent.Id);
                        order =  await paymentServices.UpdateOrderPaymentSucceeded(intent.Id);
                        logger.LogInformation("Updated order status Sussessfully", order.Id);

                        break;
                }
                return Ok();
            }
            catch (StripeException e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
