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
    public interface ILabService
    {
        Lab GetByLabIdentity(string lagi_ident);
        Lab GetByMawb(string mawb);
        List<string> GetGetByName(string name, DateTime dateCheck);
        IEnumerable<Lab> GetByDate(DateTime fdate,DateTime tdate,string awb,string warehouse);
    }
    public class LabService : ILabService
    {
        ILabRepository _labRepository;
        IUnitOfWork _unitOfWork;
        public LabService(ILabRepository labRepository, IUnitOfWork unitOfWork)
        {
            this._labRepository = labRepository;
            this._unitOfWork = unitOfWork;
        }

        public IEnumerable<Lab> GetByDate(DateTime fdate, DateTime tdate,string awb,string warehouse)
        {
            if(awb == "ALL")
            {
                if(warehouse == "ALL")
                return _labRepository.GetMulti(c => c.LABS_CREATED_AT >= fdate && c.LABS_CREATED_AT <= tdate && (c.LABS_AGENT_NAME.Contains("ALSW") || c.LABS_AGENT_NAME.Contains("ALSE") || c.LABS_AGENT_NAME.Contains("ALST") || c.LABS_AGENT_NAME.Contains("ALSB") || c.LABS_AGENT_NAME.Contains("CLC")));
                else
                {
                    return _labRepository.GetMulti(c => c.LABS_CREATED_AT >= fdate && c.LABS_CREATED_AT <= tdate && c.LABS_AGENT_NAME.Contains(warehouse));
                }
            }
            
            else
            {
                return _labRepository.GetMulti(c => c.LABS_MAWB_PREFIX == awb.Substring(0, 3) && c.LABS_MAWB_SERIAL_NO == awb.Substring(3));
            }
        }

        public Lab GetByLabIdentity(string lagi_ident)
        {
            return _labRepository.GetSingleByCondition(c => c.LABS_IDENT_NO == lagi_ident);
        }

        public Lab GetByMawb(string mawb)
        {
            return _labRepository.GetSingleByCondition(c => c.LABS_MAWB_PREFIX == mawb.Substring(0,3) && c.LABS_MAWB_SERIAL_NO == mawb.Substring(3));
        }

        public List<string> GetGetByName(string name,DateTime dateCheck)
        {
            name = name.TrimStart('0');
            int lenght = name.Length;
            return _labRepository.GetMulti(c => c.LABS_MAWB_SERIAL_NO.Substring(c.LABS_MAWB_SERIAL_NO.Length- lenght) ==name && c.LABS_CREATED_AT > dateCheck).Select(y => y.LABS_MAWB_PREFIX+y.LABS_MAWB_SERIAL_NO.PadLeft(8,'0')+ "/" + y.LABS_IDENT_NO).Distinct().ToList();
        }
    }
}
