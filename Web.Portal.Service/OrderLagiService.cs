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
    public interface IOrderLagiService
    {
        IEnumerable<OrderLagi> GetAll(Guid userId);
        OrderLagi GetById(int id);
        void Update(OrderLagi order);
        void Add(OrderLagi order);
        void Delete(int id);
        void Save();
    }
    public class OrderLagiService : IOrderLagiService
    {
        IOrderLagiRepository _orderRepository;
        IUnitOfWork _unitOfWork;
        public OrderLagiService(IOrderLagiRepository orderRepository, IUnitOfWork unitOfWork)
        {
            this._orderRepository = orderRepository;
            this._unitOfWork = unitOfWork;
        }
        public void Add(OrderLagi order)
        {
            _orderRepository.Add(order);
        }

        public void Delete(int id)
        {
            _orderRepository.Delete(id);
        }

        public IEnumerable<OrderLagi> GetAll(Guid userId)
        {
            return _orderRepository.GetMulti(c => c.UserID == userId);
        }

        public OrderLagi GetById(int id)
        {
            return _orderRepository.GetSingleById(id);
        }

        public void Save()
        {
            _unitOfWork.CommitFlight();
        }

        public void Update(OrderLagi order)
        {
            _orderRepository.Update(order);
        }
    }
}
