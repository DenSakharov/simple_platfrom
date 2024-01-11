using Microsoft.AspNetCore.Identity.Data;

namespace PLM_System.Services
{
    public interface IAuthService
    {
        Task<string> AuthenticateAsync(LoginRequest model); 
        Task<string> RegisterAsync(RegisterRequest model);
    }
}
