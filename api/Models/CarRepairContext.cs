using Microsoft.EntityFrameworkCore;

namespace CarRepairApi.Models
{
    public class CarRepairContext : DbContext
    {
        public DbSet<CarRepair> CarRepairs { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;

        public CarRepairContext(DbContextOptions<CarRepairContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<CarRepair>(entity =>
            {
                entity.ToTable("CarRepairs");
                entity.Property(e => e.StartDate).HasColumnType("date");
                entity.Property(e => e.EndDate).HasColumnType("date");
            });
        }
    }
}
