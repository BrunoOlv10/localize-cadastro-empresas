using System.Text.Json.Serialization;

namespace CompanyRegistration.DTOs
{
    public class CnpjResponse
    {
        public string? Status { get; set; }

        public string? Nome { get; set; }

        public string? Fantasia { get; set; }

        public string? Cnpj { get; set; }

        public string? Situacao { get; set; }

        public string? Abertura { get; set; }

        public string? Tipo { get; set; }

        [JsonPropertyName("natureza_juridica")]
        public string? NaturezaJuridica { get; set; }

        [JsonPropertyName("atividade_principal")]
        public List<AtividadePrincipal>? AtividadePrincipal { get; set; }

        public string? Logradouro { get; set; }

        public string? Numero { get; set; }

        public string? Complemento { get; set; }

        public string? Bairro { get; set; }

        public string? Municipio { get; set; }

        public string? Uf { get; set; }

        public string? Cep { get; set; }

    }

    public class AtividadePrincipal
    {
        public string? Code { get; set; }
        public string? Text { get; set; }
    }
}
