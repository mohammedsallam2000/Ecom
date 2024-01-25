using AutoMapper;
using Ecom.API.Dtos;
using Ecom.Core.Entities;
using Ecom.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecom.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly IUnitOfWork _uOW;
        private readonly IMapper mapper;

        public CategoriesController(IUnitOfWork uOW,IMapper mapper)
        {
            this._uOW = uOW;
            this.mapper = mapper;
        }
        [HttpGet("Get-All-Categories")]
        public async Task<IActionResult> Get()
        {
            var allCategory = await _uOW.CategoryRepository.GetAllAsync();
          
            if (allCategory is not null)
            {
                var res = mapper.Map<IReadOnlyList<Category>,IReadOnlyList<ListingCategoryDto> >(allCategory);
                 
                //var res = allCategory.Select(x => new CategoryDto
                //{
                //    Name = x.Name,
                //    Description = x.Description
                //}).ToList();
                return Ok(res);
            }
            return BadRequest("No Data");
        }

        [HttpGet("Get-Categorie-by-id/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var Category = await _uOW.CategoryRepository.GetAsync(id);
            if (Category is not null)
            {
                //var model = new ListingCategoryDto
                //{
                //    Id = Category.Id,
                //    Name = Category.Name,
                //    Description = Category.Description
                //};
                return Ok(mapper.Map<Category, ListingCategoryDto>(Category));
            }
            return BadRequest("No Data");
        }

        [HttpPost("Add-new-Categories")]
        public async Task<IActionResult> Post (CategoryDto model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var category = new Category();
                    category.Name = model.Name;
                    category.Description = model.Description;
                    await _uOW.CategoryRepository.AddAsync(category);
                    return Ok(model);
                }
                else
                {
                    return BadRequest(model);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Update-exiting-Category-by-id/{id}")]
        public async Task<IActionResult> Put (int id,CategoryDto model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var exitingCategory = await _uOW.CategoryRepository.GetAsync(id);
                    if (exitingCategory is not null)
                    {
                        //Updating
                        exitingCategory.Name = model.Name;
                        exitingCategory.Description = model.Description;
                        await _uOW.CategoryRepository.UpdateAsync(id, exitingCategory);
                        return Ok(model);
                    }
                }
                return BadRequest($"Category Not Found, Id [{id}] incorrect");
            }
            catch (Exception ex )
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("Delete-Category-by-id/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var Category = await _uOW.CategoryRepository.GetAsync(id);
                if (Category is not null)
                {
                    await _uOW.CategoryRepository.DeleteAsync(id);
                    return Ok($"This Category {Category.Name} is Deleted Successfully");
                }
                return BadRequest($"Category Not Found, Id [{id}] incorrect");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
