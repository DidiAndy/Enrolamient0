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
    public class BancoService : IBancoService
    {
        private IGenericRepository _repository;

        public BancoService() => _repository = new GenericRepository<EnrolamientoEntities>(new EnrolamientoEntities());

       

        List<BancoEntity> IBancoService.GetBanco()
        {
            List<Banco> list = null;
            List<BancoEntity> banco = null;
            list = _repository.GetAll<Banco>().ToList();
            banco = list.Select(x => EntityMapper.titularMapper.Map<Banco, BancoEntity>(x)).OrderBy(x => x.descripcion).ToList();
            return banco;
        }
    }
}
