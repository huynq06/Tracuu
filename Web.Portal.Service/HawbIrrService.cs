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
    public interface IHawbIrrService
    {
        IEnumerable<HawbIrr> GetbyAwbId(string awbId);
        IEnumerable<HawbIrr> GetbyAwbIdAndFlightId(string awbId,string flightId);
        IEnumerable<HawbIrr> GetbyAwb(string prefix,string awb);
        IEnumerable<HawbIrr> GetbyHawbName(string hawb,string awbId,string flightId);
        IEnumerable<HawbIrr> GetbyHawbId(string hawbId);
        void CloseHawb(string hawbName, string awbId, string flightId);
        void OpenHawb(string hawbName, string awbId, string flightId);
        HawbIrr GetById(int id);
        HawbIrr GetSingleByID(string hawbId);
        void Delete(int id);
        void Update(HawbIrr hawb);
        void Add(HawbIrr hawbId);
        void Save();
    }
    public class HawbIrrService : IHawbIrrService
    {
        IHawbIrrRepository _hawbRepository;
        IUnitOfWork _unitOfWork;
        public HawbIrrService(IHawbIrrRepository hawbRepository, IUnitOfWork unitOfWork)
        {
            this._hawbRepository = hawbRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(HawbIrr hawbId)
        {
            _hawbRepository.Add(hawbId);
        }

        public void CloseHawb(string hawbName, string awbId, string flightId)
        {
            IEnumerable<HawbIrr> listHawbClose = _hawbRepository.GetMulti(c => c.Hawb == hawbName.Trim() && c.IrrPices > 0 && c.AwbId == awbId && c.FlightID == flightId);
            foreach(var item in listHawbClose)
            {
                item.HawbStatus = 1;
                Update(item);
            }
        }
        public void OpenHawb(string hawbName, string awbId, string flightId)
        {
            IEnumerable<HawbIrr> listHawbClose = _hawbRepository.GetMulti(c => c.Hawb == hawbName.Trim() && c.IrrPices > 0 && c.AwbId == awbId && c.FlightID == flightId);
            foreach (var item in listHawbClose)
            {
                item.HawbStatus = 0;
                Update(item);
            }
        }

        public void Delete(int id)
        {
            _hawbRepository.Delete(id);
        }

        public IEnumerable<HawbIrr> GetbyAwb(string prefix, string awb)
        {
            return _hawbRepository.GetMulti(c => c.Prefix == prefix && c.AWB == awb);
        }

        public IEnumerable<HawbIrr> GetbyAwbId(string awbId)
        {
            return _hawbRepository.GetMulti(c => c.AwbId == awbId);
        }

        public IEnumerable<HawbIrr> GetbyAwbIdAndFlightId(string awbId, string flightId)
        {
            return _hawbRepository.GetMulti(c => c.AwbId == awbId && c.FlightID==flightId);
        }

        public IEnumerable<HawbIrr> GetbyHawbId(string hawbId)
        {
            return _hawbRepository.GetMulti(c => c.HawbId==hawbId);
        }

        public IEnumerable<HawbIrr> GetbyHawbName(string hawb,string awbId,string flightId)
        {
            return _hawbRepository.GetMulti(c => c.Hawb == hawb.Trim()&& c.IrrPices > 0 && c.AwbId==awbId && c.FlightID==flightId);
        }

        public HawbIrr GetById(int id)
        {
            return _hawbRepository.GetSingleById(id);
        }

        public HawbIrr GetSingleByID(string hawbId)
        {
            return _hawbRepository.GetSingleByCondition(c => c.HawbId == hawbId);
        }

        public void Save()
        {
            _unitOfWork.CommitFlight();
        }

        public void Update(HawbIrr hawb)
        {
            _hawbRepository.Update(hawb);
        }
    }
}
