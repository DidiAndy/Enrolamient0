using System.Web.Http;
using Unity;
using Unity.WebApi;
using Resolver;
namespace WebAPI
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);

            RegisterTypes(container);
        }
        private static void RegisterTypes(IUnityContainer container)
        {
            ComponentLoader.LoadContainer(container, ".\\bin", "DataModel.dll");
            ComponentLoader.LoadContainer(container, ".\\bin", "BusinessService.dll");
        }
    }
}