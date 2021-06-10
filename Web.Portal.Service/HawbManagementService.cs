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
    public interface IHawbManagementService
    {
        IEnumerable<HawbManagement> GetAll();
        List<HawbManagement> GetAll(string fno,DateTime ata);
        IEnumerable<HawbManagement> GetByFlight(Flight flight);
        HawbManagement GetByID(int id);
        HawbManagement GetByCondition(string flight, string mawb, string hawb);
        void UpdateFast(HawbManagement hawb);
        void Add(HawbManagement hawb);
        void Delete(int id);
        void Save();
    }
    public class HawbManagementService : IHawbManagementService
    {
        IHawbManagementRepository _hawbRepository;
        IUnitOfWork _unitOfWork;
        public HawbManagementService(IHawbManagementRepository hawbRepository, IUnitOfWork unitOfWork)
        {
            this._hawbRepository = hawbRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(HawbManagement hawb)
        {
            _hawbRepository.Add(hawb);
        }

        public void Delete(int id)
        {
            _hawbRepository.Delete(id);
        }

        public IEnumerable<HawbManagement> GetAll()
        {
            return _hawbRepository.GetAll();
        }

        public List<HawbManagement> GetAll(string fno, DateTime ata)
        {
            List<HawbManagement> listHawb = _hawbRepository.GetAll().ToList();

            if (!string.IsNullOrEmpty(fno))
            {
                listHawb = listHawb.Where(c => c.Flight == fno).ToList();
            }
            listHawb = listHawb.Where(c => c.ATA.Value.Date == ata.Date).ToList();
            return listHawb;
        }

        public HawbManagement GetByCondition(string flight, string mawb, string hawb)
        {
            return _hawbRepository.GetSingleByCondition(c => c.Flight == flight && c.Mawb == mawb && c.Hawb == hawb);
        }

        public IEnumerable<HawbManagement> GetByFlight(Flight flight)
        {
            return _hawbRepository.GetMulti(c => c.Flight == flight.FlightNumber);
        }

        public HawbManagement GetByID(int id)
        {
            return _hawbRepository.GetSingleById(id);
        }

        public void Save()
        {
            _unitOfWork.CommitFlight();
        }

        public void UpdateFast(HawbManagement hawb)
        {
            _hawbRepository.Update(hawb);
        }
    }
}
