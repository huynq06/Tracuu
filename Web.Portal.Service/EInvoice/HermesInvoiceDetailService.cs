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
    public interface IHermesInvoiceDetailService
    {
        IEnumerable<HermesInvoiceDetail> GetAll();
        IEnumerable<HermesInvoiceDetail> GetByInvoiceIsn(string invoiceIsn);
        HermesInvoiceDetail GetByID(int id);
        void Update(HermesInvoiceDetail invoiceDetail);
        void Add(HermesInvoiceDetail invoiceDetail);
        void Save();
    }
    public class HermesInvoiceDetailService : IHermesInvoiceDetailService
    {
        IHermesInvoiceDetailRepository _iHermesInvoiceDetailRepository;
        IUnitOfWork _unitOfWork;
        public HermesInvoiceDetailService(IHermesInvoiceDetailRepository iHermesInvoiceDetailRepository, IUnitOfWork unitOfWork)
        { 
            this._iHermesInvoiceDetailRepository = iHermesInvoiceDetailRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(HermesInvoiceDetail invoiceDetail)
        {
            _iHermesInvoiceDetailRepository.Add(invoiceDetail);
        }

        public IEnumerable<HermesInvoiceDetail> GetAll()
        {
            throw new NotImplementedException();
        }

        public HermesInvoiceDetail GetByID(int id)
        {
            return _iHermesInvoiceDetailRepository.GetSingleById(id);
        }

        public IEnumerable<HermesInvoiceDetail> GetByInvoiceIsn(string invoiceIsn)
        {
            return _iHermesInvoiceDetailRepository.GetMulti(c => c.InvoiceIns == invoiceIsn);
        }

        public void Save()
        {
            _unitOfWork.CommitEInvoice();
        }

        public void Update(HermesInvoiceDetail invoiceDetail)
        {
            _iHermesInvoiceDetailRepository.Update(invoiceDetail);
        }
    }
}
