using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Data.Repositories;
using Web.Portal.Model.Models.UatEInvoice;

namespace Web.Portal.Service.UatEInvoice
{
    public interface IUatHermesInvoiceService
    {
        IEnumerable<UatHermesInvoice> GetAll();
        IEnumerable<UatHermesInvoice> GetByCondition(string mawb, string invoiceNo, string InvoiceType, DateTime dt);
        UatHermesInvoice GetByInvoiceIsn(string invoiceIsn);
        UatHermesInvoice GetByInvoiceID(string invoiceid);
        UatHermesInvoice GetByID(int id);
        List<UatHermesInvoice> GetByMawbHawb(string mawb, string hawb);
        List<UatHermesInvoice> GetByMawb(string mawb);
        List<UatHermesInvoice> GetListPaging(DateTime dt, string no, string awb, int pageIndex, int pageSize, ref int totalRow, string objectType, ref int totalRecord);
        List<UatHermesInvoice> GetListPaging(DateTime dt, string no, string awb, string hawb, string staff, int status, int pageIndex, int pageSize, ref int totalRow, string objectType, ref int totalRecord);
        List<UatHermesInvoice> GetListPaging(DateTime dt, string no, string awb, string hawb, string staff, int status, int pageIndex, int pageSize, ref int totalRow, string objectType, ref int totalRecord, ref int totalHermes);
        void Update(UatHermesInvoice hermesInvoice);
        void Add(UatHermesInvoice hermesInvoice);
        void Save();
    }
    public class UatHermesInvoiceService : IUatHermesInvoiceService
    {
        IUatHermesInvoiceRepository _iHermesInvoiceRepository;
        IUnitOfWork _unitOfWork;
        public UatHermesInvoiceService(IUatHermesInvoiceRepository iHermesInvoiceRepository, IUnitOfWork unitOfWork)
        {
            this._iHermesInvoiceRepository = iHermesInvoiceRepository;
            this._unitOfWork = unitOfWork;
        }
        public void Add(UatHermesInvoice hermesInvoice)
        {
            _iHermesInvoiceRepository.Add(hermesInvoice);
        }

        public IEnumerable<UatHermesInvoice> GetAll()
        {
            return _iHermesInvoiceRepository.GetAll();
        }

        public IEnumerable<UatHermesInvoice> GetByCondition(string mawb, string invoiceNo, string InvoiceType, DateTime dt)
        {
            var query = _iHermesInvoiceRepository.GetAll().Where(c => c.InvoiceDate == dt.Date);
            int count = query.ToList().Count;
            if (!string.IsNullOrEmpty(mawb))
            {
                query = query.Where(c => (c.AWB_Prefix + c.AWB_Serial) == mawb.Trim());
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

        public UatHermesInvoice GetByID(int id)
        {
            return _iHermesInvoiceRepository.GetSingleById(id);
        }

        public UatHermesInvoice GetByInvoiceID(string invoiceid)
        {
            UatHermesInvoice hermesInvoice = _iHermesInvoiceRepository.GetSingleByCondition(c => c.InvoiceIsn == invoiceid.Trim());
            if (hermesInvoice == null)
            {
                return new UatHermesInvoice();
            }

            else
            {
                if (hermesInvoice.InvoiceStatus == 0 && hermesInvoice.InvoiceDescription == "LỖI")
                {
                    return new UatHermesInvoice();
                }
                else
                {
                    return _iHermesInvoiceRepository.GetMulti(c => c.InvoiceIsn.Contains(invoiceid.Trim()) && (c.InvoiceStatus == 2 || c.InvoiceStatus == 3)).OrderByDescending(c => c.TimeSent).First();
                }
            }
        }

        public UatHermesInvoice GetByInvoiceIsn(string invoiceIsn)
        {
            return _iHermesInvoiceRepository.GetSingleByCondition(c => c.InvoiceIsn == invoiceIsn);
        }

        public List<UatHermesInvoice> GetByMawb(string mawb)
        {
            return _iHermesInvoiceRepository.GetMulti(p => p.AWB.Replace("-", "").Trim() == mawb).ToList();
        }

        public List<UatHermesInvoice> GetByMawbHawb(string mawb, string hawb)
        {
            return _iHermesInvoiceRepository.GetMulti(p => p.AWB.Replace("-", "").Trim() == mawb && p.Hawb == hawb).ToList();
        }

        public List<UatHermesInvoice> GetListPaging(DateTime dt, string invoiceNo, string mawb, int pageIndex, int pageSize, ref int totalRow, string objectType, ref int totalRecord)
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

        public List<UatHermesInvoice> GetListPaging(DateTime dt, string no, string mawb, string hawb, string staff, int status, int pageIndex, int pageSize, ref int totalRow, string objectType, ref int totalRecord)
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
                query = query.Where(c => c.Sequence == int.Parse(no.Trim()));
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

        public List<UatHermesInvoice> GetListPaging(DateTime dt, string no, string awb, string hawb, string staff, int status, int pageIndex, int pageSize, ref int totalRow, string objectType, ref int totalRecord, ref int totalHermes)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            _unitOfWork.CommitUatEInvoice();
        }

        public void Update(UatHermesInvoice hermesInvoice)
        {
            _iHermesInvoiceRepository.Update(hermesInvoice);
        }
    }
}
