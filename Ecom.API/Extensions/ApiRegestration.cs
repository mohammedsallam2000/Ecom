using Ecom.API.Error;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using System.Reflection;

namespace Ecom.API.Extensions
{
    public static class ApiRegestration
    {
        public static IServiceCollection AddApiRegistration (this IServiceCollection services)
        {
            // Configer AutoMapper
            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            // Configer IFileProvider
            services.AddSingleton<IFileProvider>(new PhysicalFileProvider(
                Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")));
            services.Configure<ApiBehaviorOptions>(options =>
            {
                        
                options.InvalidModelStateResponseFactory = context =>
                {
                    var errorResponse = new ApiValidationErrorResopnse
                    {
                        Errors = context.ModelState.Where(x => x.Value.Errors.Count > 0)
                        .SelectMany(x => x.Value.Errors)
                        .Select(x => x.ErrorMessage).ToArray()
                    };
                    return new BadRequestObjectResult(errorResponse);
                };
            });
            return services;
        }
    }
}
