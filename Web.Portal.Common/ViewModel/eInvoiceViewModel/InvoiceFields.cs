using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Common.ViewModel
{
    public class InvoiceFields
    {
        public string sid { set; get; }
        public string idt { set; get; }
        public string type { set; get; }
        public string form { set; get; }
        public string serial { set; get; }
        public string seq { set; get; }
        public string bname { set; get; }
        public string buyer { set; get; }
        public string btax { set; get; }
        public string baddr { set; get; }
        public string btel { set; get; }
        public string bmail { set; get; }
        public string paym { set; get; }
        public string curr { set; get; }
        public double exrt { set; get; }
        public string bacc { set; get; }
        public string bbank { set; get; }
        public string note { set; get; }
        public double sumv { set; get; }
        public double sum { set; get; }
        public double vatv { set; get; }
        public double vat { set; get; }
        public string word { set; get; }
        public double totalv { set; get; }
        public double total { set; get; }
        public string discount { set; get; }
        public int aun { set; get; }
        public List<item> items { set; get; }
        public string stax { set; get; }


    }
}
