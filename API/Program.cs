using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {

        //get ready to be hosted from server
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using var scope = host.Services.CreateScope(); //dispose the any resources
            var context = scope.ServiceProvider.GetRequiredService<StoreContext>(); //DB setting
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
            try
            {
                context.Database.Migrate();
                DbInitializer.DbInitialize(context); //dummy data
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "problem migrating data");
            }

            host.Run();
        }

        //startup config and service
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
