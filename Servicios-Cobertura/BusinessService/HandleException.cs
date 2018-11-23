using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessService
{
    public class HandleException : Exception
    {
        public HandleException(string message) : base(message)
        {
        }

        public HandleException() : base()
        {
        }
        public string HandleDBErrorMessage()
        {
            return "Existe un problema al almacenar el archivo; intente nuevamente o contacte al administrador";
        }
        public string HandleCombinedFileErrorMessage()
        {
            return "No fue posible crear el archivo de cruce entre ventas y carga de vida, es posible que los archivos no tengan un formato correcto";
        }
        public string HandleVentasFileErrorMessage()
        {
            return "No fue posible crear el archivo de ventas, es posible que el archivo no tenga un formato correcto";
        }
        public string HandleCombinedPBFileErrorMessage()
        {
            return "No fue posible crear el archivo combinado final, es posible que el archivo de Produbanco no tenga un formato correcto";
        }
    }
}
