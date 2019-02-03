using System;
using System.ComponentModel.DataAnnotations;

namespace WeightRace.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
         [Required]
        [StringLength(30, MinimumLength = 6, ErrorMessage = "You must specify a password of at least 6 characters")]
        public string Password { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public string KnownAs { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public double StartWeight { get; set; }
        [Required]
        public double GoalWeight { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}