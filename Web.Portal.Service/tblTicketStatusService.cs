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
        IEnumerable<tblTicketStatus> GetVihicle(DateTime? fda, DateTime? tda, string location);
        IEnumerable<tblTicketStatus> GetVihicleMonthly(DateTime? fda, DateTime? tda, string location);
        IEnumerable<tblTicketStatus> GetVihicleCheckIn(DateTime? fda, DateTime? tda, string location);
        IEnumerable<tblTicketStatus> GetVihicleCheckInByDate(DateTime? fda, string location);
        IEnumerable<tblTicketStatus> GetVihicleCheckOut(DateTime? fda, DateTime? tda, string location);
        IEnumerable<tblTicketStatus> GetVihicleCheckOutByDate(DateTime? fda, string location);
        IEnumerable<Guid> GetListTicket(DateTime? fda, DateTime? tda, string location);
        IEnumerable<Guid> GetListTicketMonthy(DateTime? fda, DateTime? tda, string location);
        IEnumerable<tblTicketStatus> GetListTicketMonthyCheckIn();
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

        public IEnumerable<tblTicketStatus> GetListTicketMonthyCheckIn()
        {
            return _statusRepository.GetMulti(c => c.ActionDateTime.Day == DateTime.Now.Day && c.ActionDateTime.Month == DateTime.Now.Month && c.ActionDateTime.Year == DateTime.Now.Year && c.ActionStatus == 1).Select(c => new tblTicketStatus()
            {
                TicketUID = c.TicketUID,
                ActionCode = c.ActionCode,
                ActionValue = c.ActionValue,
                BienSoXe = c.BienSoXe,
            }).Distinct().ToList();
        }

        public IEnumerable<tblTicketStatus> GetVihicle(DateTime? fda, DateTime? tda, string location)
        {
            return _statusRepository.GetMulti(c => (c.ActionValue == location || c.ActionValue== "GATEOUT") && c.TicketCreatedAt.Value >= fda && c.TicketCreatedAt.Value <= tda && c.ActionStatus.Value == 1);
        }

        public IEnumerable<tblTicketStatus> GetVihicleCheckIn(DateTime? fda, DateTime? tda, string location)
        {
            return _statusRepository.GetMulti(c => c.ActionValue != "GATEOUT" && c.TicketCreatedAt.Value >= fda && c.TicketCreatedAt.Value <= tda && c.ActionStatus.Value == 1);
        }

        public IEnumerable<tblTicketStatus> GetVihicleCheckInByDate(DateTime? fda, string location)
        {
            return _statusRepository.GetMulti(c => c.ActionValue != "GATEOUT" && c.TicketCreatedAt.Value >= fda && c.TicketCreatedAt.Value <= fda && c.ActionStatus.Value == 1);
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

        public void Update(tblTicketStatus ticket)
        {
            _statusRepository.Update(ticket);
        }

    }
  
}
