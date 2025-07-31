using CompanyRegistration.Data;
using CompanyRegistration.DTOs;
using CompanyRegistration.Helpers;
using CompanyRegistration.Models;
using Microsoft.EntityFrameworkCore;

namespace CompanyRegistration.Services
{
    public class AuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<bool> IsEmailRegistered(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }

        public async Task<User> RegisterAsync(UserRegisterDto dto)
        {
            var user = new User
            {
                Nome = dto.Nome!,
                Email = dto.Email!,
                SenhaHash = BCrypt.Net.BCrypt.HashPassword(dto.Senha)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<string> LoginAsync(UserLoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Senha, user.SenhaHash))
                throw new ArgumentException("Email ou senha incorretos");

            var token = JwtTokenHelper.GenerateToken(user, _configuration["Jwt:Key"]!);

            return token;
        }
    }
}
