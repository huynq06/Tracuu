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
    public interface ILabsFavouriteService
    {
        LabsFavourite GetById(int id);
        LabsFavourite GetByLabId(string lab_Idents);
        void Update(LabsFavourite lab);
        void Add(LabsFavourite lab);
        void Delete(int id);
        void Save();
    }
    public class LabsFavouriteService : ILabsFavouriteService
    {
        ILabsFavouriteRepository _labFavouriteRepository;
        IUnitOfWork _unitOfWork;
        public LabsFavouriteService(ILabsFavouriteRepository labFavouriteRepository, IUnitOfWork unitOfWork)
        {
            this._labFavouriteRepository = labFavouriteRepository;
            this._unitOfWork = unitOfWork;
        }

        public LabsFavourite GetById(int id)
        {
            return _labFavouriteRepository.GetSingleById(id);
        }

        public LabsFavourite GetByLabId(string lab_Idents)
        {
            return _labFavouriteRepository.GetSingleByCondition(c => c.Lab_Ident == lab_Idents);
        }

        public void Update(LabsFavourite lab)
        {
            _labFavouriteRepository.Update(lab);
        }

        public void Add(LabsFavourite lab)
        {
            _labFavouriteRepository.Add(lab);
        }

        public void Delete(int id)
        {
            _labFavouriteRepository.Delete(id);
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }
    }
}
