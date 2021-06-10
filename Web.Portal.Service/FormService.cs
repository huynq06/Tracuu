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
    public interface IFormService
    {
        IEnumerable<form> GetAll();
        void Add(form form);
        void Save();
    }
    public class FormService : IFormService
    {
        IFormRepository _formRepository;
        IUnitOfWork _unitOfWork;
        public FormService(IFormRepository formRepository, IUnitOfWork unitOfWork)
        {
            this._formRepository = formRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(form form)
        {
            _formRepository.Add(form);
        }

        public IEnumerable<form> GetAll()
        {
            return _formRepository.GetAll();
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }
    }
}
