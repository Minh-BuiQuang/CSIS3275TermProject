using System;
using System.Collections.Generic;

namespace StockInventoryWebApi.Web.Models
{
    public partial class Supplier
    {
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int ProductId { get; set; }

        public virtual Product Product { get; set; }
    }
}
