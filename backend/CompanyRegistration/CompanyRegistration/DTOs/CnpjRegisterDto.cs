using System.ComponentModel.DataAnnotations;

namespace CompanyRegistration.DTOs
{
    public class CnpjRegisterDto
    {
        [Required(ErrorMessage = "CNPJ é obrigatório")]
        public string Cnpj { get; set; } = null!;
    }
}
