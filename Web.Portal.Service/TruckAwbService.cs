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
    public interface ITruckAwbService
    {
        IEnumerable<TruckAwb> GetByTruckID(int ID);
    }
    public class TruckAwbService : ITruckAwbService
    {
        ITruckAwbRepository _truckRepository;
        IUnitOfWork _unitOfWork;

        public IEnumerable<TruckAwb> GetByTruckID(int ID)
        {
            return _truckRepository.GetMulti(c => c.TruckID == ID);
        }

        public TruckAwbService(ITruckAwbRepository truckRepository, IUnitOfWork unitOfWork)
        {
            this._truckRepository = truckRepository;
            this._unitOfWork = unitOfWork;
        }
    }
}
