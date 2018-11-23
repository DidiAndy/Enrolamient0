using BusinnesEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessService
{
    public interface ICoberturaService
    {
        TitularEntity FindDatosTitular(string id);
        DependientesEntity FindDatosDep(string id);
        List<TipoDocumentoEntity> FindTipoDoc();
        List<TitularEntity> FindTitular();
        TitularEntity FindTitularLocal(string id);
        bool ArchivoPdf(string id);
        bool AlmacenarCobertura(TitularEntity tit);
        byte[] GetCombinedFile(ReporteEntity nuevo);
        bool DeleteDependiente(DependientesEntity dependiente);
        bool AlmacenarDependientes(DependientesEntity dep);
        DependientesEntity FinddependienteLocal(string id);
    }
}
