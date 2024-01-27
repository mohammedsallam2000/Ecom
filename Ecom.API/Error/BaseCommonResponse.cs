
namespace Ecom.API.Error
{
    public class BaseCommonResponse
    {
        public BaseCommonResponse(int statusCode, string message=null)
        {
            StatusCode = statusCode;
            Message = message ?? DefaultMessageForStatusCode(statusCode);
        }

        private string DefaultMessageForStatusCode(int statusCode)
        => statusCode switch
            {
                400 => "Bad Request",
                401 => "Not Auth0rize",
                404 => "Recourse Not Found",
                500 => "Server Error",
                _ => null
            };
        //private string DefaultMessageForStatusCode2(int statusCode)
        //{
        //    // Old Syntax
        //   switch(statusCode)
        //    {
        //        case 400:
        //           return "Bad Request";
        //        case 401:
        //            return "Not Auth0rize";
        //        case 404:
        //            return "Recourse Not Found";
        //        case 500:
        //            return "Server Error";
        //        default:
        //            return null;

        //    }
        //}

        public int StatusCode { get; set; }
        public string Message { get; set; }
    }
}
