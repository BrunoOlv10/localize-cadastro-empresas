using System.Net.Http;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;
using CompanyRegistration.Data;
using CompanyRegistration.DTOs;
using CompanyRegistration.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace CompanyRegistration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CompaniesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHttpClientFactory _httpClientFactory;

        public CompaniesController(AppDbContext context, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _httpClientFactory = httpClientFactory;
        }

        [HttpPost("register")]
        public async Task<IActionResult> AddCompany([FromBody] string cnpj)
        {
            if (string.IsNullOrWhiteSpace(cnpj))
                return BadRequest("CNPJ é obrigatório");

            var cnpjValid = new string(cnpj.Where(char.IsDigit).ToArray());
            if (cnpjValid.Length != 14)
                return BadRequest("CNPJ inválido. Deve conter exatamente 14 números");

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            bool cnpjLinked = await _context.Companies.AnyAsync(c => c.Cnpj == cnpjValid && c.UserId == userId);
            if (cnpjLinked)
                return BadRequest("Este CNPJ já está vinculado ao seu usuário");

            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync($"https://www.receitaws.com.br/v1/cnpj/{cnpjValid}");
            if (!response.IsSuccessStatusCode)
                return BadRequest("CNPJ inválido ou API indisponível");

            var json = await response.Content.ReadAsStringAsync();

            var cnpjResponse = JsonSerializer.Deserialize<CnpjResponseDto>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            if (cnpjResponse == null)
                return BadRequest("Não foi possível obter dados do CNPJ");

            var company = new Company
            {
                UserId = userId,
                NomeEmpresarial = cnpjResponse.Nome ?? "",
                NomeFantasia = cnpjResponse.Fantasia ?? "",
                Cnpj = cnpjValid,
                Situacao = cnpjResponse.Situacao ?? "",
                Abertura = DateTime.TryParse(cnpjResponse.Abertura, out var dt) ? dt : DateTime.MinValue,
                Tipo = cnpjResponse.Tipo ?? "",
                NaturezaJuridica = cnpjResponse.NaturezaJuridica ?? "",
                AtividadePrincipal = cnpjResponse.AtividadePrincipal?.FirstOrDefault()?.Text ?? "",
                Logradouro = cnpjResponse.Logradouro ?? "",
                Numero = cnpjResponse.Numero ?? "",
                Complemento = cnpjResponse.Complemento ?? "",
                Bairro = cnpjResponse.Bairro ?? "",
                Municipio = cnpjResponse.Municipio ?? "",
                Uf = cnpjResponse.Uf ?? "",
                Cep = new string((cnpjResponse.Cep ?? "").Where(char.IsDigit).ToArray()),
            };

            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            return Ok(company);
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetCompanies()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            var companies = await _context.Companies
                .Where(c => c.UserId == userId)
                .ToListAsync();

            if (companies == null)
                return NotFound("Nenhuma empresa encontrada");

            var response = companies.Select(c => new CompanyResponseDto
            {
                Nome = c.NomeEmpresarial,
                Fantasia = c.NomeFantasia,
                Cnpj = $"{Convert.ToUInt64(c.Cnpj):00\\.000\\.000\\/0000\\-00}",
                Situacao = c.Situacao,
                Abertura = c.Abertura == DateTime.MinValue ? null : c.Abertura.ToString("dd/MM/yyyy"),
                Tipo = c.Tipo,
                NaturezaJuridica = c.NaturezaJuridica,
                AtividadePrincipal = c.AtividadePrincipal,
                Logradouro = c.Logradouro,
                Numero = c.Numero,
                Complemento = c.Complemento,
                Bairro = c.Bairro,
                Municipio = c.Municipio,
                Uf = c.Uf,
                Cep = !string.IsNullOrEmpty(c.Cep) && c.Cep.Length == 8 ? $"{c.Cep.Substring(0,5)}-{c.Cep.Substring(5, 3)}" : null
            });

            return Ok(response);
        }
    }
}
