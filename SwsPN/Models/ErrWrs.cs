using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace SwsPN.Models
{
    public partial class ErrWrs
    {
        public int Id { get; set; }
        public string CheckCode { get; set; }
        public string SwsPn { get; set; }
        public string SwsName { get; set; }
        public string PartType { get; set; }
        public string ClassFlag1 { get; set; }
        public string ClassFlag2 { get; set; }
        public string ClassFlag3 { get; set; }
        public string ClassFlag4 { get; set; }
        public string ClassFlag5 { get; set; }
        public string ClassFlag6 { get; set; }
        public string TempMh { get; set; }
        public string OperationNum { get; set; }
        public string CustC { get; set; }
        public string PrdNum { get; set; }
        public string PrdLevel { get; set; }
        public string AreaC { get; set; }
        public string WinUserId { get; set; }
        public DateTime? DateError { get; set; }
        public string UrlDirectory { get; set; }
        public bool? Reported { get; set; }
        public DateTime? DateReported { get; set; }
        public string Drawing { get; set; }

        public virtual Operations OperationNumNavigation { get; set; }
        public virtual Components SwsPnNavigation { get; set; }
    }
}
