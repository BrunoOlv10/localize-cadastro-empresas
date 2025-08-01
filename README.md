# 📚 Desafio Localize - Cadastro de empresas via CNPJ

> Projeto desenvolvido como parte do processo seletivo para a vaga de **Desenvolvedor Fullstack .NET Junior** na empresa **Localize**.

---

## 🎯 Objetivo

Permitir que o usuário crie uma conta, faça login com autenticação via JWT, vincule empresas ao seu perfil informando apenas o CNPJ, e visualize a listagem das empresas cadastradas/vinculadas com paginação e ordenação.

---

## ⚙️ Funcionalidades

- Criar usuário (cadastro de conta)
- Fazer login com autenticação JWT
- Cadastrar/vincular CNPJ ao usuário logado
- Listar os CNPJs vinculados ao usuário, com paginação e ordenação
- Logout via botão

---

## 🛠 Tecnologias Utilizadas
### 💻 Back-end
- `C# (.NET)`
- `Entity Framework Core`
- `BCrypt.Net`
- `JSON Web Token (JWT)`
- `MySQL`

### 🌐 Front-end
- `Angular`
- `SCSS`
- `TypeScript`

### ⚙️ API pública - Consulta dos dados dos CNPJs
- `ReceitaWS`

---

## 🧪 Como Testar Localmente
### 1. Clonar o Repositório
```
git clone https://github.com/BrunoOlv10/localize-cadastro-empresas.git
cd localize-cadastro-empresas
```

### 2. Configurar o back-end (C# / .NET)
- Crie o banco de dados MySQL executando os seguintes comandos:
```
CREATE DATABASE IF NOT EXISTS company_registration;
USE company_registration;

CREATE TABLE Users (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    SenhaHash VARCHAR(255) NOT NULL
);

CREATE TABLE Companies (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    NomeEmpresarial VARCHAR(255),
    NomeFantasia VARCHAR(255),
    Cnpj VARCHAR(18) NOT NULL,
    Situacao VARCHAR(50),
    Abertura DATE,
    Tipo VARCHAR(50),
    NaturezaJuridica VARCHAR(100),
    AtividadePrincipal VARCHAR(255),
    Logradouro VARCHAR(255),
    Numero VARCHAR(20),
    Complemento VARCHAR(100),
    Bairro VARCHAR(100),
    Municipio VARCHAR(100),
    Uf CHAR(2),
    Cep VARCHAR(10),

    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);
```

- Crie o arquivo appsettings.json na raiz do projeto back-end para configurar a string de conexão ao MySQL e a chave para JWT:
```
"ConnectionStrings": {
    "DefaultConnection": "server=localhost;port=3306;database=company_registration;user=root;password=sua_senha"
},
"Jwt": {
    "Key": "sua-chave-secreta"
},
```

- Configure colocando a URL do front-end no Program.cs para o CORS permitir requisições do front-end:
```
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .WithHeaders("Content-Type", "Authorization")
              .WithMethods("GET", "POST");
    });
});
```

### 3. Rodar o back-end
- Compile e execute o projeto em um editor de código
- Ele deve rodar na porta configurada (ex: http://localhost:7196)

### 4. Configurar o front-end (Angular / TypeScript)
- Navegue até a pasta do front:
```
cd frontend/CompanyRegistration
```

- Instale as dependências:
```
npm install
```

- Confirme se a primeira parte da URL da API está correta (apontando para o back-end local):
```
https://localhost:7196/api
```

### 5. Rodar o front-end
```
ng serve
```
- Ele deve rodar na porta configurada (ex: http://localhost:4200)

### 6. Testar a aplicação
- Abra o navegador na URL do front-end (ex: http://localhost:4200)
- Cadastre um usuário novo
- Faça login
- Cadastre um CNPJ válido
- Confira a listagem, paginação e ordenação
- Teste o logout
