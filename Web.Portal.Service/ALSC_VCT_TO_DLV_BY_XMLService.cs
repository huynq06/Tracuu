using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Data.Repositories;
using Web.Portal.Model;
using Web.Portal.Model.Models;

namespace Web.Portal.Service
{
    public interface IALSC_VCT_TO_DLV_BY_XMLService 
    {
        void Add(ALSC_VCT_TO_DLV_BY_XML vct);
        void Delete(int id);
        ALSC_VCT_TO_DLV_BY_XML GetByID(int id);
        ALSC_VCT_TO_DLV_BY_XML GetByVCT(string vct);
        IEnumerable<ALSC_VCT_TO_DLV_BY_XML> GetList(DateTime ata);
        void Save();
    }
    public class ALSC_VCT_TO_DLV_BY_XMLService : IALSC_VCT_TO_DLV_BY_XMLService
    {
        IALSC_VCT_TO_DLV_BY_XMLRepository _vctRepository;
        IUnitOfWork _unitOfWork;
        public ALSC_VCT_TO_DLV_BY_XMLService(IALSC_VCT_TO_DLV_BY_XMLRepository vctRepository, IUnitOfWork unitOfWork)
        {
            this._vctRepository = vctRepository;
            this._unitOfWork = unitOfWork;
        }
        public void Add(ALSC_VCT_TO_DLV_BY_XML vct)
        {
            _vctRepository.Add(vct);
        }

        public ALSC_VCT_TO_DLV_BY_XML GetByID(int id)
        {
            return _vctRepository.GetSingleById(id);
        }

        public ALSC_VCT_TO_DLV_BY_XML GetByVCT(string vct)
        {
            return _vctRepository.GetSingleByCondition(c => c.VCT_NO == vct);
        }

        public IEnumerable<ALSC_VCT_TO_DLV_BY_XML> GetList(DateTime ata)
        {
            return _vctRepository.GetMulti(c => c.SCAN_DATETIME > ata.Date).OrderBy(c=>c.SCAN_DATETIME);
        }

        public void Save()
        {
            _unitOfWork.CommitHermes();
        }

        public void Delete(int id)
        {
            _vctRepository.Delete(id);
        }
    }
}
