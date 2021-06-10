using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using System.Reflection;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Data.Repositories;
using Web.Portal.Data;
using Web.Portal.Service;
using System.Web.Mvc;
using System.Linq;
using System.Web.Http;

[assembly: OwinStartup(typeof(Web.Portal.App_Start.Startup))]

namespace Web.Portal.App_Start
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigAutofac(app);
            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
        }
        private void ConfigAutofac(IAppBuilder app)
        {
            var builder = new ContainerBuilder();
            var asms = AppDomain.CurrentDomain.GetAssemblies();
            Type objectType = (from asm in asms
                               from type in asm.GetTypes()
                               where type.IsClass && type.Name == "BaseController"
                               select type).Single();
            object obj = Activator.CreateInstance(objectType);
            builder.RegisterControllers(objectType.Assembly);
          //  Register your Web API controllers.
           Type objectTypeApi = (from asm in asms
                                 from type in asm.GetTypes()
                                 where type.IsClass && type.Name == "IssueApiController"
                                 select type).Single();
            //  object objApi = Activator.CreateInstance(objectTypeApi);
            builder.RegisterApiControllers(objectTypeApi.Assembly); //Register WebApi Controllers

            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().InstancePerRequest();
            builder.RegisterType<DbFactory>().As<IDbFactory>().InstancePerRequest();

            builder.RegisterType<CMSDbContext>().AsSelf().InstancePerRequest();
            //Asp.net identtity
            //builder.RegisterType<ApplicationUserStore>().As<IUserStore<ApplicationUser>>().InstancePerRequest();
            //builder.RegisterType<ApplicationUserManager>().AsSelf().InstancePerRequest();
            //builder.RegisterType<ApplicationSignInManager>().AsSelf().InstancePerRequest();
            //builder.Register(c => HttpContext.Current.GetOwinContext().Authentication).InstancePerRequest();
            //builder.Register(c => app.GetDataProtectionProvider()).InstancePerRequest();

            // Repositories
            builder.RegisterAssemblyTypes(typeof(ErrorRepository).Assembly)
                .Where(t => t.Name.EndsWith("Repository"))
                .AsImplementedInterfaces().InstancePerRequest();

            // Services
            builder.RegisterAssemblyTypes(typeof(ErrorService).Assembly)
               .Where(t => t.Name.EndsWith("Service"))
               .AsImplementedInterfaces().InstancePerRequest();
            Autofac.IContainer container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver((IContainer)container); //Set the WebApi DependencyResolver
        }
    }
}
