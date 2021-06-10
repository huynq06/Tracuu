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
    public interface IPrintService
    {
        Print GetByIsn(string isn);
    }
    public class PrintService : IPrintService
    {
        IPrintRepository _iPrintRepository;
        IUnitOfWork _unitOfWork;
        public PrintService(IPrintRepository iPrintRepository, IUnitOfWork unitOfWork)
        {
            this._iPrintRepository = iPrintRepository;
            this._unitOfWork = unitOfWork;
        }
        public Print GetByIsn(string isn)
        {
            return _iPrintRepository.GetSingleByCondition(c => c.PrintIns == isn);
        }
    }
}
