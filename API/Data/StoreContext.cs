using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : DbContext
    {
        //get pass the DbContext (Migration initialCreate)
        public StoreContext(DbContextOptions options) : base(options)
        {
        }


        //DB set
        public DbSet<Product> Products { get; set; } //product table
        public DbSet<Basket> Baskets { get; set; }//cart
    }
}