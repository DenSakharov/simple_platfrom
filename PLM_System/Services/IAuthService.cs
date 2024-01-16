using Microsoft.AspNetCore.Identity.Data;
using PLM_System.Controllers;

namespace PLM_System.Services
{
    public interface IAuthService
    {
        Task<string> AuthenticateAsync(LoginRequest model); 
        Task<string> RegisterAsync(//RegisterRequest model,
            RegisterInfoFromBody registerInfoFromBody);
    }
}
