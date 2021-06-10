using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Data.Repositories;
using Web.Portal.Model.Models;

namespace Web.Portal.Service
{
    public interface IHermesInvoiceService
    {
        IEnumerable<HermesInvoice> GetAll();
        IEnumerable<HermesInvoice> GetByCondition(string mawb,string invoiceNo, string InvoiceType,DateTime dt);
        HermesInvoice GetByInvoiceIsn(string invoiceIsn);
        HermesInvoice GetByInvoiceID(string invoiceid);
        HermesInvoice GetByID(int id);
        List<HermesInvoice> GetByMawbHawb(string mawb, string hawb);
        List<HermesInvoice> GetByMawb(string mawb);
        List<HermesInvoice> GetListPaging(DateTime dt,string no,string awb,int pageIndex, int pageSize, ref int totalRow,string objectType,ref int totalRecord);
        List<HermesInvoice> GetListPaging(DateTime dt, string no, string awb, string hawb, string staff, int status, int pageIndex, int pageSize, ref int totalRow, string objectType, ref int totalRecord);
        List<HermesInvoice> GetListPaging(DateTime dt, string no, string awb,string hawb,string staff,int status, int pageIndex, int pageSize, ref int totalRow, string objectType, ref int totalRecord,ref int totalHermes);
        void Update(HermesInvoice hermesInvoice);
        void Add(HermesInvoice hermesInvoice);
        void Save();
    }
    public class HermesInvoiceService : IHermesInvoiceService
    {
        IHermesInvoiceRepository _iHermesInvoiceRepository;
        IUnitOfWork _unitOfWork;
        public HermesInvoiceService(IHermesInvoiceRepository iHermesInvoiceRepository, IUnitOfWork unitOfWork)
        {
            this._iHermesInvoiceRepository = iHermesInvoiceRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Add(HermesInvoice hermesInvoice)
        {
            _iHermesInvoiceRepository.Add(hermesInvoice);
        }

        public IEnumerable<HermesInvoice> GetAll()
        {
            return _iHermesInvoiceRepository.GetAll();
        }

        public IEnumerable<HermesInvoice> GetByCondition(string mawb, string invoiceNo, string InvoiceType, DateTime dt)
        {
            var query = _iHermesInvoiceRepository.GetAll().Where(c => c.InvoiceDate == dt.Date);
            int count = query.ToList().Count;
            if (!string.IsNullOrEmpty(mawb))
            {
                query = query.Where(c => (c.AWB_Prefix+c.AWB_Serial)==mawb.Trim());
            }
            if (!string.IsNullOrEmpty(invoiceNo))
            {
                query = query.Where(c => c.InvoiceNumber == invoiceNo.Trim());
            }
            if (!string.IsNullOrEmpty(InvoiceType))
            {
                query = query.Where(c => c.InvoiceType == InvoiceType.Trim());
            }
            return query;
        }

        public HermesInvoice GetByID(int id)
        {
            return _iHermesInvoiceRepository.GetSingleById(id);
        }

        public HermesInvoice GetByInvoiceID(string invoiceid)
        {
            HermesInvoice hermesInvoice = _iHermesInvoiceRepository.GetSingleByCondition(c => c.InvoiceIsn == invoiceid.Trim());
            if(hermesInvoice.InvoiceIsn !=null && hermesInvoice !=null)
            {
                if(hermesInvoice.InvoiceStatus ==0 && hermesInvoice.InvoiceDescription== "LỖI")
                {
                    return new HermesInvoice();
                }
                else
                {
                    return _iHermesInvoiceRepository.GetMulti(c => c.InvoiceIsn.Contains(invoiceid.Trim()) && (c.InvoiceStatus == 2 || c.InvoiceStatus == 3)).OrderByDescending(c => c.TimeSent).First();
                }
            }
            else
            {
                return new HermesInvoice();
            }
            
        }

        public HermesInvoice GetByInvoiceIsn(string invoiceIsn)
        {
            return _iHermesInvoiceRepository.GetSingleByCondition(c => c.InvoiceIsn == invoiceIsn);
        }

        public List<HermesInvoice> GetByMawb(string mawb)
        {
            return _iHermesInvoiceRepository.GetMulti(p => p.AWB.Replace("-", "").Trim() == mawb).ToList();
        }

        public List<HermesInvoice> GetByMawbHawb(string mawb, string hawb)
        {
            return _iHermesInvoiceRepository.GetMulti(p => p.AWB.Replace("-", "").Trim() == mawb && p.Hawb == hawb).ToList();
        }

        public List<HermesInvoice> GetListPaging(DateTime dt,string invoiceNo, string mawb, int pageIndex, int pageSize,  ref int totalRow,string objectType,ref int totalRecord)
        {
            var query = _iHermesInvoiceRepository.GetAll().Where(c => c.InvoiceDate == dt.Date && c.ObjectType == objectType);
            totalRecord = query.ToList().Count;
            if (!string.IsNullOrEmpty(mawb))
            {
                query = query.Where(c => (c.AWB_Prefix + c.AWB_Serial) == mawb.Trim());
            }
            if (!string.IsNullOrEmpty(invoiceNo))
            {
                query = query.Where(c => c.InvoiceNumber == invoiceNo.Trim());
            }
            totalRow = query.Count();

            return query.OrderByDescending(x => x.InvoiceDatime).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
        }

        public List<HermesInvoice> GetListPaging(DateTime dt, string no, string mawb, string hawb, string staff, int status, int pageIndex, int pageSize, ref int totalRow, string objectType, ref int totalRecord)
        {
            var query = _iHermesInvoiceRepository.GetMulti(c => c.InvoiceDate == dt.Date && c.ObjectType == objectType);
            totalRecord = query.ToList().Count;
            var totalUnique = query.GroupBy(x => x.InvoiceNumber).All(g => g.Count() == 1);
            if (!string.IsNullOrEmpty(mawb))
            {
                query = query.Where(c => (c.AWB_Prefix + c.AWB_Serial) == mawb.Trim());
            }
            if (!string.IsNullOrEmpty(hawb))
            {
                query = query.Where(c => c.Hawb == hawb.Trim());
            }
            if (!string.IsNullOrEmpty(no))
            {
                query = query.Where(c => c.InvoiceNumber == no.Trim());
            }
            //if (type != "ALL")
            //{
            //    query = query.Where(c => c.InvoiceType == type);
            //}
            if (staff != "ALL")
            {
                query = query.Where(c => c.PersonName.Trim() == staff.ToUpper().Trim());
            }
            if (status != 100)
            {
                query = query.Where(c => c.InvoiceStatus == status);
            }
            totalRow = query.Count();
            return query.OrderByDescending(x => x.InvoiceDatime).ToList();
        }

        public List<HermesInvoice> GetListPaging(DateTime dt, string no, string mawb, string hawb,string staff, int status, int pageIndex, int pageSize, ref int totalRow, string objectType, ref int totalRecord,ref int totalHermes)
        {
            var query = _iHermesInvoiceRepository.GetMulti(c => (c.InvoiceDate == dt.Date || (c.CancelDateTime.Value.Year == dt.Year &&
                             c.CancelDateTime.Value.Month == dt.Month &&
                             c.CancelDateTime.Value.Day == dt.Day)) && c.ObjectType == objectType);
            totalRecord = query.ToList().Count;
            var myhash = new HashSet<string>();
            totalHermes = totalRecord - query.Where(item => !myhash.Add(item.InvoiceNumber)).Distinct().ToList().Count();
            if (!string.IsNullOrEmpty(mawb))
            {
                query = query.Where(c => (c.AWB_Prefix + c.AWB_Serial) == mawb.Trim());
            }
            if (!string.IsNullOrEmpty(hawb))
            {
                query = query.Where(c => c.Hawb == hawb.Trim());
            }
            if (!string.IsNullOrEmpty(no))
            {
                query = query.Where(c => c.InvoiceNumber == no.Trim());
            }
            //if (type != "ALL")
            //{
            //    query = query.Where(c => c.InvoiceType == type);
            //}
            if (staff != "ALL")
            {
                query = query.Where(c => c.PersonName.Trim() == staff.ToUpper().Trim());
            }
            if (status != 100)
            {
                query = query.Where(c => c.InvoiceStatus==status);
            }
            totalRow = query.Count();
            return query.OrderByDescending(x => x.InvoiceDatime).ToList();
            //return query.OrderByDescending(x => x.InvoiceDatime).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
        }

        public void Save()
        {
            _unitOfWork.CommitEInvoice();
        }

        public void Update(HermesInvoice hermesInvoice)
        {
            _iHermesInvoiceRepository.Update(hermesInvoice);
        }
    }
}
