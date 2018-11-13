using System.Collections.Generic;
using System.Threading.Tasks;
using WeightRace.API.Models;
namespace WeightRace.API.Data
{
    public interface ISingleUserRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<User>> GetUsers();
         Task<IEnumerable<Weight>> GetWeights(int userId);
         Task<Weight> GetWeight(int id);
         Task<User> GetUser(int id);
         Task<Photo> GetPhoto(int id);
         Task<Photo> GetMainPhotoForUser(int userId);
    }
}