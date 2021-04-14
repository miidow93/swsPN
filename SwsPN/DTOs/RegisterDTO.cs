using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SwsPN.DTOs
{
    public class RegisterDTO
    {
        [Required]
        // [StringLength(60, MinimumLength = 6, ErrorMessage = "")]
        public string Username { get; set; }

        [Required]
        // [StringLength(64, MinimumLength = 8, ErrorMessage = "")]
        // [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})", ErrorMessage = "Password must be at least one character lowercase, one uppercase, one number and one special character (!, @, &, ...)")]
        // [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$", ErrorMessage = "Invalid Password")]
        public string Password { get; set; }

        /*[Required]
        public int Role { get; set; } = 2;*/
    }
}
