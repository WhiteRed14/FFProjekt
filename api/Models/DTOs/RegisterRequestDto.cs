namespace CarRepairApi.Models.DTOs
{
    public class RegisterRequestDto
    {
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public string Role { get; set; } = "Client";
    }
} 