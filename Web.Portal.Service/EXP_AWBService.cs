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
    public interface IEXP_AWBService
    {
        IEnumerable<EXP_AWB> GetByDate(DateTime? fDate, DateTime? tDate,string warehouse);
        EXP_AWB GetByID(decimal ID);
    }
    public class EXP_AWBService : IEXP_AWBService
    {
        IEXP_AWBRepository _expRepository;
        IUnitOfWork _unitOfWork;
        public EXP_AWBService(IEXP_AWBRepository expRepository, IUnitOfWork unitOfWork)
        {
            this._expRepository = expRepository;
            this._unitOfWork = unitOfWork;
        }
        public IEnumerable<EXP_AWB> GetByDate(DateTime? fDate, DateTime? tDate, string warehouse)
        {
            if(warehouse=="ALL")
                return _expRepository.GetMulti(c => c.UPDATED_BOOKING > fDate && c.UPDATED_BOOKING <= tDate);
            else
            {
                if (warehouse=="ALST")
                    return _expRepository.GetMulti(c => c.UPDATED_BOOKING > fDate && c.UPDATED_BOOKING <= tDate && (c.WAREHOUSE == "ALST" || c.WAREHOUSE=="ASG" || c.WAREHOUSE=="ALT" || c.WAREHOUSE=="ASGL"));
                else
                {
                    return _expRepository.GetMulti(c => c.UPDATED_BOOKING > fDate && c.UPDATED_BOOKING <= tDate && c.WAREHOUSE == warehouse);
                }
            }
                
        }

        public EXP_AWB GetByID(decimal ID)
        {
            throw new NotImplementedException();
        }

        
    }
}
