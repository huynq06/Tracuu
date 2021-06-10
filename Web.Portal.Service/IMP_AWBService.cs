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
    public interface IIMP_AWBServiceService
    {
        IEnumerable<IMP_AWB> GetByDate(DateTime? fDate,DateTime? tDate,string code,string flightNo,string mawb,string warehouse);
        IMP_AWB GetByID(decimal ID);
    }
    public class IMP_AWBService : IIMP_AWBServiceService
    {
        IIMP_AWBRepository _impRepository;
        IUnitOfWork _unitOfWork;
        public IMP_AWBService(IIMP_AWBRepository impRepository, IUnitOfWork unitOfWork)
        {
            this._impRepository = impRepository;
            this._unitOfWork = unitOfWork;
        }
        public IEnumerable<IMP_AWB> GetByDate(DateTime? fDate, DateTime? tDate, string code, string flightNo, string mawb,string warehouse)
        {
            if(mawb != "ALL")
            {
                return _impRepository.GetMulti(c => c.MAWB==mawb);
            }
            else
            {
                if(code != "ALL")
                {
                    if(warehouse == "ALL")
                    {
                        return _impRepository.GetMulti(c => c.FLIGHT_NUMBER == code + flightNo && c.CREATED_AT > fDate && c.CREATED_AT <= tDate);
                    }
                    else
                    {
                        return _impRepository.GetMulti(c => c.FLIGHT_NUMBER == code + flightNo && c.CREATED_AT > fDate && c.CREATED_AT <= tDate && c.ALS_CODE==warehouse.Trim());
                    }
                }
                    
                else
                {
                    if (warehouse == "ALL")
                    {
                        return _impRepository.GetMulti(c => c.CREATED_AT > fDate && c.CREATED_AT <= tDate);
                    }
                    else
                    {
                        return _impRepository.GetMulti(c => c.CREATED_AT > fDate && c.CREATED_AT <= tDate && c.ALS_CODE==warehouse);
                    }
                    
                }
            }
            
        }

        public IMP_AWB GetByID(decimal ID)
        {
            return _impRepository.GetSingleByCondition(c => c.AWBID == ID);
        }
    }
}
