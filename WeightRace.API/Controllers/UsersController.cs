using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using WeightRace.API.Data;
using WeightRace.API.Dtos;
using WeightRace.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System;

namespace WeightRace.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        private readonly ISingleUserRepository _userRepo;

        public UsersController(IDatingRepository repo, ISingleUserRepository userRepo, IMapper mapper)
        {
            _repo = repo;
            _userRepo = userRepo;
            _mapper = mapper;
        }
         [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();
             var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
            return Ok(usersToReturn);
        }
         [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
             var userToReturn = _mapper.Map<UserForDetailedDto>(user);
            return Ok(userToReturn);
        }

        [HttpPut("{id}", Name = "GetUser")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
             var userFromRepo = await _repo.GetUser(id);
             _mapper.Map(userForUpdateDto, userFromRepo);
             if (await _repo.SaveAll())
                return NoContent();
             throw new Exception($"Updating user {id} failed on save");
        }

        [HttpPost("{id}", Name = "AddFriend")]
        public async Task<IActionResult> AddFriend(int id, UserForFriendDto friend){
            var userFromRepo = await _repo.GetUser(id);
            var friendToAdd = await _repo.GetUser(friend.Id);
            userFromRepo.Friends.Add(friendToAdd);
            if (await _repo.SaveAll())
            {
                var userToReturn = _mapper.Map<UserForDetailedDto>(friendToAdd);
                return CreatedAtRoute("AddFriend", new{controller = "Users", id = userFromRepo.Id}, friend);
            }
            return BadRequest("Could not add the friend");
        }

        [HttpGet("GetFriends/{id}", Name = "GetFriends")]
        public async Task<IActionResult> GetFriends(int id){
            var friends = await _userRepo.GetUserFriends(id);
            var friendsToReturn = _mapper.Map<IEnumerable<UserForDetailedDto>>(friends);
            return Ok(friendsToReturn);
        }
    }
} 