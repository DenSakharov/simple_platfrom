﻿using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Models_Library.Models;
using PLM_System.Controllers;

namespace PLM_System.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<Person> _userManager;

        public AuthService(IConfiguration configuration, UserManager<Person> userManager)
        {
            _configuration = configuration;
            _userManager = userManager;
        }
        public async Task<string> RegisterAsync(//RegisterRequest model,
            RegisterInfoFromBody registerInfoFromBody)
        {
            var user = new Person
            {
                Id = Guid.NewGuid().ToString(),
                Email = registerInfoFromBody.login+"@test.ru",
                kit_of_access_to_areas=new List<string> { "area1"},
                Role = registerInfoFromBody.position,
                UserName = registerInfoFromBody.login,
                NormalizedUserName = registerInfoFromBody.surname +" "+registerInfoFromBody.name,
                // Добавьте другие свойства, которые вы хотите заполнить при регистрации
            };
            var result = await _userManager.CreateAsync(user,registerInfoFromBody.password);

            if (result.Succeeded)
            {
                // Если регистрация прошла успешно, генерируйте токен
                return GenerateJwtToken(user);
            }
            else
            {
                StringBuilder sb = new StringBuilder();
                // Выведите ошибки в лог или обработайте их соответственно
                foreach (var error in result.Errors)
                {
                    // Логируйте или обрабатывайте ошибки по своему усмотрению
                    Console.WriteLine($"Error: {error.Code}, Description: {error.Description}");
                    sb.AppendLine($"Error: {error.Code}, Description: {error.Description}");
                }
                return sb.ToString();
            }
        }
        public async Task<string> AuthenticateAsync(LoginRequest model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
            {
                // Пользователь не найден или пароль не совпадает
                return null;
            }

            return GenerateJwtToken(user);
        }

        private string GenerateJwtToken(Person user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpiresInMinutes"])),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

}
