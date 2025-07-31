using System.ComponentModel.DataAnnotations;

namespace CompanyRegistration.DTOs
{
    public class UserRegisterDto
    {
        [Required(ErrorMessage = "Nome é obrigatório")]
        public string? Nome { get; set; }

        [Required(ErrorMessage = "Email é obrigatório")]
        [EmailAddress(ErrorMessage = "Email inválido")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Senha é obrigatória")]
        public string? Senha { get; set; }
    }
}
