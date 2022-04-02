using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using StockInventoryWebApi.Web.Models;

namespace StockInventoryWebApi.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            var service = (IServiceScopeFactory)host.Services.GetService(typeof(IServiceScopeFactory));
            using (var db = service.CreateScope().ServiceProvider.GetService<ClothingStock_DBContext>())
            {
                db.Database.Migrate();
            }
                
                
              host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
