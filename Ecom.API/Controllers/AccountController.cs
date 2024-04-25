using AutoMapper;
using Ecom.API.Error;
using Ecom.API.Extensions;
using Ecom.Core.Dtos;
using Ecom.Core.Entities;
using Ecom.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Ecom.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly ITokenServices tokenServices;
        private readonly IMapper mapper;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenServices tokenServices,IMapper mapper)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenServices = tokenServices;
            this.mapper = mapper;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await userManager.FindByEmailAsync(dto.Email);
            if (user is null) return Unauthorized(new BaseCommonResponse(401));

            var result = await signInManager.CheckPasswordSignInAsync(user, dto.Password, false);
            if (result is null || result.Succeeded == false) return Unauthorized(new BaseCommonResponse(401));


            return Ok(new UserDto
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                Token = tokenServices.CreateToken(user)

            });

        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            if (CheckEmailExist(dto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResopnse
                {
                    Errors = new[]
                {
                    "this email already token"
                }
                });
            }
            var user = new AppUser
            {
                Email = dto.Email,
                UserName = dto.Email,
                DisplayName = dto.DisplayName
            };
            var result = await userManager.CreateAsync(user, dto.Password);
            if (result.Succeeded == false)
                return BadRequest(new BaseCommonResponse(400));
            return Ok(new UserDto
            {
                DisplayName = dto.DisplayName,
                Email = dto.Email,
                Token = tokenServices.CreateToken(user)
            });

        }

        [Authorize]
        [HttpGet("test")]
        public ActionResult<string> test()
        {
            return "Hello";
        }

        [Authorize]
        [HttpGet("get-current-user")]
        public async Task<IActionResult> GetCurrentUser()
        {
            //var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            //var user = await userManager.FindByEmailAsync(email);
            var user = await userManager.FindEmailByClaimPrincipal(HttpContext.User);

            return Ok(new UserDto
            {
                DisplayName = user.DisplayName,
                Email = user.Email,
                Token = tokenServices.CreateToken(user)
            });
        }

        [HttpGet("check-email-exist")]
        public async Task<ActionResult<bool>> CheckEmailExist([FromQuery] string email)
        {
            var result = await userManager.FindByEmailAsync(email);
            if (result is not null)
            {
                return true;
            }
            return false;
        }

        [Authorize]
        [HttpGet("get-user-address")]
        public async Task<IActionResult> GetUserAddress()
        {
            //var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            //var user = await userManager.Users.Include(x=>x.Address).SingleOrDefaultAsync(x=>x.Email == email);
            var user = await userManager.FindUserByClaimPrincipalWithAddress(HttpContext.User);

            var result = mapper.Map<Address,AddressDto>(user.Address);
            
            return Ok(result);
        }

        [Authorize]
        [HttpPut("update-user-address")]
        public async Task<IActionResult> UpdateUserAddress([FromBody]AddressDto dto)
        {
            var user = await userManager.FindUserByClaimPrincipalWithAddress(HttpContext.User);
            user.Address = mapper.Map<AddressDto,Address>(dto);
            var result = await userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return Ok(mapper.Map<Address, AddressDto>(user.Address));
            }
            else
            {
                return BadRequest($"Problem in updating this user {HttpContext.User}");
            }
        }
    }
}
