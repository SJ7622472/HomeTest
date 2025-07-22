using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server_dotnet.Models;

namespace server_dotnet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CategoriesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategoriesWithProducts()
        {
            var categories = await _context.Categories.Include(c => c.Products).ToListAsync();
            return Ok(categories);
        }
    }
}
