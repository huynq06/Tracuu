using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Web.Portal.App_Start;
using Web.Portal.Data;
using Web.Portal.Data.Infrastructure;
using Web.Portal.Data.Repositories;
using Web.Portal.Service;

namespace Web.Portal
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            //RegisterAutofac();
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            
            WebMatrix.WebData.WebSecurity.InitializeDatabaseConnection("DataConnection", "Users", "Id", "UserName", autoCreateTables: WebMatrix.WebData.WebSecurity.Initialized);
        }
        private void RegisterAutofac()
        {
            var builder = new ContainerBuilder();

           /* builder.RegisterControllers(Assembly.GetExecutingAssembly())*/;
            // Register your Web API controllers.
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly()); //Register WebApi Controllers
            //Assembly asm = null;
            //Type type = Type.GetType("Web.Portal.Controller.BaseController, Web.Portal, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null");
            //if (type != null)
            //{
            //    asm = type.Assembly;
            //}
            var asms = AppDomain.CurrentDomain.GetAssemblies();
            Type objectType = (from asm in asms
                               from type in asm.GetTypes()
                               where type.IsClass && type.Name == "BaseController"
                               select type).Single();
            object obj = Activator.CreateInstance(objectType);
            builder.RegisterControllers(objectType.Assembly);
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
        private static Assembly[] GetAssemblies(bool isController)
        {
            var path = HttpContext.Current.Server.MapPath("~/Bin");

            return isController
                ? Directory.GetFiles(path, "*.dll").Where(x => x.Contains(".Controllers")).Select(Assembly.LoadFrom).ToArray()
                : Directory.GetFiles(path, "*.dll").Where(x => !x.Contains(".Controllers")).Select(Assembly.LoadFrom).ToArray();
        }
    }
}
