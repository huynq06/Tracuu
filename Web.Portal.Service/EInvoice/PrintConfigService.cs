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
    public interface IPrintConfigService
    {
        List<PrintConfig> GetAll();
        PrintConfig GetByID(int id);
        void Update(PrintConfig config);
        void Save();
    }
    public class PrintConfigService : IPrintConfigService
    {
        IPrintConfigRepository _iPrintConfigRepository;
        IUnitOfWork _unitOfWork;
        public PrintConfigService(IPrintConfigRepository iPrintConfigRepository, IUnitOfWork unitOfWork)
        {
            this._iPrintConfigRepository = iPrintConfigRepository;
            this._unitOfWork = unitOfWork;
        }
        public List<PrintConfig> GetAll()
        {
            return _iPrintConfigRepository.GetAll().ToList();
        }

        public PrintConfig GetByID(int id)
        {
            return _iPrintConfigRepository.GetSingleById(id);
        }

        public void Save()
        {
            _unitOfWork.CommitEInvoice();
        }

        public void Update(PrintConfig config)
        {
            _iPrintConfigRepository.Update(config);
        }
    }
   
}
