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
    public interface IUserService
    {
        IEnumerable<User> GetByOganization(int ogzId);
        //IEnumerable<User> GetbyAwb(string prefix, string awb);
        IEnumerable<User> GetByStatus(int status);
        //IEnumerable<User> GetbyHawbName(string hawb);
        User GetById(int id);
        User GetSingleByID(string userCode);
        void Delete(int id);
        void Update(User user);
        void Add(User user);
        void Save();
    }
    public class UserService : IUserService
    {
        IUserRepository _userRepository;
        IUserCardRepository _userCardRepository;
        IUnitOfWork _unitOfWork;
        public UserService(IUserRepository userRepository, IUnitOfWork unitOfWork, IUserCardRepository userCardRepository)
        {
            this._userRepository = userRepository;
            this._unitOfWork = unitOfWork;
            this._userCardRepository = userCardRepository;
        }

        public void Add(User user)
        {
            _userRepository.Add(user);
        }

        public void Delete(int id)
        {
            _userRepository.Delete(id);
        }
        public IEnumerable<User> GetByStatus(int status)
        {
            if(status == 2)
            {

                return _userRepository.GetAll();
            }
            else
            {
                if(status==1)
                     return _userRepository.GetMulti(c => c.UserActive == true);
                else
                {
                    return _userRepository.GetMulti(c => c.UserActive == false);
                }
            }
        }
        public User GetById(int id)
        {
            return _userRepository.GetSingleById(id);
        }

        public IEnumerable<User> GetByOganization(int ogzId)
        {
            return _userRepository.GetMulti(c => c.OrganizationID == ogzId);
        }

        public User GetSingleByID(string userCode)
        {
            return _userRepository.GetSingleByCondition(c => c.UserID == userCode);
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }

        public void Update(User user)
        {
            _userRepository.Update(user);
        }
    }
}
