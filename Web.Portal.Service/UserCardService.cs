using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Data.Repositories;
using Web.Portal.Model.Models.QLT;

namespace Web.Portal.Service
{
    public interface IUserCardService
    {
        IEnumerable<UserCard> GetByUserId(int userId);
        //IEnumerable<User> GetbyAwb(string prefix, string awb);
        //IEnumerable<User> GetbyHawbName(string hawb);
        List<UserCard> GetByListUser(List<User> users);
        UserCard GetById(int id);
        IEnumerable<UserCard> GetSingleByID(string userCode);
        void Delete(int id);
        void Update(UserCard userCard);
        void Add(UserCard userCard);
        void Save();
    }
    public class UserCardService : IUserCardService
    {
        IUserCardRepository _userCardRepository;
        IUnitOfWork _unitOfWork;
        public UserCardService(IUserCardRepository userCardRepository, IUnitOfWork unitOfWork)
        {
            this._userCardRepository = userCardRepository;
            this._unitOfWork = unitOfWork;
        }
        public void Add(UserCard userCard)
        {
            _userCardRepository.Add(userCard);
        }

        public void Delete(int id)
        {
            _userCardRepository.Delete(id);
        }

        public UserCard GetById(int id)
        {
            return _userCardRepository.GetSingleById(id);
        }

        public IEnumerable<UserCard> GetByUserId(int userId)
        {
            return _userCardRepository.GetMulti(c => c.UserID == userId);
        }

        public IEnumerable<UserCard> GetSingleByID(string userCode)
        {
            return _userCardRepository.GetMulti(c => c.UserCode == userCode);
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }

        public void Update(UserCard userCard)
        {
            _userCardRepository.Update(userCard);
        }

        public List<UserCard> GetByListUser(List<User> users)
        {
            List<UserCard> userCardList = new List<UserCard>();
            foreach(var user in users)
            {
                UserCard userCard = _userCardRepository.GetMulti(c => c.UserCode == user.UserID).OrderByDescending(c => c.UserOrder).FirstOrDefault();
                userCardList.Add(userCard);
            }
            return userCardList;
        }
    }
}
