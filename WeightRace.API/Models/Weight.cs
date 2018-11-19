using System;

namespace WeightRace.API.Models
{
    public class Weight
    {
        public int Id { get; set; }
        public double Value { get; set; }
        public DateTime Date { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}