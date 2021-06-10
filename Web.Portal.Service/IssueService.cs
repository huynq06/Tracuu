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
    public interface IIssueService
    {
        IEnumerable<Issue> GetAll();
      
        void Save();
    }
    public class IssueService : IIssueService
    {
        IIssueRepository _issueRepository;
        IUnitOfWork _unitOfWork;
        public IssueService(IIssueRepository issueRepository, IUnitOfWork unitOfWork)
        {
            this._issueRepository = issueRepository;
            this._unitOfWork = unitOfWork;
        }


        public IEnumerable<Issue> GetAll()
        {
            return _issueRepository.GetAll();
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }
    }
}
