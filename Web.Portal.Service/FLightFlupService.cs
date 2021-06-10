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
    public interface IFLightFlupService
    {
        IEnumerable<FLightFlup> GetAll();
        IEnumerable<FLightFlup> GetAllToday(int id);
        IEnumerable<FLightFlup> GetByDate(DateTime fdt,DateTime tdt);
        IEnumerable<FLightFlup> GetByOperationDays();
        FLightFlup GetByID(int id);
        FLightFlup GetByFlightID(string id);
        void Update(FLightFlup flight);

        void Save();
    }
    public class FLightFlupService : IFLightFlupService
    {
        IFLightFluprepository _flightRepository;
        IUnitOfWork _unitOfWork;
        public FLightFlupService(IFLightFluprepository flightRepository, IUnitOfWork unitOfWork)
        {
            this._flightRepository = flightRepository;
            this._unitOfWork = unitOfWork;
        }
        public IEnumerable<FLightFlup> GetAll()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<FLightFlup> GetAllToday(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<FLightFlup> GetByDate(DateTime fdt, DateTime tdt)
        {
            return _flightRepository.GetMulti(c => c.STD.Year >= fdt.Year & c.STD.Year <= tdt.Year & c.STD.Month >= fdt.Month & c.STD.Month <= tdt.Month & c.STD.Day >= fdt.Day & c.STD.Day <= tdt.Day && c.FlightStatus==0);
        }

        public FLightFlup GetByFlightID(string id)
        {
            return _flightRepository.GetSingleByCondition(c => c.FlightID == id.Trim());
        }

        public FLightFlup GetByID(int id)
        {
            return _flightRepository.GetSingleById(id);
        }

        public IEnumerable<FLightFlup> GetByOperationDays()
        {
            if(DateTime.Now.Hour < 8 )
            {
                DateTime start = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day -1, 8, 0, 0); //10 o'clock
                DateTime end = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 8, 0, 0);
                return _flightRepository.GetMulti(c => c.ETD > start && c.ETD <= end && c.FlightStatus == 0 && c.FlightDeleted ==0);
            }
              
           
            else
            {
                DateTime start = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day , 8, 0, 0); //10 o'clock
                DateTime end = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day + 1, 8, 0, 0);
                return _flightRepository.GetMulti(c => c.ETD > start && c.ETD <= end && c.FlightStatus == 0 && c.FlightDeleted == 0);
            }
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }

        public void Update(FLightFlup flight)
        {
            _flightRepository.Update(flight);
        }
    }
}
