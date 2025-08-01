using CompanyRegistration.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using CompanyRegistration.DTOs;
using CompanyRegistration.Models;
using System.Linq.Dynamic.Core;

namespace CompanyRegistration.Services
{
    public class CompanyService
    {
        private readonly AppDbContext _context;
        private readonly IHttpClientFactory _httpClientFactory;

        public CompanyService(AppDbContext context, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _httpClientFactory = httpClientFactory;
        }

        public async Task<Company> AddCompanyAsync(string cnpj, int userId)
        {
            if (string.IsNullOrWhiteSpace(cnpj))
                throw new ArgumentException("CNPJ é obrigatório");

            var cnpjValid = new string(cnpj.Where(char.IsDigit).ToArray());
            if (cnpjValid.Length != 14)
                throw new ArgumentException("CNPJ inválido, deve conter exatamente 14 números");

            bool cnpjLinked = await _context.Companies.AnyAsync(c => c.Cnpj == cnpjValid && c.UserId == userId);
            if (cnpjLinked)
                throw new ArgumentException("Este CNPJ já está vinculado ao seu usuário");

            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync($"https://www.receitaws.com.br/v1/cnpj/{cnpjValid}");

            if (!response.IsSuccessStatusCode)
                throw new ArgumentException("API indisponível");

            var json = await response.Content.ReadAsStringAsync();

            var statusResponse = JsonSerializer.Deserialize<CnpjStatusDto>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            if (statusResponse?.Status?.ToUpper() == "ERROR")
                throw new ArgumentException("CNPJ não encontrado");

            var cnpjResponse = JsonSerializer.Deserialize<CnpjResponseDto>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            if (cnpjResponse == null)
                throw new ArgumentException("Não foi possível obter dados do CNPJ");

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

            return company;
        }

        public async Task<object> GetCompaniesAsync(int page, int pageSize, string sortBy, string sortDirection, int userId)
        {
            if (page <= 0 || pageSize <= 0)
                throw new ArgumentException("Página e tamanho da página devem ser maiores que zero");

            var allowedSortFields = new[]
            {
                "NomeEmpresarial", "NomeFantasia", "Cnpj", "Abertura", "NaturezaJuridica", "AtividadePrincipal", "Municipio", "Uf"
            };
            if (!allowedSortFields.Contains(sortBy))
                throw new ArgumentException($"Campo de ordenação inválido. Campos permitidos: {string.Join(", ", allowedSortFields)}");

            sortDirection = sortDirection.ToLower() == "desc" ? "desc" : "asc";

            var query = _context.Companies.Where(c => c.UserId == userId);

            var totalCount = await query.CountAsync();

            if (totalCount == 0)
                throw new ArgumentException("Nenhuma empresa encontrada");

            var companies = await query
               .OrderBy($"{sortBy} {sortDirection}")
               .Skip((page - 1) * pageSize)
               .Take(pageSize)
               .ToListAsync();

            if (!companies.Any())
                throw new ArgumentException("Nenhuma empresa encontrada nessa página");

            var result = companies.Select(c => new CompanyResponseDto
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
                Cep = !string.IsNullOrEmpty(c.Cep) && c.Cep.Length == 8 ? $"{c.Cep.Substring(0, 5)}-{c.Cep.Substring(5, 3)}" : null
            });

            var response = new
            {
                TotalResults = totalCount,
                totalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
                Page = page,
                PageSize = pageSize,
                SortBy = sortBy,
                SortDirection = sortDirection,
                Data = result
            };

            return response;
        }
    }
}
