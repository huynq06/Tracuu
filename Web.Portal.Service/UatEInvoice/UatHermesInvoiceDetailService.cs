using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Data.Repositories;
using Web.Portal.Model.Models.UatEInvoice;

namespace Web.Portal.Service.UatEInvoice
{
    public interface IUatHermesInvoiceDetailService
    {
        IEnumerable<UatHermesInvoiceDetail> GetAll();
        IEnumerable<UatHermesInvoiceDetail> GetByInvoiceIsn(string invoiceIsn);
        UatHermesInvoiceDetail GetByID(int id);
        void Update(UatHermesInvoiceDetail invoiceDetail);
        void Add(UatHermesInvoiceDetail invoiceDetail);
        void Save();
    }
    public class UatHermesInvoiceDetailService : IUatHermesInvoiceDetailService
    {
        IUatHermesInvoiceDetailRepository _iHermesInvoiceDetailRepository;
        IUnitOfWork _unitOfWork;
        public UatHermesInvoiceDetailService(IUatHermesInvoiceDetailRepository iHermesInvoiceDetailRepository, IUnitOfWork unitOfWork)
        {
            this._iHermesInvoiceDetailRepository = iHermesInvoiceDetailRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(UatHermesInvoiceDetail invoiceDetail)
        {
            _iHermesInvoiceDetailRepository.Add(invoiceDetail);
        }

        public IEnumerable<UatHermesInvoiceDetail> GetAll()
        {
            throw new NotImplementedException();
        }

        public UatHermesInvoiceDetail GetByID(int id)
        {
            return _iHermesInvoiceDetailRepository.GetSingleById(id);
        }

        public IEnumerable<UatHermesInvoiceDetail> GetByInvoiceIsn(string invoiceIsn)
        {
            return _iHermesInvoiceDetailRepository.GetMulti(c => c.InvoiceIns == invoiceIsn);
        }

        public void Save()
        {
            _unitOfWork.CommitUatEInvoice();
        }

        public void Update(UatHermesInvoiceDetail invoiceDetail)
        {
            _iHermesInvoiceDetailRepository.Update(invoiceDetail);
        }
    }
}
