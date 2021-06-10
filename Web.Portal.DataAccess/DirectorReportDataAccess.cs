using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;
using Web.Portal.Model.Models;
using Web.Portal.Common.ViewModel;


namespace Web.Portal.DataAccess
{
    public class DirectorReportDataAccess : DataBase.OracleProvider
    {
        private DirectorReportViewModel GetProperties(OracleDataReader reader)
        {
            DirectorReportViewModel drv = new DirectorReportViewModel();
            drv.RECEIVED_DATE = Convert.ToString(GetValueField(reader, "ID", string.Empty));
            drv.CX = Convert.ToDouble(GetValueField(reader, "CX", string.Empty));
            drv.KE = Convert.ToDouble(GetValueField(reader, "KE", string.Empty));
            drv.JL = Convert.ToDouble(GetValueField(reader, "JL", string.Empty));
            drv.EK = Convert.ToDouble(GetValueField(reader, "EK", string.Empty));
            drv.UPS = Convert.ToDouble(GetValueField(reader, "UPS", string.Empty));
            return drv;
        }
      
    }
}
