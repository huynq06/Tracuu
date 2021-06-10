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
    public interface ItblTicketService
    {
        IEnumerable<tblTicket> GetAll();
        tblTicket GetByID(int id);
        void Update(tblTicket ticket);
        IEnumerable<tblTicket> GetGetByType(int type, int pageIndex, int pageSize, ref int totalRow,string bsx);
        IEnumerable<tblTicket> GetPrintQueue(int type);
        List<string> GetGetByName(string name,int type);
        IEnumerable<tblTicket> GetGetByBsx(string bsx);
        void Save();
    }
    public class tblTicketService : ItblTicketService
    {
        ItblTicketRepository _ticketRepository;
        IUnitOfWork _unitOfWork;
        public tblTicketService(ItblTicketRepository ticketRepository, IUnitOfWork unitOfWork)
        {
            this._ticketRepository = ticketRepository;
            this._unitOfWork = unitOfWork;
        }
        public IEnumerable<tblTicket> GetAll()
        {
            return _ticketRepository.GetAll();
        }

        public tblTicket GetByID(int id)
        {
            return _ticketRepository.GetSingleById(id);
        }

        public IEnumerable<tblTicket> GetGetByBsx(string bsx)
        {
            return _ticketRepository.GetMulti(c => c.PlateNumber1.Replace("-", "") == bsx);
        }

        public List<string> GetGetByName(string name,int type)
        {
            return _ticketRepository.GetMulti(c => c.PlateNumber1.Contains(name) && c.TicketType==type).Select(y => y.PlateNumber1).Distinct().ToList() ;
        }

        public IEnumerable<tblTicket> GetGetByType(int type, int pageIndex, int pageSize, ref int totalRow, string bsx)
        {
            if (bsx == "ALL")
            {
                var query = _ticketRepository.GetMulti(c => c.TicketType == type);
                totalRow = query.Count();
                return query.OrderByDescending(c => c.CreatedDate).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            }
            else
            {
                var query = _ticketRepository.GetMulti(c => c.TicketType == type  && c.PlateNumber1.Contains(bsx));
                totalRow = query.Count();
                return query.OrderByDescending(c => c.CreatedDate).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            }
           
        }

        public IEnumerable<tblTicket> GetPrintQueue(int type)
        {
            return _ticketRepository.GetMulti(c => c.PrintStatus == 1);
        }

        public void Save()
        {
            _unitOfWork.CommitPXK();
        }

        public void Update(tblTicket ticket)
        {
            _ticketRepository.Update(ticket);
        }
    }
}
