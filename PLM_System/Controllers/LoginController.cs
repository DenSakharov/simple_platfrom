using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using PLM_System.Services;
using Newtonsoft.Json.Linq;
using Swashbuckle.AspNetCore.Annotations;
using Swashbuckle.Examples;

namespace PLM_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IAuthService _authService;

        public LoginController(IAuthService authService)
        {
            _authService = authService;
        }
        [AllowAnonymous]
        [HttpPost("register")]
        [SwaggerResponse(200, "Success")]
        [SwaggerOperation("Register")]
        [SwaggerOperationFilter(typeof(ExamplesOperationFilter))]
        /// https://localhost:5001/api/login/register?Email=test@test.ru&Password=yourpasswordA
        public async Task<IActionResult> Register(//[FromQuery] RegisterRequest model, 
            [FromBody] RegistrationData registrationData)
        {
            try
            {
                if (registrationData == null)
                {
                    return BadRequest("Invalid JSON format");
                }

                var newMan = new RegisterInfoFromBody
                {
                    /*
                    age = (int)jsonObject["ageBody"],
                    name = (string)jsonObject["nameBody"],
                    surname = (string)jsonObject["surnameBody"],
                    login = (string)jsonObject["loginBody"],
                    position = (string)jsonObject["positionBody"],
                    email = (string)jsonObject["Email"],
                    password = (string)jsonObject["Password"],
                    */
                   name= registrationData.Name,
                    email=registrationData.Email,
                   password= registrationData.Password,
                    position=registrationData.Position,
                    surname=registrationData.Surname,
                    login=registrationData.Login,
                    age=registrationData.Age,
                };
                var token = await _authService.RegisterAsync(//model,
                    newMan);

                if (token == null)
                {
                    return BadRequest("Не удалось зарегистрировать пользователя");
                }

                return Ok(new { Token = token });
            }
            catch(Exception ex) 
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        ///Аутентификация https://localhost:5001/api/login/authenticate?Email=test@test.ru&Password=yourpasswordA
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("authenticate")]
        public async Task<IActionResult> Authenticate([FromQuery] LoginRequest model)
        {
            var token = await _authService.AuthenticateAsync(model);

            if (token == null)
            {
                return Unauthorized();
            }

            return Ok(token);
        }
        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            // Выход пользователя
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok(new { Message = "Logout successful" });
        }
    }
    public class RegisterRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        // Добавьте дополнительные поля по необходимости
    }
    public class RegistrationData
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Login { get; set; }
        public int Age { get; set; }
        public string Position { get; set; }
    }

    public class RegisterInfoFromBody
    {
        public int age { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string login { get; set; }
        public string position { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }
}
