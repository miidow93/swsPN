using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace SwsPN.Models
{
    public partial class Components
    {
        public Components()
        {
            ErrWrs = new HashSet<ErrWrs>();
        }

        public int Id { get; set; }
        public string ComponentSheet { get; set; }
        public string ProtoPn { get; set; }
        public string SwsPn { get; set; }
        public string PartsName { get; set; }
        public string Type { get; set; }
        public string Family { get; set; }
        public string Size { get; set; }
        public string Supplier { get; set; }
        public string SupplierPn { get; set; }
        public string Npa { get; set; }

        public virtual ICollection<ErrWrs> ErrWrs { get; set; }
    }
}
