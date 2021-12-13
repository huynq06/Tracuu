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
        tblDangKyGoiXe GetBySynID(Guid guid);
        IEnumerable<tblDangKyGoiXe> GetVihicle(DateTime? fda,DateTime? tda,int location);
        List<tblDangKyGoiXe> GetListTruckAllow(int count);
        tblDangKyGoiXe GetByBSX(string BSX,DateTime? dateCheck,DateTime? createDate,DateTime? ScanDate,int type);
        tblDangKyGoiXe GetByBSXNewest(string BSX);
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

        public tblDangKyGoiXe GetByBSX(string BSX, DateTime? dt,DateTime? CreatedDate,DateTime? ScanDate,int type)
        {
            tblDangKyGoiXe xe;
            List<tblDangKyGoiXe> listCheck = _dkgxRepository.GetMulti(c => c.ThoiGianDangKy.Value.Day == CreatedDate.Value.Day && c.ThoiGianDangKy.Value.Month == CreatedDate.Value.Month && c.ThoiGianDangKy.Value.Year == CreatedDate.Value.Year && c.BienSoXe == BSX).ToList();
            if(type == 1)
            {
                List<tblDangKyGoiXe> listFilter = new List<tblDangKyGoiXe>();
                if (listCheck.Count > 0)
                {
                    if (listCheck.Count == 1)
                    {
                        xe = listCheck[0];
                    }
                    else
                    {
                        foreach (var item in listCheck)
                        {
                            tblDangKyGoiXe obj = new tblDangKyGoiXe();
                            item.LoaiHang = Math.Abs((int)Math.Round((dt.Value - item.ThoiGianDangKy.Value).TotalMinutes, 0));
                            listFilter.Add(item);
                        }
                        xe = listFilter.OrderBy(c => c.LoaiHang).First();
                    }
                   
                }
                else
                {
                    xe = null;
                }
            }
            else
            {
                List<tblDangKyGoiXe> listFilter = new List<tblDangKyGoiXe>();
                if (listCheck.Count > 0)
                {
                    if (listCheck.Count == 1)
                    {
                        xe = listCheck[0];
                    }
                    foreach (var item in listCheck)
                    {
                        tblDangKyGoiXe obj = new tblDangKyGoiXe();
                        
                        item.LoaiHang = ScanDate.HasValue? Math.Abs((int)Math.Round(( ScanDate.Value - item.ThoiGianDangKy.Value).TotalMinutes, 0)) : 0;
                        listFilter.Add(item);
                    }
                    xe = listFilter.OrderBy(c => c.LoaiHang).First();
                }
                else
                {
                    xe = null;
                }
            }
            

            return xe;
        }

        public tblDangKyGoiXe GetByBSXNewest(string BSX)
        {
            return _dkgxRepository.GetMulti(c => c.ThoiGianDangKy.Value.Day == DateTime.Now.Day && c.ThoiGianDangKy.Value.Month == DateTime.Now.Month && c.ThoiGianDangKy.Value.Year == DateTime.Now.Year && c.BienSoXe == BSX).OrderByDescending(c => c.GioGoi).FirstOrDefault();
        }

        public IEnumerable<tblDangKyGoiXe> GetByDate(DateTime? dt)
        {
           
                return _dkgxRepository.GetMulti(c => c.ThoiGianDangKy.Value.Day == dt.Value.Day && c.ThoiGianDangKy.Value.Month == dt.Value.Month && c.ThoiGianDangKy.Value.Year == dt.Value.Year && c.DienThoai == "EXPORT");
           
           
        }

        public tblDangKyGoiXe GetBySynID(Guid guid)
        {
            return _dkgxRepository.GetSingleByCondition(c => c.SynID == guid);
        }

        public List<tblDangKyGoiXe> GetListTruckAllow(int count)
        {
            return _dkgxRepository.GetMulti(c => c.TrangThai == 0 && c.ViTri == 2 && c.ThoiGianDangKy.Value.Day == DateTime.Now.Day && c.ThoiGianDangKy.Value.Month == DateTime.Now.Month && c.ThoiGianDangKy.Value.Year == DateTime.Now.Year).OrderByDescending(c => c.ThoiGianDangKy).Take(count).ToList(); 
        }
       
        public List<tblDangKyGoiXe> GetListTruckFloor1(int count)
        {
            return _dkgxRepository.GetMulti(c => c.TrangThai == 0 && c.ViTri == 1 && c.ThoiGianDangKy.Value.Day == DateTime.Now.Day && c.ThoiGianDangKy.Value.Month == DateTime.Now.Month && c.ThoiGianDangKy.Value.Year == DateTime.Now.Year).OrderByDescending(c => c.SortValue).ThenByDescending(c => c.ThoiGianDangKy).Take(count).ToList();
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
            if(location == 0)
                return _dkgxRepository.GetMulti(c=>c.ThoiGianDangKy.Value >= fda && c.ThoiGianDangKy.Value <= tda);
            else
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
