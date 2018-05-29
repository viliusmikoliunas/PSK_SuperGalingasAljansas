using System.ComponentModel.DataAnnotations;

namespace Eshop.DataContracts.DataTransferObjects.Requests
{
    public class PaymentRequest
    {
        //https://docs.microsoft.com/en-us/aspnet/mvc/overview/older-versions/mvc-music-store/mvc-music-store-part-6
        [Range(1,999999)]
        public int Amount { get; set; }

        [MinLength(16)]
        [MaxLength(16)]
        public string Number { get; set; }

        [MinLength(2)]
        [MaxLength(32)]
        public string Holder { get; set; }

        [Range(1970,2100)]
        public int Exp_Year { get; set; }

        [Range(1,12)]
        public int Exp_Month { get; set; }

        [MinLength(3)]
        [MaxLength(3)]
        public string Cvv { get; set; }
    }
}
