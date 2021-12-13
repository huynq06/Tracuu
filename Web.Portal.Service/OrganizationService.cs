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
    public interface IOrganizationService
    {
        Organization GetById(int id);
        Organization GetByName(string name);
        void Delete(int id);
        void Update(Organization oganization);
        void Add(Organization oganization);
        void Save();
    }
    public class OrganizationService : IOrganizationService
    {
        IOrganizationRepository _organizationRepository;
        IUnitOfWork _unitOfWork;
        public OrganizationService(IOrganizationRepository organizationRepository, IUnitOfWork unitOfWork)
        {
            this._organizationRepository = organizationRepository;
            this._unitOfWork = unitOfWork;
        }
        public void Add(Organization organization)
        {
             _organizationRepository.Add(organization);
        }

        public void Delete(int id)
        {
            _organizationRepository.Delete(id);
        }

        public Organization GetById(int id)
        {
            return _organizationRepository.GetSingleById(id);
        }

        public Organization GetByName(string name)
        {
            return _organizationRepository.GetSingleByCondition(c => c.Name == name);
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }

        public void Update(Organization organization)
        {
            _organizationRepository.Update(organization);
        }
    }
}
