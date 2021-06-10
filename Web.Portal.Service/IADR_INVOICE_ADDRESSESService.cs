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
    public interface IIADR_INVOICE_ADDRESSESService
    {
        IEnumerable<string> GetListULDByName(string name);
        IEnumerable<IADR_INVOICE_ADDRESSES> GetByName(string name);
    }
    public class IADR_INVOICE_ADDRESSESService : IIADR_INVOICE_ADDRESSESService
    {
        IIADR_INVOICE_ADDRESSESRepository _iadr_addRepository;
        IUnitOfWork _unitOfWork;
        public IADR_INVOICE_ADDRESSESService(IIADR_INVOICE_ADDRESSESRepository iadr_addRepository, IUnitOfWork unitOfWork)
        {
            this._iadr_addRepository = iadr_addRepository;
            this._unitOfWork = unitOfWork;
        }

        public IEnumerable<IADR_INVOICE_ADDRESSES> GetByName(string name)
        {
            return _iadr_addRepository.GetMulti(c => c.IADR_NAME_1 == name);
        }

        public IEnumerable<string> GetListULDByName(string name)
        {
            return _iadr_addRepository.GetMulti(x => x.IADR_NAME_1.Contains(name)).Select(y => y.IADR_NAME_1).Distinct();
        }
    }
}
