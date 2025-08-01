using CompanyRegistration.DTOs;
using CompanyRegistration.Services;
using Microsoft.AspNetCore.Mvc;

namespace CompanyRegistration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto dto)
        {
            if (await _authService.IsEmailRegistered(dto.Email))
                return BadRequest("Email já cadastrado");

            var user = await _authService.RegisterAsync(dto);

            return Ok(new { message = "Usuário registrado com sucesso" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto dto)
        {
            try
            {
                var token = await _authService.LoginAsync(dto);
                return Ok(new { token });
            }
            catch (ArgumentException ex)
            {
                return Unauthorized(ex.Message);
            }
        }
    }
}
