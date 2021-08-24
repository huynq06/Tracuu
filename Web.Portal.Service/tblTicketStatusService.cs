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
    public interface ItblTicketStatusService
    {
        IEnumerable<tblTicketStatus> GetAll();
        tblTicketStatus GetByTicketID(Guid ticketID);
        void Update(tblTicketStatus ticket);
        void Insert(tblTicketStatus ticket);
        IEnumerable<tblTicketStatus> GetVihicle(DateTime? fda, DateTime? tda, string location);
        IEnumerable<tblTicketStatus> GetVihicleMonthly(DateTime? fda, DateTime? tda, string location);
        IEnumerable<tblTicketStatus> GetVihicleCheckIn(DateTime? fda, DateTime? tda, string location);
        IEnumerable<tblTicketStatus> GetVihicleCheckInByDate(DateTime? fda, string location);
        IEnumerable<tblTicketStatus> GetVihicleCheckOut(DateTime? fda, DateTime? tda, string location);
        IEnumerable<tblTicketStatus> GetVihicleCheckOutByDate(DateTime? fda, string location);

        IEnumerable<tblTicketStatus> GetVihicleCheckInDockT2();
        IEnumerable<Guid> GetListTicket(DateTime? fda, DateTime? tda, string location);
        IEnumerable<Guid> GetListTicketMonthy(DateTime? fda, DateTime? tda, string location);
        IEnumerable<tblTicketStatus> GetListTicketMonthyCheckIn(DateTime dateCheck);
        void Save();
    }
    public class tblTicketStatusService : ItblTicketStatusService
    {
        ItblTicketStatusRepository _statusRepository;
        IUnitOfWork _unitOfWork;
        public tblTicketStatusService(ItblTicketStatusRepository statusRepository, IUnitOfWork unitOfWork)
        {
            this._statusRepository = statusRepository;
            this._unitOfWork = unitOfWork;
        }

        public IEnumerable<tblTicketStatus> GetAll()
        {
            return _statusRepository.GetAll();
        }

        public tblTicketStatus GetByTicketID(Guid ticketID)
        {
            return _statusRepository.GetSingleByCondition(c => c.TicketUID == ticketID);
        }

        public IEnumerable<Guid> GetListTicket(DateTime? fda, DateTime? tda, string location)
        {
            return _statusRepository.GetMulti(c => c.ActionValue == location && c.TicketCreatedAt.Value >= fda && c.TicketCreatedAt.Value <= tda && c.ActionStatus.Value == 1 ).Select(c=>c.TicketUID).Distinct();
        }

        public IEnumerable<Guid> GetListTicketMonthy(DateTime? fda, DateTime? tda, string location)
        {
            return _statusRepository.GetMulti(c => c.ActionValue == location && c.ActionDateTime >= fda && c.ActionDateTime <= tda && c.ActionStatus.Value == 1 && c.TicketType==2).Select(c => c.TicketUID).Distinct();
        }

        public IEnumerable<tblTicketStatus> GetListTicketMonthyCheckIn(DateTime dateCheck)
        {
            return _statusRepository.GetMulti(c => c.ActionDateTime >= dateCheck && c.ActionStatus == 1).Select(c => new tblTicketStatus()
            {
                TicketUID = c.TicketUID,
                ActionCode = c.ActionCode,
                ActionValue = c.ActionValue,
                BienSoXe = c.BienSoXe,
                TicketType = c.TicketType,
                ActionDateTime = c.ActionDateTime
            }).Distinct().ToList();
        }

        public IEnumerable<tblTicketStatus> GetVihicle(DateTime? fda, DateTime? tda, string location)
        {
            return _statusRepository.GetMulti(c => (c.ActionValue == location || c.ActionValue== "GATEOUT") && c.TicketCreatedAt.Value >= fda && c.TicketCreatedAt.Value <= tda && c.ActionStatus.Value == 1);
        }

        public IEnumerable<tblTicketStatus> GetVihicleCheckIn(DateTime? fda, DateTime? tda, string location)
        {
            return _statusRepository.GetMulti(c =>c.ActionCode== "CHECK_IN" &&  (c.ActionValue == "GATEIN_T1" || c.ActionValue == "GATEIN_T2") && c.TicketCreatedAt.Value >= fda && c.TicketCreatedAt.Value <= tda && c.ActionStatus.Value == 1);
        }

        public IEnumerable<tblTicketStatus> GetVihicleCheckInByDate(DateTime? fda, string location)
        {
            return _statusRepository.GetMulti(c => c.ActionValue != "GATEOUT" && c.TicketCreatedAt.Value >= fda && c.TicketCreatedAt.Value <= fda && c.ActionStatus.Value == 1);
        }

        public IEnumerable<tblTicketStatus> GetVihicleCheckInDockT2()
        {
            return _statusRepository.GetMulti(c => c.ActionValue == "CHECK_IN_DOCK" && c.ActionValue.Contains("DOCK_T2") && (c.ActionDateTime.Day == DateTime.Now.Day || c.ActionDateTime.Day == DateTime.Now.Day - 1) && (c.ActionDateTime.Month == DateTime.Now.Month || c.ActionDateTime.Month == DateTime.Now.Month - 1)
            && c.ActionDateTime.Year == DateTime.Now.Year && c.ActionStatus == 1);
        }

        public IEnumerable<tblTicketStatus> GetVihicleCheckOut(DateTime? fda, string location)
        {
            return _statusRepository.GetMulti(c => c.ActionDateTime.Day == DateTime.Now.Day && c.ActionDateTime.Month == DateTime.Now.Month && c.ActionDateTime.Year == DateTime.Now.Year && c.ActionStatus == 1 && c.TicketType == 2 && c.ActionCode== "CHECK_IN").Select(c => new tblTicketStatus()
            {
                TicketUID = c.TicketUID,
                ActionCode = c.ActionCode,
                ActionValue = c.ActionValue
            }).Distinct().ToList();
        }

        public IEnumerable<tblTicketStatus> GetVihicleCheckOut(DateTime? fda, DateTime? tda, string location)
        {
            return _statusRepository.GetMulti(c => c.ActionValue == location && c.TicketCreatedAt.Value >= fda && c.TicketCreatedAt.Value <= tda && c.ActionStatus.Value == 1);
        }

        public IEnumerable<tblTicketStatus> GetVihicleCheckOutByDate(DateTime? fda, string location)
        {
            return _statusRepository.GetMulti(c => c.ActionValue == location && c.TicketCreatedAt.Value >= fda && c.TicketCreatedAt.Value <= fda && c.ActionStatus.Value == 1);
        }

        public IEnumerable<tblTicketStatus> GetVihicleMonthly(DateTime? fda, DateTime? tda, string location)
        {
            return _statusRepository.GetMulti(c => c.ActionDateTime >= fda && c.ActionDateTime <= tda && c.ActionStatus.Value == 1 && c.TicketType==2);
        }

        public void Save()
        {
            _unitOfWork.CommitPXK();
        }
        public void Insert(tblTicketStatus ticket)
        {
            _statusRepository.Add(ticket);
        }
        public void Update(tblTicketStatus ticket)
        {
            _statusRepository.Update(ticket);
        }

    }
  
}
