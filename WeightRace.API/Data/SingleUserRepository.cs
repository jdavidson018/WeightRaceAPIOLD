using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WeightRace.API.Models;

namespace WeightRace.API.Data
{
    public class SingleUserRepository : ISingleUserRepository
    {
        private readonly DataContext _context;

        public SingleUserRepository(DataContext context){
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            return await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<User> GetUser(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _context.Users.Include(p => p.Photos).Include(w => w.Weights).ToListAsync();
        }

        public async Task<IEnumerable<Weight>> GetWeights(int userId)
        {
            return await _context.Weights.ToListAsync();
        }

        public async Task<Weight> GetWeight(int id){
            return await _context.Weights.FirstOrDefaultAsync(w => w.Id == id);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}