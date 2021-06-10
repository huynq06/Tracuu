using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Portal.Common.ViewModel;
using Web.Portal.Data.Repositories;

namespace Web.Portal.Service
{
    public interface IStatisticService
    {
        IEnumerable<RemainStatisticViewModel> GetRemainTotalStatistic();
    }
    public class StatisticService : IStatisticService
    {
        IFlightRepository _flightRepository;
        public StatisticService(IFlightRepository flightRepository)
        {
            _flightRepository = flightRepository;
        }

        public IEnumerable<RemainStatisticViewModel> GetRemainTotalStatistic()
        {
            return _flightRepository.GetRemainTotalStatistic();
        }
    }
}
