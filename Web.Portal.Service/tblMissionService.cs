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
    public interface ItblMissionService
    {
        IEnumerable<tblMission> GetByDate(DateTime dt);
        void Add(tblMission mission);
        void Save();
    }
    public class tblMissionService : ItblMissionService
    {
        ItblMissionRepository _missionRepository;
        IUnitOfWork _unitOfWork;
        public tblMissionService(ItblMissionRepository missionRepository, IUnitOfWork unitOfWork)
        {
            this._missionRepository = missionRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(tblMission mission)
        {
            _missionRepository.Add(mission);
        }

        public IEnumerable<tblMission> GetByDate(DateTime dt)
        {
            return _missionRepository.GetMulti(c => c.Created.Value.Day == dt.Day && c.Created.Value.Month == dt.Month && c.Created.Value.Year == dt.Year && c.Location == "0" && c.GroupID==1);
        }

        public void Save()
        {
            _unitOfWork.CommitPXK();
        }
    }
}
