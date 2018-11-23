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
    public class TipoCuentaService : ITipoCuentaService
    {
        private IGenericRepository _repository;

        public TipoCuentaService() => _repository = new GenericRepository<EnrolamientoEntities>(new EnrolamientoEntities());

        List<TipoCuentaEntity> ITipoCuentaService.GetTipoCuenta()
        {
            List<TipoCuenta> list = null;
            List<TipoCuentaEntity> retorno = null;
            list = _repository.GetAll<TipoCuenta>().ToList();
            retorno = list.Select(x => EntityMapper.planMapper.Map<TipoCuenta, TipoCuentaEntity>(x)).ToList();
            return retorno;
        }
    }
}
