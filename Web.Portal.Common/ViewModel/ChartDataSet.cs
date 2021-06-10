using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class ChartDataSet
    {
        public string SeriesName { get; set; }
        public string Renderas { get; set; }
        public List<DataItem> Data { get; set; }
        public class DataItem
        {
            public string Value { get; set; }
        }
    }
}
