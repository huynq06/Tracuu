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
    public interface IOrderLagiDetailService
    {
        IEnumerable<OrderLagiDetail> GetAll();
        IEnumerable<OrderLagiDetail> GetByOrderId(Guid orderId);
        OrderLagiDetail GetById(int id);
        void Update(OrderLagiDetail orderDetail);
        void Add(OrderLagiDetail orderDetail);
        void Delete(int id);
        void Save();
    }
    public class OrderLagiDetailService : IOrderLagiDetailService
    {
        IOrderLagiDetailRepository _orderDetailRepository;
        IUnitOfWork _unitOfWork;
        public OrderLagiDetailService(IOrderLagiDetailRepository orderDetailRepository, IUnitOfWork unitOfWork)
        {
            this._orderDetailRepository = orderDetailRepository;
            this._unitOfWork = unitOfWork;
        }
        public void Add(OrderLagiDetail orderDetail)
        {
            _orderDetailRepository.Add(orderDetail);
        }

        public void Delete(int id)
        {
            _orderDetailRepository.Delete(id);
        }

        public IEnumerable<OrderLagiDetail> GetAll()
        {
           return _orderDetailRepository.GetAll();
        }

        public OrderLagiDetail GetById(int id)
        {
            return _orderDetailRepository.GetSingleById(id);
        }

        public IEnumerable<OrderLagiDetail> GetByOrderId(Guid orderId)
        {
            return _orderDetailRepository.GetMulti(c => c.OrderID == orderId);
        }

        public void Save()
        {
            _unitOfWork.CommitFlight();
        }

        public void Update(OrderLagiDetail orderDetail)
        {
            _orderDetailRepository.Update(orderDetail);
        }
    }
}
