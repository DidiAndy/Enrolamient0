//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DataModel
{
    using System;
    using System.Collections.Generic;
    
    public partial class Dependiente
    {
        public int sec_dependiente { get; set; }
        public string cedula_dependiente { get; set; }
        public string primer_nombre { get; set; }
        public string segundo_nombre { get; set; }
        public string primer_apellido { get; set; }
        public string segundo_apellido { get; set; }
        public int sec_parentesco { get; set; }
        public int sec_titular { get; set; }
        public int sec_tipoDoc { get; set; }
        public System.DateTime fecha_Nacimiento { get; set; }
        public int genero { get; set; }
        public System.DateTime fecha_Creacion { get; set; }
        public string otro_paretesco { get; set; }
    
        public virtual Parentesco Parentesco { get; set; }
        public virtual Titular Titular { get; set; }
    }
}