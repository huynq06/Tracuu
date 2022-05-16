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
    public interface IVCTService
    {
        IEnumerable<VCT> GetAll();
        IEnumerable<VCT> GetAllToday(int id);
             VCT GetByID(int id);
        VCT GetByLabIdent(string labIdent);
        IEnumerable<VCT> GetConfirm();
        IEnumerable<VCT> GetByDay(DateTime dateCheck);
        void Update(VCT vct);

        void Save();
    }
    public class VCTService : IVCTService
    {
        IVCTRepository _vctRepository;
        IUnitOfWork _unitOfWork;
        public VCTService(IVCTRepository vctRepository, IUnitOfWork unitOfWork)
        {
            this._vctRepository = vctRepository;
            this._unitOfWork = unitOfWork;
        }


        public IEnumerable<VCT> GetAll()
        {
            return _vctRepository.GetAll();
        }
        public void Save()
        {
            _unitOfWork.Commit();
        }
        
        public IEnumerable<VCT> GetAllToday(int id)
        {
            DateTime dateCheck = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 05, 01, 0);
            int result = DateTime.Compare(DateTime.Now, dateCheck);
            if (result > 0)
            {
                if (id == 0)
                    return _vctRepository.GetMulti(c => c.LABS_CREATED_AT.Value.Day == DateTime.Now.Day  && c.LABS_CREATED_AT.Value.Month == DateTime.Now.Month && c.LABS_CREATED_AT.Value.Year == DateTime.Now.Year && c.AWB_STATUS == 0).OrderBy(c => c.LABS_CREATED_AT);
                else if (id == 1)
                    return _vctRepository.GetMulti(c => c.LABS_CREATED_AT.Value.Day == DateTime.Now.Day && c.LABS_CREATED_AT.Value.Month == DateTime.Now.Month && c.LABS_CREATED_AT.Value.Year == DateTime.Now.Year && c.AWB_STATUS == 1).OrderBy(c => c.LABS_DIM_AT);
                else if (id == 2)
                    return _vctRepository.GetMulti(c => c.LABS_CREATED_AT.Value.Day == DateTime.Now.Day  && c.LABS_CREATED_AT.Value.Month == DateTime.Now.Month && c.LABS_CREATED_AT.Value.Year == DateTime.Now.Year && c.AWB_STATUS == 2 && c.LOCATION == 1).OrderByDescending(c=>c.SortValue).ThenBy(c => c.LABS_DIM_AT);
                else
                    return _vctRepository.GetMulti(c => c.LABS_CREATED_AT.Value.Day == DateTime.Now.Day  && c.LABS_CREATED_AT.Value.Month == DateTime.Now.Month && c.LABS_CREATED_AT.Value.Year == DateTime.Now.Year && c.AWB_STATUS == 2 && c.LOCATION == 2).OrderByDescending(c => c.SortValue).ThenBy(c => c.LABS_DIM_AT);
            }
            else
            {
                DateTime dateFrom = DateTime.Now.AddDays(-1);
                if (id == 0)
                    return _vctRepository.GetMulti(c => c.LABS_CREATED_AT.Value > dateFrom && c.AWB_STATUS == 0).OrderBy(c => c.LABS_CREATED_AT);
                else if (id == 1)
                    return _vctRepository.GetMulti(c => c.LABS_CREATED_AT.Value > dateFrom && c.AWB_STATUS == 1).OrderBy(c => c.LABS_DIM_AT);
                else if (id == 2)
                    return _vctRepository.GetMulti(c => c.LABS_CREATED_AT.Value > dateFrom && c.AWB_STATUS == 2 && c.LOCATION == 1).OrderBy(c => c.LABS_DIM_AT);
                else
                    return _vctRepository.GetMulti(c => c.LABS_CREATED_AT.Value > dateFrom && c.AWB_STATUS == 2 && c.LOCATION == 2).OrderBy(c => c.LABS_DIM_AT);
            }
          
        }

        public void Update(VCT vct)
        {
            _vctRepository.Update(vct);
        }

        public VCT GetByID(int id)
        {
            return _vctRepository.GetSingleById(id);
        }

        public IEnumerable<VCT> GetConfirm()
        {
            DateTime dateCheck = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 05, 01, 0);
            int result = DateTime.Compare(DateTime.Now, dateCheck);
            if (result > 0)
            {
               
                    return _vctRepository.GetMulti(c => c.LABS_CONFIRMED_AT.Value.Day == DateTime.Now.Day && c.LABS_CONFIRMED_AT.Value.Month == DateTime.Now.Month && c.LABS_CONFIRMED_AT.Value.Year == DateTime.Now.Year && c.ConfirmStatus == 1).OrderBy(c => c.LABS_CONFIRMED_AT);
               
            }
            else
            {
               
                    return _vctRepository.GetMulti(c => (c.LABS_CONFIRMED_AT.Value.Day == DateTime.Now.Day || c.LABS_CONFIRMED_AT.Value.Day == DateTime.Now.Day - 1) && c.LABS_CONFIRMED_AT.Value.Month == DateTime.Now.Month && c.LABS_CONFIRMED_AT.Value.Year == DateTime.Now.Year && c.ConfirmStatus == 1).OrderBy(c => c.LABS_CONFIRMED_AT);
                
            }
        }

        public IEnumerable<VCT> GetByDay(DateTime dateCheck)
        {
            return _vctRepository.GetMulti(c => c.LABS_CREATED_AT.Value.Day == dateCheck.Day && c.LABS_CREATED_AT.Value.Month == dateCheck.Month && c.LABS_CREATED_AT.Value.Year == dateCheck.Year).OrderBy(c => c.LABS_CREATED_AT);
        }

        public VCT GetByLabIdent(string labIdent)
        {
            return _vctRepository.GetSingleByCondition(c => c.LABS_IDENT_NO == labIdent);
        }
    }
}
