using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ApiViewModel
{
    public class QuantityReportChart
    {
        public List<ImportQuantity> Imports { set; get; }
        public List<ExportQuantity> Exports { set; get; }
        public string[] TickValues { set; get; }
        public int MaxValue { set; get; }
        public int TotalImport { set; get; }
        public int TotalExport { set; get; }

    }
}
