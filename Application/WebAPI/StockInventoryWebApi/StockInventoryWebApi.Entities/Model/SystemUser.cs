using System;
using System.Collections.Generic;

namespace StockInventoryWebApi.Web.Models
{
    public partial class SystemUser
    {
        public int EmployeeId { get; set; }
        public string Fname { get; set; }
        public string Lname { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public int Pin { get; set; }
        public string Phone { get; set; }

        public virtual UserStockInOutProduct UserStockInOutProduct { get; set; }
    }
}
