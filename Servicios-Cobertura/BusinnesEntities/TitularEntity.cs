using System;
using System.Collections.Generic;

namespace BusinnesEntities
{
    public class TitularEntity
    {
        public int sec_titular { get; set; }
        public string TipoIdentificacion { get; set; }
        public string NoIdentificacion { get; set; }
        public string PrimerNombre { get; set; }
        public string SegundoNombre { get; set; }
        public string PrimerApellido { get; set; }
        public string SegundoApellido { get; set; }
        public string DocumentType { get; set; }
        public int sec_plan { get; set; }
        public decimal valor_total { get; set; }
        public int sec_tipoCuenta { get; set; }
        public string noCuenta { get; set; }
        public string div_pago { get; set; }
        public int sec_banco { get; set; }
        public int sec_empresa { get; set; }
        public int sec_tipoDoc { get; set; }
        public DateTime Fecha_Nacimiento { get; set; }
        public int genero { get; set; }
        public DateTime fecha_Creacion { get; set; }
        public List<DependientesEntity> dependientes { get; set;}
    }
}
