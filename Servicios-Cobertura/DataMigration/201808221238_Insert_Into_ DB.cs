using BusinnesEntities;
using BusinessService;
using FluentMigrator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseMigration
{
    [Migration(201808221238)]
    public class Insert_Into__DB : Migration
    {
        public override void Down()
        {

        }

        public override void Up()
        {
            Insert.IntoTable("Banco").Row(new { descripcion = "BANCO DEL PACIFICO" });
            Insert.IntoTable("Banco").Row(new { descripcion = "BANCO DEL PICHINCHA" });
            Insert.IntoTable("Banco").Row(new { descripcion = "MULTIBANCO (BANCO GUAYAQUIL)" });
            Insert.IntoTable("Banco").Row(new { descripcion = "BANCO AMAZONAS" });
            Insert.IntoTable("Banco").Row(new { descripcion = "BANCO INTERNACIONAL" });
            Insert.IntoTable("Banco").Row(new { descripcion = "MUTUALISTA PICHINCHA" });
            Insert.IntoTable("Banco").Row(new { descripcion = "PRODUBANCO" });
            Insert.IntoTable("Banco").Row(new { descripcion = "BANCO DEL AUSTRO"});

            Insert.IntoTable("Parentesco").Row(new { descripcion = "CÓNYUGE" });
            Insert.IntoTable("Parentesco").Row(new { descripcion = "HIJO" });
            Insert.IntoTable("Parentesco").Row(new { descripcion = "PADRE" });
            Insert.IntoTable("Parentesco").Row(new { descripcion = "HERMANO" });

            Insert.IntoTable("Plan").Row(new { descripcion = "BLUE", valor = 1000 });
            Insert.IntoTable("Plan").Row(new { descripcion = "SILVER", valor = 2000 });

            Insert.IntoTable("TipoCuenta").Row(new { descripcion = "AHORROS"});
            Insert.IntoTable("TipoCuenta").Row(new { descripcion = "CORRIENTE"});

        }
    }
}
