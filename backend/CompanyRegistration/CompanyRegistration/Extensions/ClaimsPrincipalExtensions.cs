using System.Security.Claims;

namespace CompanyRegistration.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static int GetUserId(this ClaimsPrincipal user)
        {
            var claim = user.FindFirst(ClaimTypes.NameIdentifier);

            if (claim == null)
                throw new UnauthorizedAccessException("Id do usuário não encontrado");

            var userId = int.Parse(claim.Value);

            return userId;
        }
    }
}
