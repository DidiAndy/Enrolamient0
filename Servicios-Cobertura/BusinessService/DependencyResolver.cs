using BusinessService;
using Resolver;
using System.ComponentModel.Composition;

namespace BussinessServices
{
    [Export(typeof(IComponent))]
    public class DependencyResolver : IComponent
    {
        public void SetUp(IRegisterComponent registerComponent)
        {
            registerComponent.RegisterType<ICoberturaService, CoberturaService>();
            registerComponent.RegisterType<ITipoCuentaService, TipoCuentaService>();
            registerComponent.RegisterType<IPlanService,PlanService>();
            registerComponent.RegisterType<IBancoService, BancoService>();
            registerComponent.RegisterType<IParentescoService, ParentescoService>();
            registerComponent.RegisterType<IEmpresaService, EmpresaService>();
            

        }
    }
}
