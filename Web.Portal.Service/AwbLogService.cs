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
    public interface IAwbLogService
    {
        AwbLog GetByID(int id);
        AwbLog GetByLabs_Idents(string labs_idents);
        void Add(AwbLog awb);
        void Update(AwbLog awb);

        void Save();
    }
    public class AwbLogService : IAwbLogService
    {
        IAwbLogRepository _awbLogRepository;
        IUnitOfWork _unitOfWork;
        public AwbLogService(IAwbLogRepository awbLogRepository, IUnitOfWork unitOfWork)
        {
            this._awbLogRepository = awbLogRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(AwbLog awb)
        {
            _awbLogRepository.Add(awb);
        }

        public AwbLog GetByID(int id)
        {
            return _awbLogRepository.GetSingleById(id);
        }

        public AwbLog GetByLabs_Idents(string labs_idents)
        {
            return _awbLogRepository.GetSingleByCondition(c => c.Lab_Idents == labs_idents);
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }

        public void Update(AwbLog awb)
        {
            _awbLogRepository.Update(awb);
        }
    }
}
