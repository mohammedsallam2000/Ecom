using Ecom.API.Error;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecom.API.Controllers
{
    [Route("errors/{statusCode}")]
    [ApiController]
    [ApiExplorerSettings (IgnoreApi = true)]
    public class ErrorController : ControllerBase
    {
        //[HttpGet("Error")]
        public ActionResult Error (int statusCode)
        {
            return new ObjectResult(new BaseCommonResponse(statusCode));
        }
    }
}
