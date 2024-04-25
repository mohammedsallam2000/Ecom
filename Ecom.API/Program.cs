
using Ecom.API.Error;
using Ecom.API.Extensions;
using Ecom.API.MiddleWare;
using Ecom.Core.Interfaces;
using Ecom.Infrastructure;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;
using StackExchange.Redis;
using System.Reflection;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApiRegistration();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(s =>
{
    // Swagger Authorization
    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "JWT Auth Bearer",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Reference = new OpenApiReference
        {
            Id = "Bearer",
            Type =ReferenceType.SecurityScheme
        }
    };
    s.AddSecurityDefinition("Bearer", securityScheme);
    var SecurityRequirement = new OpenApiSecurityRequirement
    {
        {securityScheme,new[]{"Bearer"} }
    };
    s.AddSecurityRequirement(SecurityRequirement);
});
builder.Services.InfrastructureConfigration(builder.Configuration);


// Configure Redis
builder.Services.AddSingleton<IConnectionMultiplexer>(i =>
{
    var configure = ConfigurationOptions.Parse(builder.Configuration.GetConnectionString("Redis"), true);
    return ConnectionMultiplexer.Connect(configure);
});





var app = builder.Build(); 

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseMiddleware<ExceptionMiddleWare>();
app.UseStatusCodePagesWithReExecute("/errors/{0}");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCors("CorsPolisy");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
InfrastructureRegisteration.InfrastructureConfigMiddleWare(app);
app.Run();
