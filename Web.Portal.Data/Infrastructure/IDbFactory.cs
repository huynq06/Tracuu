using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Data.Infrastructure
{
    public interface IDbFactory : IDisposable
    {
        CMSDbContext Init();
        FlightControlDBContext InitflightControl();
        EInvoiceDbContext InitEInvoice();
        PXKControlDBContext InitpxkControl();
        HermesDBContext InitHermes();
        CustomServiceDBContext InitCustomService();
        AlsConnectDbContext InitAls();
    }
}
