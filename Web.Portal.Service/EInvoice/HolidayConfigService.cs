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
    public interface IHolidayConfigService
    {
        IEnumerable<HolidayConfig> GetAll();
        IEnumerable<HolidayConfig> GetByYear(int year);
        HolidayConfig GetByID(int id);
        void Update(HolidayConfig holiday);
        void Add(HolidayConfig holiday);
        void Delete(int id);
        void Save();
    }
    public class HolidayConfigService : IHolidayConfigService
    {
        IHolidayConfigRepository _holidayRepository;
        IUnitOfWork _unitOfWork;
        public HolidayConfigService(IHolidayConfigRepository holidayRepository, IUnitOfWork unitOfWork)
        {
            this._holidayRepository = holidayRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(HolidayConfig holiday)
        {
            _holidayRepository.Add(holiday);
        }

        public void Delete(int id)
        {
            _holidayRepository.Delete(id);
        }

        public IEnumerable<HolidayConfig> GetAll()
        {
            return _holidayRepository.GetAll();
        }

        public HolidayConfig GetByID(int id)
        {
            return _holidayRepository.GetSingleById(id);
        }

        public IEnumerable<HolidayConfig> GetByYear(int year)
        {
            return _holidayRepository.GetMulti(c => c.DateHoliday.Value.Year == year);
        }

        public void Save()
        {
            _unitOfWork.CommitEInvoice();
        }

        public void Update(HolidayConfig holiday)
        {
            _holidayRepository.Update(holiday);
        }
    }
}
