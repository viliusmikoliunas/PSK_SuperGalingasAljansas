using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Eshop.DataContracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;


namespace Eshop
{
    internal static class JWTtoken
    {
        internal static object Generate(IConfiguration configuration, string username, IdentityUser user, UserRoles role = UserRoles.User)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Role, role.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(configuration["JwtExpireDays"]));

            var token = new JwtSecurityToken(
                configuration["JwtIssuer"],
                null,
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static string GetTokenInfo(HttpRequest request, String type)
        {
            StringValues token = "";
            var userId = request.Headers.TryGetValue("Authorization", out token);
            if (userId == false) return null;

            var jwtEncodedString = token.ToString().Substring(7);

            var token_ = new JwtSecurityToken(jwtEncodedString: jwtEncodedString);
            var accName = token_.Claims.First(c => c.Type == type).Value;

            return accName;
        }
    }
}
