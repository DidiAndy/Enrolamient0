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
    public class PlanService : IPlanService
    {
        private IGenericRepository _repository;

        public PlanService() => _repository = new GenericRepository<EnrolamientoEntities>(new EnrolamientoEntities());

        List<PlanEntity> IPlanService.GetPlanes()
        {
            List<Plan> list = null;
            List<PlanEntity> asd = null;
            list = _repository.GetAll<Plan>().ToList();
            asd = list.Select(x => EntityMapper.planMapper.Map<Plan, PlanEntity>(x)).ToList();
            return asd;
        }
    }
}
