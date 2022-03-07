using System;
using System.Collections.Generic;

namespace StockInventoryWebApi.Web.Models
{
    public partial class Product
    {
        public Product()
        {
            Customer = new HashSet<Customer>();
            Supplier = new HashSet<Supplier>();
            UserStockInOutProduct = new HashSet<UserStockInOutProduct>();
        }

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public string Size { get; set; }
        public string Category { get; set; }
        public int Quantity { get; set; }

        public virtual ICollection<Customer> Customer { get; set; }
        public virtual ICollection<Supplier> Supplier { get; set; }
        public virtual ICollection<UserStockInOutProduct> UserStockInOutProduct { get; set; }
    }
}
