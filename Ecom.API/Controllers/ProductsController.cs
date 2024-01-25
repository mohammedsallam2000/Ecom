using AutoMapper;
using Ecom.Core.Dtos;
using Ecom.Core.Entities;
using Ecom.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecom.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IUnitOfWork uOW;
        private readonly IMapper mapper;

        public ProductsController(IUnitOfWork uOW, IMapper mapper)
        {
            this.uOW = uOW;
            this.mapper = mapper;
        }

        [HttpGet("Get-all-Products")] 
        public async Task<ActionResult> Get()
        {
           var res = await uOW.ProductRepository.GetAllAsync(x=>x.Category);
            var result = mapper.Map<List<ProductDto>>(res);
            if (result == null)
            {
                return BadRequest("No Data");
            }
            return Ok(result);
        }

        [HttpGet("Get-Product-by-id/{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var res = await uOW.ProductRepository.GetByIdAsync(id,x=>x.Category);
            var result = mapper.Map<ProductDto>(res);
            if (result == null)
            {
                return BadRequest("No Data");
            }
            return Ok(result);
        }


        [HttpPost("Add-new-Product")]
        public async Task<ActionResult> Post(CreateProductDto model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //var res = mapper.Map<Product>(model);
                   var res = await uOW.ProductRepository.AddAsync(model);
                    return res?Ok(res):BadRequest(model);
                }
                return BadRequest(model);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    } 
}
