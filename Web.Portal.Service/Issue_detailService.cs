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
    public interface IIssue_detailService
    {
        IEnumerable<Issue_detail> GetAll();
        Issue_detail GetByID(int id);
        void Update(Issue_detail issue_detail);
        void Save();
    }
    public class Issue_detailService : IIssue_detailService
    {
        IIssue_detailRepository _issueDetailRepository;
        IUnitOfWork _unitOfWork;
        public Issue_detailService(IIssue_detailRepository issueDetailRepository, IUnitOfWork unitOfWork)
        {
            this._issueDetailRepository = issueDetailRepository;
            this._unitOfWork = unitOfWork;
        }


        public IEnumerable<Issue_detail> GetAll()
        {
            return _issueDetailRepository.GetAll();
        }

        public Issue_detail GetByID(int id)
        {
            return _issueDetailRepository.GetSingleById(id);
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }

        public void Update(Issue_detail issue_detail)
        {
            _issueDetailRepository.Update(issue_detail);
        }
    }
}
