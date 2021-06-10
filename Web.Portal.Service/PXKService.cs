using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Data.Repositories;
using Web.Portal.Model;

namespace Web.Portal.Service
{
    public interface IPXKService
    {
        IEnumerable<tblPXK> GetByDate(DateTime? dateInput);
    }
    public class PXKService : IPXKService
    {
        IPXKRepository _pxkRepository;
        IUnitOfWork _unitOfWork;
        public PXKService(IPXKRepository pxkRepository, IUnitOfWork unitOfWork)
        {
            this._pxkRepository = pxkRepository;
            this._unitOfWork = unitOfWork;
        }
        public IEnumerable<tblPXK> GetByDate(DateTime? dateInput)
        {
            return _pxkRepository.GetAll().Where(c=>c.Created.Value.Date == dateInput.Value.Date);
        }
    }
}
