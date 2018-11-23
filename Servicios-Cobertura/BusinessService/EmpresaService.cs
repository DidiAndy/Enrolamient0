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
    public class EmpresaService : IEmpresaService
    {
        private IGenericRepository _repository;

        public EmpresaService() => _repository = new GenericRepository<EnrolamientoEntities>(new EnrolamientoEntities());

        List<EmpresaEntity> IEmpresaService.GetEmpresa(string id)
        {
            List<Empresa> list = null;
            List<EmpresaEntity> nueva = null;
            list = _repository.Get<Empresa>().Where(g => g.descripcion.ToLower() == id).ToList();
            nueva = list.Select(x => EntityMapper.EmpresaMapper.Map<Empresa, EmpresaEntity>(x)).ToList();

            return nueva;
        }
        List<EmpresaEntity> IEmpresaService.GetEmpresas()
        {
            List<Empresa> list = null;
            List<EmpresaEntity> nueva = null;
            list = _repository.GetAll<Empresa>().ToList();
            nueva = list.Select(x => EntityMapper.EmpresaMapper.Map<Empresa, EmpresaEntity>(x)).ToList();
            return nueva;
        }
    }
    

}
