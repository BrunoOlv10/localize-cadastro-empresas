using System.ComponentModel.DataAnnotations;

namespace CompanyRegistration.DTOs
{
    public class UserRegisterDto
    {
        [Required(ErrorMessage = "Nome é obrigatório")]
        public string Nome { get; set; } = null!;

        [Required(ErrorMessage = "Email é obrigatório")]
        [EmailAddress(ErrorMessage = "Email inválido")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Senha é obrigatória")]
        public string Senha { get; set; } = null!;
    }
}
