using CompanyRegistration.DTOs;
using CompanyRegistration.Extensions;
using CompanyRegistration.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CompanyRegistration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CompanyController : ControllerBase
    {
        private readonly CompanyService _companyService;

        public CompanyController(CompanyService companyService)
        {
            _companyService = companyService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> AddCompany([FromBody] CnpjRegisterDto dto)
        {
            try
            {
                int userId = User.GetUserId();

                var company = await _companyService.AddCompanyAsync(dto.Cnpj, userId);

                return Ok(new { message = "CNPJ cadastrado com sucesso" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetCompanies(
            [FromQuery] int page = 1, 
            [FromQuery] int pageSize = 10,
            [FromQuery] string sortBy = "NomeEmpresarial",
            [FromQuery] string sortDirection = "asc"
        )
        {
            try
            {
                int userId = User.GetUserId();

                var companies = await _companyService.GetCompaniesAsync(page, pageSize, sortBy, sortDirection, userId);

                return Ok(companies);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
