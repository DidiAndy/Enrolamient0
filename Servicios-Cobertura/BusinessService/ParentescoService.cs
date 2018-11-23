using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessService.CoberturaServ;
using BusinnesEntities;
using BussinessServices.Mappers;
using DataModel;
using DataModel.GenericRepository;

namespace BusinessService
{
    public class ParentescoService : IParentescoService
    {
        private IGenericRepository _repository;

        public ParentescoService() => _repository = new GenericRepository<EnrolamientoEntities>(new EnrolamientoEntities());

        List<ParentescoEntity> IParentescoService.GetParentesco()
        {
            List<Parentesco> list = null;
            List<ParentescoEntity> lista = null;
            list = _repository.GetAll<Parentesco>().ToList();
            lista = list.Select(x => EntityMapper.ParentescoMapper.Map<Parentesco, ParentescoEntity>(x)).ToList();
            return lista;
        }
    }
}
