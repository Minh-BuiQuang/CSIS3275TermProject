using System;
using System.Collections.Generic;

namespace StockInventoryWebApi.Web.Models
{
    public partial class Customer
    {
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string Location { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int ProductId { get; set; }

        public virtual Product Product { get; set; }
    }
}
