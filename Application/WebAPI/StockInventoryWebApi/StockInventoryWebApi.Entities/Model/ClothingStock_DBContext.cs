using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace StockInventoryWebApi.Web.Models
{
    public partial class ClothingStock_DBContext : DbContext
    {
        public ClothingStock_DBContext()
        {
        }

        public ClothingStock_DBContext(DbContextOptions<ClothingStock_DBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<Supplier> Supplier { get; set; }
        public virtual DbSet<SystemUser> SystemUser { get; set; }
        public virtual DbSet<UserStockInOutProduct> UserStockInOutProduct { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=ClothingStock_DB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasIndex(e => e.Email)
                    .HasName("UQ__Customer__A9D105345639AA7C")
                    .IsUnique();

                entity.Property(e => e.CustomerId)
                    .HasColumnName("CustomerID")
                    .ValueGeneratedNever();

                entity.Property(e => e.CustomerName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Location)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Customer)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("CustomerFK");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.ProductId)
                    .HasColumnName("ProductID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Category)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ProductName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Size)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.HasIndex(e => e.Email)
                    .HasName("UQ__Supplier__A9D10534F8983290")
                    .IsUnique();

                entity.Property(e => e.SupplierId)
                    .HasColumnName("SupplierID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.SupplierName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Supplier)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("SupplierFK");
            });

            modelBuilder.Entity<SystemUser>(entity =>
            {
                entity.HasKey(e => e.EmployeeId)
                    .HasName("PK__System_U__7AD04FF128BD4F88");

                entity.ToTable("System_User");

                entity.HasIndex(e => e.Email)
                    .HasName("UQ__System_U__A9D105346EB92252")
                    .IsUnique();

                entity.HasIndex(e => e.Pin)
                    .HasName("UQ__System_U__C577552BD6F11AE1")
                    .IsUnique();

                entity.Property(e => e.EmployeeId)
                    .HasColumnName("EmployeeID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Fname)
                    .IsRequired()
                    .HasColumnName("FName")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Lname)
                    .HasColumnName("LName")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Pin).HasColumnName("PIN");

                entity.Property(e => e.Role)
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserStockInOutProduct>(entity =>
            {
                entity.HasKey(e => e.EmployeeId)
                    .HasName("PK__User_Sto__7AD04FF11561C188");

                entity.ToTable("User_StockIN_OUT_Product");

                entity.HasIndex(e => e.TransactionNumber)
                    .HasName("UQ__User_Sto__E733A2BF7114C4D4")
                    .IsUnique();

                entity.Property(e => e.EmployeeId)
                    .HasColumnName("EmployeeID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Comments)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Employee)
                    .WithOne(p => p.UserStockInOutProduct)
                    .HasForeignKey<UserStockInOutProduct>(d => d.EmployeeId)
                    .HasConstraintName("Stock_Employee");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.UserStockInOutProduct)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("Stock_Product");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
