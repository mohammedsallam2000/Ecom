using Ecom.Core.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecom.Infrastructure.Data.Config
{
    public class IdentitySeed
    {
        public static async Task SeedUserAsync (UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                // Create new user
                var user = new AppUser
                {
                    DisplayName = "Mohammed Sallam",
                    Email = "mohammedsallam812@gmail.com",
                    UserName = "mohammedsallam812@gmail.com",
                    Address = new Address { 
                       FirstName="Mohammed",
                       LastName = "Sallam",
                       City="Monofia",
                       State="Qyuesna",
                       Street="Street",
                       ZipCode = "1234"
                    }
                };

                await userManager.CreateAsync (user,"M123!");
            }
        }
    }
}
