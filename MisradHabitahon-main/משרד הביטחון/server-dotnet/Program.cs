using Microsoft.EntityFrameworkCore;
using server_dotnet;


var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// Add DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();


app.UseHttpsRedirection();

// Use CORS
app.UseCors("AllowAll");

app.UseAuthorization();


// Seed data
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
    if (!db.Categories.Any())
    {
        var cat1 = new server_dotnet.Models.Category { Name = "פירות", Products = new List<server_dotnet.Models.Product>() };
        var cat2 = new server_dotnet.Models.Category { Name = "ירקות", Products = new List<server_dotnet.Models.Product>() };
        cat1.Products.Add(new server_dotnet.Models.Product { Name = "תפוח" });
        cat1.Products.Add(new server_dotnet.Models.Product { Name = "בננה" });
        cat2.Products.Add(new server_dotnet.Models.Product { Name = "עגבניה" });
        cat2.Products.Add(new server_dotnet.Models.Product { Name = "מלפפון" });
        db.Categories.AddRange(cat1, cat2);
        db.SaveChanges();
    }
}

app.MapControllers();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
