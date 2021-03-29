using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace SwsPN.Models
{
    public partial class Operations
    {
        public Operations()
        {
            ErrWrs = new HashSet<ErrWrs>();
        }

        public int Id { get; set; }
        public string OperationNum { get; set; }
        public string OperationName { get; set; }

        public virtual ICollection<ErrWrs> ErrWrs { get; set; }
    }
}
