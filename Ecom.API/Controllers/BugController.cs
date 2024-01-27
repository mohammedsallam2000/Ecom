using Ecom.API.Error;
using Ecom.Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecom.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BugController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public BugController(ApplicationDbContext context)
        {
            this.context = context;
        }
        [HttpGet("NotFound")]
        public ActionResult GetNotFound()
        {
            var product = context.Products.Find(50);
            if (product is null)
            {
                return NotFound(new BaseCommonResponse(404));
            }
            return Ok(product);
        }


        [HttpGet("Server-Error")]
        public ActionResult ServerError()
        {
            var product = context.Products.Find(50);
            product.Name = "";
            return Ok();
        }

        [HttpGet("Bad-Request/{id}")]
        public ActionResult GetBadRequest(int id)
        {
            return Ok();
        }

        [HttpGet("Bad-Request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new BaseCommonResponse(400));
        }
    }
}
