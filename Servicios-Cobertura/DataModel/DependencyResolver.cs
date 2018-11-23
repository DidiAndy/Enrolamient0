using DataModel.GenericRepository;
using Resolver;
using System.ComponentModel.Composition;

namespace DataModel
{
    [Export(typeof(IComponent))]
    public class DependencyResolver : IComponent
    {
        public void SetUp(IRegisterComponent registerComponent)
        {
            registerComponent.RegisterType<IGenericRepository, GenericRepository<EnrolamientoEntities>>();
        }
    }
}
