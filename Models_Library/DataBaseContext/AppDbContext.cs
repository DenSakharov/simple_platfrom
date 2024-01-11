using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models_Library.Models;

namespace Models_Library.DataBaseContext
{
    public class AppDbContext : DbContext
    {
        private readonly ILogger<AppDbContext> _logger;
        public AppDbContext(DbContextOptions<AppDbContext> options, ILogger<AppDbContext> logger)
        : base(options)
        {
            _logger = logger;
        }

        public DbSet<Person> Persons { get; set; } // Замените Person на вашу модель пользователя

        // Можете добавить другие DbSet для других сущностей, если они есть

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            LogDatabaseOperations();
            return base.SaveChangesAsync(cancellationToken);
        }

        private void LogDatabaseOperations()
        {
            var entries = ChangeTracker.Entries().ToList();

            foreach (var entry in entries)
            {
                _logger.LogInformation($"Entity {entry.Entity.GetType().Name} - {entry.State}");
            }
        }
    }
}
