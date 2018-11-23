using FluentMigrator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseMigration
{
    [Migration(201808221237)]
    public class Init_Database : Migration
    {
        public override void Down()
        {

        }

        public override void Up()
        {
            Create.Table("Plan")
                .WithColumn("sec_plan").AsInt32().Identity().PrimaryKey()
                .WithColumn("descripcion").AsString(100)
                .WithColumn("Valor").AsInt32().NotNullable()
                .WithColumn("estado").AsInt16().WithDefaultValue(1);

            Create.Table("TipoCuenta")
                .WithColumn("sec_tipoCuenta").AsInt32().Identity().PrimaryKey()
                .WithColumn("descripcion").AsString(100)
                .WithColumn("estado").AsInt16().WithDefaultValue(1);

            Create.Table("Banco")
                .WithColumn("sec_banco").AsInt32().Identity().PrimaryKey()
                .WithColumn("descripcion").AsString(100)
                .WithColumn("estado").AsInt16().WithDefaultValue(1);

            Create.Table("Parentesco")
                .WithColumn("sec_parentesco").AsInt32().Identity().PrimaryKey()
                .WithColumn("descripcion").AsString(100)
                .WithColumn("estado").AsInt16().WithDefaultValue(1);
        }
    }
}
