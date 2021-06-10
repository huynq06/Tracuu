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
    public interface IALSC_H5_ERP_ZINT_CHECKService
    {
        void Add(ALSC_H5_ERP_ZINT_CHECK zint);
        ALSC_H5_ERP_ZINT_CHECK GetByID(string id);
        void Update(ALSC_H5_ERP_ZINT_CHECK zint);
        void Save();
    }
    public class ALSC_H5_ERP_ZINT_CHECKService : IALSC_H5_ERP_ZINT_CHECKService
    {
        IALSC_H5_ERP_ZINT_CHECKRepository _izintRepository;
        IUnitOfWork _unitOfWork;
        public ALSC_H5_ERP_ZINT_CHECKService(IALSC_H5_ERP_ZINT_CHECKRepository izintRepository, IUnitOfWork unitOfWork)
        {
            this._izintRepository = izintRepository;
            this._unitOfWork = unitOfWork;
        }
        public void Add(ALSC_H5_ERP_ZINT_CHECK zint)
        {
            _izintRepository.Add(zint);
        }

        public ALSC_H5_ERP_ZINT_CHECK GetByID(string id)
        {
            return _izintRepository.GetSingleByCondition(c=>c.INVOICE_ISN.Trim()==id);
        }

        public void Save()
        {
            _unitOfWork.CommitHermes();
        }
        public void Update(ALSC_H5_ERP_ZINT_CHECK zint)
        {
            _izintRepository.Update(zint);
        }
    }
}
