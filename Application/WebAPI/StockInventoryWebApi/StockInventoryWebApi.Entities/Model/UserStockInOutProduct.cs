using System;
using System.Collections.Generic;

namespace StockInventoryWebApi.Web.Models
{
    public partial class UserStockInOutProduct
    {
        public int EmployeeId { get; set; }
        public int? ProductId { get; set; }
        public int Quantity { get; set; }
        public DateTime Date { get; set; }
        public int TransactionNumber { get; set; }
        public string Comments { get; set; }
        public string Type { get; set; }

        public virtual SystemUser Employee { get; set; }
        public virtual Product Product { get; set; }
    }
}
