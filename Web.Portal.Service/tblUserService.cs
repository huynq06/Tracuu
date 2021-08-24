using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Data.Repositories;
using Web.Portal.Model.Models;

namespace Web.Portal.Service
{
    public interface ItblUserService
    {
        IEnumerable<tblUser> GetAll();
        tblUser GetByID(int ID);
        void Update(tblUser user);
        void Insert(tblUser user);
        void Save();
    }
    public class tblUserService : ItblUserService
    {
        ItblUserRepository _userRepository;
        IUnitOfWork _unitOfWork;
        public tblUserService(ItblUserRepository userRepository, IUnitOfWork unitOfWork)
        {
            this._userRepository = userRepository;
            this._unitOfWork = unitOfWork;
        }

        public IEnumerable<tblUser> GetAll()
        {
            return _userRepository.GetAll();
        }

        public tblUser GetByID(int ID)
        {
            return _userRepository.GetSingleById(ID);
        }

        public void Update(tblUser user)
        {
            _userRepository.Update(user);
        }

        public void Insert(tblUser user)
        {
            _userRepository.Add(user);
        }

        public void Save()
        {
            _unitOfWork.CommitPXK();
        }
    }
}
