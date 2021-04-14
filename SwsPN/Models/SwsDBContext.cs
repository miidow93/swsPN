using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace SwsPN.Models
{
    public partial class SwsDBContext : DbContext
    {
        public SwsDBContext()
        {
        }

        public SwsDBContext(DbContextOptions<SwsDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Components> Components { get; set; }
        public virtual DbSet<ErrWrs> ErrWrs { get; set; }
        public virtual DbSet<Operations> Operations { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("data source=.; initial catalog=db_sws; integrated security=true;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Components>(entity =>
            {
                entity.ToTable("components");

                entity.HasIndex(e => e.SwsPn)
                    .HasName("uc_swsPN")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ComponentSheet)
                    .HasColumnName("componentSheet")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Family)
                    .HasColumnName("family")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Npa)
                    .HasColumnName("npa")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.PartsName)
                    .HasColumnName("partsName")
                    .IsUnicode(false);

                entity.Property(e => e.ProtoPn)
                    .HasColumnName("protoPN")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Size)
                    .HasColumnName("size")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Supplier)
                    .HasColumnName("supplier")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.SupplierPn)
                    .HasColumnName("supplierPN")
                    .IsUnicode(false);

                entity.Property(e => e.SwsPn)
                    .IsRequired()
                    .HasColumnName("swsPN")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasColumnName("type")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ErrWrs>(entity =>
            {
                entity.ToTable("err_wrs");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AreaC)
                    .HasColumnName("areaC")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CheckCode)
                    .HasColumnName("checkCode")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.ClassFlag1)
                    .HasColumnName("classFlag1")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.ClassFlag2)
                    .HasColumnName("classFlag2")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.ClassFlag3)
                    .HasColumnName("classFlag3")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.ClassFlag4)
                    .HasColumnName("classFlag4")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.ClassFlag5)
                    .HasColumnName("classFlag5")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.ClassFlag6)
                    .HasColumnName("classFlag6")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.CustC)
                    .HasColumnName("custC")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.DateError)
                    .HasColumnName("dateError")
                    .HasColumnType("datetime");

                entity.Property(e => e.DateReported)
                    .HasColumnName("dateReported")
                    .HasColumnType("datetime");

                entity.Property(e => e.Drawing)
                    .HasColumnName("drawing")
                    .IsUnicode(false);

                entity.Property(e => e.OperationNum)
                    .HasColumnName("operationNum")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PartType)
                    .HasColumnName("partType")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PrdLevel)
                    .HasColumnName("prdLevel")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PrdNum)
                    .HasColumnName("prdNum")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Reported).HasColumnName("reported");

                entity.Property(e => e.SwsName)
                    .HasColumnName("swsName")
                    .IsUnicode(false);

                entity.Property(e => e.SwsPn)
                    .HasColumnName("swsPN")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.TempMh)
                    .HasColumnName("tempMH")
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.UrlDirectory)
                    .HasColumnName("urlDirectory")
                    .IsUnicode(false);

                entity.Property(e => e.WinUserId)
                    .HasColumnName("winUserID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.OperationNumNavigation)
                    .WithMany(p => p.ErrWrs)
                    .HasPrincipalKey(p => p.OperationNum)
                    .HasForeignKey(d => d.OperationNum)
                    .HasConstraintName("fk_opNum");

                entity.HasOne(d => d.SwsPnNavigation)
                    .WithMany(p => p.ErrWrs)
                    .HasPrincipalKey(p => p.SwsPn)
                    .HasForeignKey(d => d.SwsPn)
                    .HasConstraintName("fk_swsPN");
            });

            modelBuilder.Entity<Operations>(entity =>
            {
                entity.ToTable("operations");

                entity.HasIndex(e => e.OperationNum)
                    .HasName("uc_opNum")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.OperationName)
                    .HasColumnName("operationName")
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.OperationNum)
                    .IsRequired()
                    .HasColumnName("operationNum")
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Roles>(entity =>
            {
                entity.ToTable("roles");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Libelle)
                    .HasColumnName("libelle")
                    .HasMaxLength(80)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.ToTable("users");

                entity.HasIndex(e => e.Username)
                    .HasName("uc_username")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.IdRole).HasColumnName("id_role");

                entity.Property(e => e.Password).HasColumnName("password");

                entity.Property(e => e.Salt).HasColumnName("salt");

                entity.Property(e => e.Username)
                    .HasColumnName("username")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdRoleNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.IdRole)
                    .HasConstraintName("fk_role");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
