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
    public interface IULDByFlightService
    {
        IEnumerable<ULDByFlight> GetAll();
        IEnumerable<string> GetListULDByName(string name,Guid fligthID);
        ULDByFlight GetByCondtion(string name, Guid flightID);
        ULDByFlight GetByID(int id);
        ULDByFlight GetByUldIns(string uldIns);
        void Update(ULDByFlight uld);
        bool CheckExist(int location);
        List<ULDByFlight> GetListPaging(List<Flight> listFlight,int pageIndex, int pageSize,string code,ref int totalRow);
        List<ULDByFlight> GetListULDProcessing();
        List<ULDByFlight> GetListULDByFlightGuid(Guid id);
        void Add(ULDByFlight uld);
        int TotalULDByFlight(Guid flightID);
        int RemainULDByFlight(Guid flightID);
        int ProcessingULDByFlight(Guid flightID);
        int FinishtULDByFlight(Guid flightID);

        void Save();
    }
    public class ULDByFlightService : IULDByFlightService
    {
        IULDByFlightRepository _uldByFlightRepository;
        IUnitOfWork _unitOfWork;
        IFlightRepository _flightRepository;
        public ULDByFlightService(IULDByFlightRepository uldByFlightRepository, IUnitOfWork unitOfWork, IFlightRepository flightRepository)
        {
            this._uldByFlightRepository = uldByFlightRepository;
            this._unitOfWork = unitOfWork;
            this._flightRepository = flightRepository;
        }

        public IEnumerable<ULDByFlight> GetAll()
        {
            return _uldByFlightRepository.GetAll();
        }

        public ULDByFlight GetByCondtion(string name, Guid flightID)
        {
            return _uldByFlightRepository.GetSingleByCondition(c => c.Flight_ID == flightID && c.Name.Trim() == name.Trim());
        }

        public ULDByFlight GetByID(int id)
        {
            return _uldByFlightRepository.GetSingleById(id);
        }

        public List<ULDByFlight> GetListPaging(List<Flight> listFlight,int pageIndex, int pageSize,string code, ref int totalRow)
        {
            var query = _uldByFlightRepository.GetAll().Where(c=>listFlight.Any(p=>p.FlightID==c.Flight_ID));
            if (!string.IsNullOrEmpty(code))
            {
                query = _uldByFlightRepository.GetAll().Where(c => c.Name.Contains(code));
            }
            totalRow = query.Count();

            return query.OrderByDescending(x => x.Name).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
        }

        public IEnumerable<string> GetListULDByName(string name,Guid id)
        {
            return _uldByFlightRepository.GetMulti(x => x.Status==0 && x.Flight_ID==id && x.Name.Contains(name)).Select(y => y.Name);
        }
        public void Save()
        {
            _unitOfWork.CommitFlight();
        }

        public void Update(ULDByFlight uld)
        {
            _uldByFlightRepository.Update(uld);
        }

        public int TotalULDByFlight(Guid flightID)
        {
            return _uldByFlightRepository.GetMulti(c => c.Flight_ID == flightID).ToList().Count();
        }

        public int RemainULDByFlight(Guid flightID)
        {
            return _uldByFlightRepository.GetMulti(c => c.Flight_ID == flightID && c.Status==0).ToList().Count();
        }

        public int ProcessingULDByFlight(Guid flightID)
        {
            return _uldByFlightRepository.GetMulti(c => c.Flight_ID == flightID && c.Status == 1).ToList().Count();
        }

        public int FinishtULDByFlight(Guid flightID)
        {
            return _uldByFlightRepository.GetMulti(c => c.Flight_ID == flightID && c.Status == 2).ToList().Count();
        }

        public List<ULDByFlight> GetListULDProcessing()
        {
            return _uldByFlightRepository.GetMulti(c => c.Status.Value == 1).ToList();
        }

        public List<ULDByFlight> GetListULDByFlightGuid(Guid id)
        {
            return _uldByFlightRepository.GetMulti(c => c.Flight_ID == id).ToList();
        }

        public bool CheckExist(int location)
        {
            var uld = _uldByFlightRepository.GetSingleByCondition(c => c.LocationID == location && c.Status == 1);
            if (uld != null)
                return true;
            else
            {
                return false;
            }
        }

        public void Add(ULDByFlight uld)
        {
            _uldByFlightRepository.Add(uld);
        }

        public ULDByFlight GetByUldIns(string uldIns)
        {
            return _uldByFlightRepository.GetSingleByCondition(c => c.ULD_ISN == uldIns);
        }
    }
}
