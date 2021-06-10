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
    public interface IResponseMessageService
    {
        ResponseMessage GetByInvoiceIsn(string invoiceisn);
    }
    public class ResponseMessageService : IResponseMessageService
    {
        IResponseMessageRepository _iResponseMessageRepository;
        IUnitOfWork _unitOfWork;
        public ResponseMessageService(IResponseMessageRepository iResponseMessageRepository, IUnitOfWork unitOfWork)
        {
            this._iResponseMessageRepository = iResponseMessageRepository;
            this._unitOfWork = unitOfWork;
        }
        public ResponseMessage GetByInvoiceIsn(string invoiceisn)
        {
            return _iResponseMessageRepository.GetSingleByCondition(c => c.KeyField == invoiceisn && c.ReturnCodeField == "Error");
        }
    }
}
