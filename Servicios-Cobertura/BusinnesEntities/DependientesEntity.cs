using System;
using System.Collections.Generic;
using System.Text;

namespace BusinnesEntities
{
    public class DependientesEntity
    {
        public int sec_dependiente { get; set; }
        public string TipoIdentificacion { get; set; }
        public string NoIdentificacion { get; set; }
        public string PrimerNombre { get; set; }
        public string SegundoNombre { get; set; }
        public string PrimerApellido { get; set; }
        public string SegundoApellido { get; set; }
        public string DocumentType { get; set; }
        public int sec_titular { get; set; }
        public string otro_paretesco { get; set;}
        public DateTime Fecha_Nacimiento { get; set; }
        public int genero { get; set; }
        public DateTime fecha_Creacion{ get; set; }
        public int sec_parentesco { get; set; }
        public int sec_tipoDoc { get; set; }

    }
}
