using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Data.Repositories;
using Web.Portal.Model;


namespace Web.Portal.Service
{
    public interface IDangKyGoiXeService
    {
        IEnumerable<tblDangKyGoiXe> GetByDate(DateTime? dt);
        IEnumerable<tblDangKyGoiXe> GetVihicle(DateTime? fda,DateTime? tda,int location);
        List<tblDangKyGoiXe> GetListTruckAllow(int count);
        List<tblDangKyGoiXe> GetListTruckLimit(int count);
        List<tblDangKyGoiXe> GetListTruckFloor1(int count);
        List<tblDangKyGoiXe> GetListTruckFloorToCheck();
        void Update(tblDangKyGoiXe dkgx);
        void Save();
    }
    public class DangKyGoiXeService : IDangKyGoiXeService
    {
        IDangKyGoiXeRepository _dkgxRepository;
        IUnitOfWork _unitOfWork;
        public DangKyGoiXeService(IDangKyGoiXeRepository dkgxRepository, IUnitOfWork unitOfWork)
        {
            this._dkgxRepository = dkgxRepository;
            this._unitOfWork = unitOfWork;
        }
        public IEnumerable<tblDangKyGoiXe> GetByDate(DateTime? dt)
        {
           
                return _dkgxRepository.GetMulti(c => c.ThoiGianDangKy.Value.Day == dt.Value.Day && c.ThoiGianDangKy.Value.Month == dt.Value.Month && c.ThoiGianDangKy.Value.Year == dt.Value.Year && c.DienThoai == "EXPORT");
           
           
        }

        public List<tblDangKyGoiXe> GetListTruckAllow(int count)
        {
            return _dkgxRepository.GetMulti(c => c.TrangThai == 0 && c.ViTri == 2 && c.ThoiGianDangKy.Value.Day == DateTime.Now.Day && c.ThoiGianDangKy.Value.Month == DateTime.Now.Month && c.ThoiGianDangKy.Value.Year == DateTime.Now.Year).OrderByDescending(c => c.ThoiGianDangKy).Take(count).ToList(); 
        }
       
        public List<tblDangKyGoiXe> GetListTruckFloor1(int count)
        {
            return _dkgxRepository.GetMulti(c => c.TrangThai == 0 && c.ViTri == 2 && c.ThoiGianDangKy.Value.Day == DateTime.Now.Day && c.ThoiGianDangKy.Value.Month == DateTime.Now.Month && c.ThoiGianDangKy.Value.Year == DateTime.Now.Year).OrderByDescending(c => c.SortValue).ThenByDescending(c => c.ThoiGianDangKy).Take(count).ToList();
        }

        public List<tblDangKyGoiXe> GetListTruckFloorToCheck()
        {
            return _dkgxRepository.GetMulti(c => c.TrangThai == 0 && c.ViTri == 2 && c.ThoiGianDangKy.Value.Day == DateTime.Now.Day && c.ThoiGianDangKy.Value.Month == DateTime.Now.Month && c.ThoiGianDangKy.Value.Year == DateTime.Now.Year).ToList();
        }

        public List<tblDangKyGoiXe> GetListTruckLimit(int count)
        {
            return _dkgxRepository.GetMulti(c => c.TrangThai == 0 && c.ViTri == 2 && c.ThoiGianDangKy.Value.Day == DateTime.Now.Day && c.ThoiGianDangKy.Value.Month == DateTime.Now.Month && c.ThoiGianDangKy.Value.Year == DateTime.Now.Year).OrderByDescending(c => c.SortValue).ThenByDescending(c => c.ThoiGianDangKy).Take(count).ToList();
        }

        public IEnumerable<tblDangKyGoiXe> GetVihicle(DateTime? fda, DateTime? tda, int location)
        {
            return _dkgxRepository.GetMulti(c => c.ViTri == location && c.ThoiGianDangKy.Value >= fda && c.ThoiGianDangKy.Value <= tda);
        }

        public void Save()
        {
            _unitOfWork.CommitPXK();
        }

        public void Update(tblDangKyGoiXe dkgx)
        {
            _dkgxRepository.Update(dkgx);
        }

    }
}
