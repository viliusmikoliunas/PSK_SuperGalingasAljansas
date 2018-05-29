using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.DataContracts.DataTransferObjects.Responses
{
    public class PaymentResponse
    {
        public string Id { get; set; }
        public DateTime Created_At { get; set; }
        public int Amount { get; set; }
        public string Number { get; set; }
        public string Holder { get; set; }
        public int Exp_Year { get; set; }
        public int Exp_Month { get; set; }
        public string Cvv { get; set; }
    }
}
