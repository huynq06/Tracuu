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
    public interface ItblCompanyService
    {
        IEnumerable<tblCompany> GetAll();
    }
    public class tblCompanyService : ItblCompanyService
    {
        ItblCompanyRepository _companyRepository;
        IUnitOfWork _unitOfWork;
        public tblCompanyService(ItblCompanyRepository companyRepository, IUnitOfWork unitOfWork)
        {
            this._companyRepository = companyRepository;
            this._unitOfWork = unitOfWork;
        }
        public IEnumerable<tblCompany> GetAll()
        {
            return _companyRepository.GetAll();
        }

      
    }
}
