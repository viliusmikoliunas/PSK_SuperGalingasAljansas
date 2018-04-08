using Microsoft.AspNetCore.Mvc;

namespace Eshop.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return File("/dist/index.html", "text/html");
        }
    }
}
