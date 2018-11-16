using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using WeightRace.API.Data;
using WeightRace.API.Dtos;
using WeightRace.API.Helpers;
using WeightRace.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;

namespace WeightRace.API.Controllers
{
    [Route("api/users/{userId}/weights")]
    [ApiController]
    public class WeightsController : ControllerBase
    {
        private readonly ISingleUserRepository _repo;
        private readonly IMapper _mapper;

        public WeightsController(ISingleUserRepository repo, IMapper mapper){
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetWeights(int userId)
        {
            var user = await _repo.GetUser(userId);
            user.Weights = user.Weights.OrderBy(d => d.Date).ToList();
            var weightsToReturn = _mapper.Map<IEnumerable<WeightForReturnDto>>(user.Weights);             
            return Ok(weightsToReturn);
        }

        [HttpGet("{id}", Name = "GetWeight")]
        public async Task<IActionResult> GetWeight(int id){
            var weightFromRepo = await _repo.GetWeight(id);
            var weight = _mapper.Map<WeightForReturnDto>(weightFromRepo);
            return Ok(weight);
        }

        [HttpPost]
        public async Task<IActionResult> AddWeightForUser(int userId, WeightForCreationDto weightForCreation){
            var userFromRepo = await _repo.GetUser(userId);
            var weight = _mapper.Map<Weight>(weightForCreation);
            userFromRepo.Weights.Add(weight);
            if (await _repo.SaveAll())
            {
                var weightToReturn = _mapper.Map<WeightForReturnDto>(weight);
                return CreatedAtRoute("GetWeight", new WeightForReturnDto{Id = weight.Id}, weightToReturn);
            }
            return BadRequest("Could not add the weight");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWeight(int userId, int id){
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var weightFromRepo = await _repo.GetWeight(id);
            if(weightFromRepo != null){
                _repo.Delete(weightFromRepo);
            }
            if (await _repo.SaveAll())
                return Ok();
            return BadRequest("Failed to delete the weight");
        }
    }
}