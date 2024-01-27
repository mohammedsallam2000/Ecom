namespace Ecom.API.Error
{
    public class ApiValidationErrorResopnse : BaseCommonResponse
    {
        public ApiValidationErrorResopnse() : base(400)
        {
        }
        public IEnumerable<string> Errors { get; set; }
    }
}
