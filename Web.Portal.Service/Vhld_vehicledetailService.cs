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
    public interface IVhld_vehicledetailService
    {
        Vhld_vehicledetail GetByVCTNumber(string vct);
    }
    public class Vhld_vehicledetailService : IVhld_vehicledetailService
    {
        IVhld_vehicledetailRepository _vhldRepository;
        IUnitOfWork _unitOfWork;
        public Vhld_vehicledetailService(IVhld_vehicledetailRepository vhldRepository, IUnitOfWork unitOfWork)
        {
            this._vhldRepository = vhldRepository;
            this._unitOfWork = unitOfWork;
        }

        public Vhld_vehicledetail GetByVCTNumber(string vct)
        {
            return _vhldRepository.GetSingleByCondition(c => c.VHLD_VEHICLEISN == vct.Trim());
        }
    }
}
