using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Data.Infrastructure
{
    public interface IUnitOfWork
    {
        void Commit();
        void CommitFlight();
        void CommitEInvoice();
        void CommitPXK();
        void CommitHermes();
        void CommitCustomService();
        void CommitAls();
    }
}
