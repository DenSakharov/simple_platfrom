using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using PLM_System.Services;

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
        [HttpGet("register")]
        /// https://localhost:5001/api/login/register?Email=test@test.ru&Password=yourpasswordA
        public async Task<IActionResult> Register([FromQuery] RegisterRequest model)
        {
            var token = await _authService.RegisterAsync(model);

            if (token == null)
            {
                return BadRequest("Не удалось зарегистрировать пользователя");
            }

            return Ok(new { Token = token });
        }

        /// <summary>
        /// https://localhost:5001/api/login/authenticate?Email=test@test.ru&Password=yourpasswordA
        /// </summary>
        /// <param name="model"></param>
        /// Аутентификация
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

            return Ok(new { Token = token });
        }

        [Authorize]
        [HttpGet("userinfo")]
        public IActionResult GetUserInfo()
        {
            // Получение информации о текущем пользователе
            var username = User.FindFirst(ClaimTypes.Name)?.Value;
            var roles = User.FindAll(ClaimTypes.Role)?.Select(c => c.Value);

            return Ok(new { Username = username, Roles = roles });
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
}
