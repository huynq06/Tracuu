using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Data.Repositories;
using Web.Portal.Model;
using Web.Portal.Model.Models;

namespace Web.Portal.Service
{
    public interface IDangKyVaoRaService
    {
        List<tblDangKyVaoRa> GetTruckSecondFloor();
        List<tblDangKyVaoRa> GetTruckFirstFloor();
        IEnumerable<tblDangKyVaoRa> GetVihicle(DateTime? fda, DateTime? tda, int location);
        IEnumerable<tblDangKyVaoRa> GetVihicleByDate(DateTime? da, int location);
        List<tblDangKyVaoRa> GetTruckIndoor();
        tblDangKyVaoRa GetByGuid(string syn_id);
        void Update(tblDangKyVaoRa item);
        void Subbmit();
    }
    public class DangKyVaoRaService : IDangKyVaoRaService
    {
        IDangKyVaoRaRepository _dkvrRepository;
        IUnitOfWork _unitOfWork;
        public DangKyVaoRaService(IDangKyVaoRaRepository dkvrRepository, IUnitOfWork unitOfWork)
        {
            this._dkvrRepository = dkvrRepository;
            this._unitOfWork = unitOfWork;
        }

        public tblDangKyVaoRa GetByGuid(string syn_id)
        {
            return _dkvrRepository.GetSingleByCondition(c => c.SyncID == syn_id);
        }

        public List<tblDangKyVaoRa> GetTruckFirstFloor()
        {
            return _dkvrRepository.GetMulti(c => c.NgayGioVaoThuc.Value > DateTime.Now.AddHours(-4) && c.NgayGioRa == null && c.Floor == 1).ToList();
        }

        public List<tblDangKyVaoRa> GetTruckIndoor()
        {
            return _dkvrRepository.GetCallTruck().ToList();
        }

        public List<tblDangKyVaoRa> GetTruckSecondFloor()
        {
            return _dkvrRepository.GetMulti(c => c.NgayGioVaoThuc.Value > DateTime.Now.AddHours(-4) && c.NgayGioRa == null && c.Floor == 2).ToList();
        }

        public IEnumerable<tblDangKyVaoRa> GetVihicle(DateTime? fda, DateTime? tda, int location)
        {
            return _dkvrRepository.GetMulti(c => c.Floor == location && c.NgayGioVao.Value >= fda && c.NgayGioVao.Value <= tda && c.LoaiXe != 2 && c.LoaiVe != 0);
        }

        public IEnumerable<tblDangKyVaoRa> GetVihicleByDate(DateTime? da, int location)
        {
            return _dkvrRepository.GetMulti(c => c.Floor == location && c.NgayGioVao.Value >= da && c.NgayGioVao.Value <= da);
        }

        public void Subbmit()
        {
            _unitOfWork.CommitPXK();
        }

        public void Update(tblDangKyVaoRa item)
        {
            _dkvrRepository.Update(item);
        }
    }
}
