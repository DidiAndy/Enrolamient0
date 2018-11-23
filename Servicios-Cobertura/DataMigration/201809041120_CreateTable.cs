using FluentMigrator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataMigration
{
    [Migration(201809041120)]
    public class CreateTable : Migration
    {
        public override void Down()
        {

        }

        public override void Up()
        {
            Create.Table("Empresa")
                .WithColumn("sec_empresa").AsInt32().Identity().PrimaryKey()
                .WithColumn("descripcion").AsString(100)
                .WithColumn("logotipo").AsString(100)
                .WithColumn("estado").AsInt16().WithDefaultValue(1);
           

            Create.Table("Titular")
                .WithColumn("sec_titular").AsInt32().Identity().PrimaryKey()
                .WithColumn("cedula_titular").AsString(15)
                .WithColumn("primer_nombre").AsString(100)
                .WithColumn("segundo_nombre").AsString(100)
                .WithColumn("primer_apellido").AsString(100)
                .WithColumn("segundo_apellido").AsString(100)
                .WithColumn("sec_plan").AsInt32()
                .WithColumn("valor_total").AsDecimal(10,2)
                .WithColumn("sec_tipoCuenta").AsInt32()
                .WithColumn("noCuenta").AsString(100)
                .WithColumn("div_pago").AsString(100)
                .WithColumn("sec_banco").AsInt32()
                .WithColumn("sec_empresa").AsInt32()
                .WithColumn("sec_tipoDoc").AsInt32()
                .WithColumn("fecha_Nacimiento").AsDateTime()
                .WithColumn("genero").AsInt32()
                .WithColumn("fecha_Creacion").AsDateTime()
                .WithColumn("estado").AsInt16().WithDefaultValue(1);

            Create.Table("Dependiente")
                .WithColumn("sec_dependiente").AsInt32().Identity().PrimaryKey()
                .WithColumn("cedula_dependiente").AsString(15)
                .WithColumn("primer_nombre").AsString(100)
                .WithColumn("segundo_nombre").AsString(100)
                .WithColumn("primer_apellido").AsString(100)
                .WithColumn("segundo_apellido").AsString(100)
                .WithColumn("sec_parentesco").AsInt32()
                .WithColumn("sec_titular").AsInt32()
                .WithColumn("sec_tipoDoc").AsInt32()
                .WithColumn("fecha_Nacimiento").AsDateTime()
                .WithColumn("genero").AsInt32()
                .WithColumn("fecha_Creacion").AsDateTime()
                .WithColumn("otro_paretesco").AsString(100).Nullable();

            Create.ForeignKey("tit_emp")
                .FromTable("titular").ForeignColumn("sec_empresa")
                .ToTable("empresa").PrimaryColumn("sec_empresa");

            Create.ForeignKey("dep_tit")
                .FromTable("dependiente").ForeignColumn("sec_titular")
                .ToTable("titular").PrimaryColumn("sec_titular");

            Create.ForeignKey("tit_tipcuen")
                .FromTable("titular").ForeignColumn("sec_tipoCuenta")
                .ToTable("TipoCuenta").PrimaryColumn("sec_tipoCuenta");

            Create.ForeignKey("tit_banco")
                .FromTable("titular").ForeignColumn("sec_banco")
                .ToTable("Banco").PrimaryColumn("sec_banco");

            Create.ForeignKey("tit_plan")
                .FromTable("titular").ForeignColumn("sec_plan")
                .ToTable("plan").PrimaryColumn("sec_plan");
                

            Create.ForeignKey("dep_parent")
              .FromTable("dependiente").ForeignColumn("sec_parentesco")
              .ToTable("Parentesco").PrimaryColumn("sec_parentesco");


        }
    }
}
