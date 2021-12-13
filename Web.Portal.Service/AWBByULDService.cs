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
    public interface IAWBByULDService
    {
        IEnumerable<AWBByULD> GetColAWB();
        List<AWBByULD> GetListAWBOpenByFlightGuid(Guid id);
        List<AWBByULD> GetByFlightGuid(Guid id);
        AWBByULD GetByGuid(Guid id);
        List<string> GetByName(string name, Guid id);
    }
    public class AWBByULDService : IAWBByULDService
    {
        IAWBByULDRepository _awbByULDRepository;
        IUnitOfWork _unitOfWork;
        public AWBByULDService(IAWBByULDRepository awbByULDRepository, IUnitOfWork unitOfWork)
        {
            this._awbByULDRepository = awbByULDRepository;
            this._unitOfWork = unitOfWork;
        }

        public List<AWBByULD> GetByFlightGuid(Guid id)
        {
            return _awbByULDRepository.GetMulti(c => c.Flight_ID == id).ToList();
        }

        public AWBByULD GetByGuid(Guid id)
        {
            return _awbByULDRepository.GetSingleByCondition(c => c.AWB_ID == id);
        }

        public IEnumerable<AWBByULD> GetColAWB()
        {
            return _awbByULDRepository.GetMulti(c => c.CheckValue == 1 && c.Process != 2 );
        }

        public List<string> GetByName(string name, Guid id)
        {
            return _awbByULDRepository.GetMulti(c => c.AWB.Substring(c.AWB.Length - 4) == name && c.Flight_ID == id).Select(y => y.AWB + "/" + y.Lagi_Identity).Distinct().ToList();
        }

        public List<AWBByULD> GetListAWBOpenByFlightGuid(Guid id)
        {
            return _awbByULDRepository.GetMulti(c => c.Flight_ID == id && c.CheckValue == 1 && c.Process == 0).ToList();
        }

     
    }
}
