using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Data.Repositories;
using Web.Portal.Model;
using Web.Portal.Model.Models;


namespace Web.Portal.Service
{
    public interface IIADR_INVOICE_EMAILService
    {
        IEnumerable<IADR_INVOICE_EMAIL> GetListEmail();
        IADR_INVOICE_EMAIL GetByID(int id);
        void Add(IADR_INVOICE_EMAIL email);
        void Update(IADR_INVOICE_EMAIL email);
        void Update(string name, string email);
        bool CheckExistEmail(double Iadr_Isn);
        void Save();
    }
    public class IADR_INVOICE_EMAILService : IIADR_INVOICE_EMAILService
    {
        IIADR_INVOICE_EMAILRepository _iadr_emailRepository;
        IUnitOfWork _unitOfWork;
        public IADR_INVOICE_EMAILService(IIADR_INVOICE_EMAILRepository iadr_emailRepository, IUnitOfWork unitOfWork)
        {
            this._iadr_emailRepository = iadr_emailRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(IADR_INVOICE_EMAIL email)
        {
            _iadr_emailRepository.Add(email);
        }

        public bool CheckExistEmail(double Iadr_Isn)
        {
            if (_iadr_emailRepository.GetMulti(c => c.IADR_ADDRESS_ISN == Iadr_Isn).Count() > 0)
                return true;
            else
            {
                return false;
            }

        }

        public IADR_INVOICE_EMAIL GetByID(int id)
        {
            return _iadr_emailRepository.GetSingleById(id);
        }

        public IEnumerable<IADR_INVOICE_EMAIL> GetListEmail()
        {
            return _iadr_emailRepository.GetAll();
        }

        public void Save()
        {
            _unitOfWork.CommitHermes();
        }

        public void Update(IADR_INVOICE_EMAIL email)
        {
            _iadr_emailRepository.Update(email);
        }

        public void Update(string name, string email)
        {
            var listEmail = _iadr_emailRepository.GetMulti(c => c.NAME == name);
            foreach(var item in listEmail)
            {
                item.EMAIL = email;
                Update(item);
            }
        }
    }
}
