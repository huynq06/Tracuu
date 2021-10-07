using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel.eInvoiceViewModel
{
    public class InvoiceExportViewModel
    {
        public int ID { set; get; }
        public string Hawb { set; get; }
        public string KundName { set; get; }
        public string Address { set; get; }
        public string TaxCode { set; get; }
        public string AWB { set; get; }
        public string Note { set; get; }
        public string Email { set; get; }
        public List<InvoiceDetailExportViewModel> InvoiceDetailViewModels { set; get; }
    }
}
