using System;

namespace WeightRace.API.Dtos
{
    public class WeightForCreationDto
    {
        public double Value { get; set; }
        public DateTime Date { get; set; }

        public WeightForCreationDto(){
            Date = DateTime.Now;
        }
    }
}