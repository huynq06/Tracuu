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
        IEnumerable<tblMission> GetByDate(DateTime dt,string location,int group);
        IEnumerable<tblMission> GetListByDate(DateTime dt);
        tblMission GetByID(int id);
        void Add(tblMission mission);
        void Update(tblMission mission);
        void Delete(int id);
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

        public void Delete(int id)
        {
            _missionRepository.Delete(id);
        }

        public void Update(tblMission mission)
        {
            _missionRepository.Update(mission);
        }

        public IEnumerable<tblMission> GetByDate(DateTime dt,string location,int group)
        {
            if(location == "1")
              return _missionRepository.GetMulti(c => c.Created.Value.Day == dt.Day && c.Created.Value.Month == dt.Month && c.Created.Value.Year == dt.Year && (c.Location == "1" || c.Location =="2") && c.GroupID==group);
            else
                return _missionRepository.GetMulti(c => c.Created.Value.Day == dt.Day && c.Created.Value.Month == dt.Month && c.Created.Value.Year == dt.Year && c.Location == location && c.GroupID==group);
        }

        public tblMission GetByID(int id)
        {
            return _missionRepository.GetSingleById(id);
        }

        public void Save()
        {
            _unitOfWork.CommitPXK();
        }

        public IEnumerable<tblMission> GetListByDate(DateTime dt)
        {
            return _missionRepository.GetMulti(c => c.Created.Value.Day == dt.Day && c.Created.Value.Month == dt.Month && c.Created.Value.Year == dt.Year && c.Location == "0" && c.GroupID == 1);
        }
    }
}
