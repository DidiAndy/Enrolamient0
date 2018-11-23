using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;
using BusinessService.CoberturaServ;
using BusinnesEntities;
using BussinessServices.Mappers;
using DataModel;
using DataModel.GenericRepository;
using Newtonsoft.Json;
using PdfSharp;
using PdfSharp.Drawing;
using PdfSharp.Drawing.Layout;
using PdfSharp.Pdf;
using System.Web;
using TheArtOfDev.HtmlRenderer.PdfSharp;
using System.Net;
using LinqToExcel;
using OfficeOpenXml;
using System.Drawing;
using System.Globalization;
using BusinessService.CoberturaServ1;

namespace BusinessService
{
    public class CoberturaService : ICoberturaService
    {
        private IGenericRepository _repository;

        public CoberturaService(IGenericRepository repository) => _repository = repository;

        public CoberturaService() { }

        TitularEntity ICoberturaService.FindDatosTitular(string id)
        {
            var endPointConsulaServicioAddress = "http://10.10.52.52:8080/equivida-consulta-ws-producer-1.0/ConsultaGenericaServicioImpl";
            /*Desarrollo*/
            //  var endPointConsulaServicioAddress = "http://200.32.69.186:5051/equivida-buen-viaje-1.0/ConsultaServicioImpl";
            var ConsultaServicioBinding = new System.ServiceModel.BasicHttpBinding();
            var ConsultaServicioDireccion = new EndpointAddress(endPointConsulaServicioAddress);
            ConsultaGenericaServicioImplClient nuevo = new ConsultaGenericaServicioImplClient(ConsultaServicioBinding, ConsultaServicioDireccion);
            TitularEntity titular = new TitularEntity();
            personaNatural persona = nuevo.consultaEnriquecida(id, "Enrolamiento");
            if (persona != null)
            {
                titular = EntityMapper.TitularMapper.Map<personaNatural, TitularEntity>(persona);
            }
            return titular;
        }

        DependientesEntity ICoberturaService.FindDatosDep(string id)
        {
            var endPointConsulaServicioAddress = "http://10.10.52.52:8080/equivida-consulta-ws-producer-1.0/ConsultaGenericaServicioImpl";
            /*Desarrollo*/
            // var endPointConsulaServicioAddress = "http://200.32.69.186:5051/equivida-buen-viaje-1.0/ConsultaServicioImpl";
            var ConsultaServicioBinding = new System.ServiceModel.BasicHttpBinding();
            var ConsultaServicioDireccion = new EndpointAddress(endPointConsulaServicioAddress);
            ConsultaGenericaServicioImplClient nuevo = new ConsultaGenericaServicioImplClient(ConsultaServicioBinding, ConsultaServicioDireccion);
            DependientesEntity dependientes = new DependientesEntity();
            personaNatural persona = nuevo.consultaEnriquecida(id, "enrolamiento");
            if (persona != null)
            {
                dependientes = EntityMapper.DependientesMapper.Map<personaNatural, DependientesEntity>(persona);
            }
            return dependientes;
        }
        List<TipoDocumentoEntity> ICoberturaService.FindTipoDoc()
        {
            using (var client = new HttpClient())
            {
                var res = new TipoDocumentoEntity();
                var objetoJson = client.GetAsync(ConfigurationManager.AppSettings["db2Service"] + "identificacion").Result.Content.ReadAsStringAsync().Result;
                List<TipoDocumentoEntity> des = JsonConvert.DeserializeObject<List<TipoDocumentoEntity>>(objetoJson);
                des.RemoveAt(1);
                return des;
            }
        }

        List<TitularEntity> ICoberturaService.FindTitular()
        {
            List<Titular> list = null;
            List<TitularEntity> titular = null;
            list = _repository.GetAll<Titular>().ToList();
            titular = list.Select(x => EntityMapper.TitularModeloMapper.Map<Titular, TitularEntity>(x)).ToList();
            return titular;
        }

        TitularEntity ICoberturaService.FindTitularLocal(string id)
        {
            Titular list = null;
            TitularEntity titular = null;
            list = _repository.Get<Titular>().Where(g => g.cedula_titular == id).FirstOrDefault();
            if (list != null)
            {
                titular = EntityMapper.TitularModeloMapper.Map<Titular, TitularEntity>(list);
            }
            return titular;
        }
        DependientesEntity ICoberturaService.FinddependienteLocal(string id)
        {
            Dependiente list = null;
            DependientesEntity titular = null;
            list = _repository.Get<Dependiente>().Where(g => g.cedula_dependiente == id).FirstOrDefault();
            if (list != null)
            {
                titular = EntityMapper.DependientesModeloMapper.Map<Dependiente, DependientesEntity>(list);
            }
            return titular;
        }

        bool ICoberturaService.ArchivoPdf(string id)
        {
            var titular = new Titular();
            titular = _repository.Get<Titular>().Where(g => g.cedula_titular == id).FirstOrDefault();
            if (titular != null)
            {
                string nombreTitular1 = titular.primer_nombre;
                string nombreTitular2 = titular.segundo_nombre;
                string apellido1 = titular.primer_apellido;
                string apellido2 = titular.segundo_apellido;
                string cedula = titular.cedula_titular;
                int t_cuenta = titular.sec_tipoCuenta;
                string tipoDeCuenta;
                int t_banco = titular.sec_banco;
                string pagos = titular.div_pago;


                var banco = new Banco();
                banco = _repository.Get<Banco>().Where(g => g.sec_banco == t_banco).FirstOrDefault();

                String nom_Banco = banco.descripcion;

                if (t_cuenta == 0) { tipoDeCuenta = "ahorros"; }
                else
                { tipoDeCuenta = "corriente"; }

                string cuenta = titular.noCuenta;
                string valor = titular.valor_total.ToString();
                //string html = File.ReadAllText("/Proyectos/Servicios-Cobertura/html/Template/CoberturaDental.html");
                string html = File.ReadAllText(ConfigurationManager.AppSettings["CargaAutorizacion"]);
               
                html = html.Replace("$nombre1.Titular", nombreTitular1);
                html = html.Replace("$nombre2.Titular", nombreTitular2);
                html = html.Replace("$cuenta.Titular", cuenta);
                html = html.Replace("$valorTotal.Titular", "$" + valor);
                html = html.Replace("$fechaActual", DateTime.Now.ToShortDateString());
                html = html.Replace("$apellido1.Titular", apellido1);
                html = html.Replace("$apellido2.Titular", apellido2 + ",");
                html = html.Replace("$cedula.Titular", cedula + ",");
                html = html.Replace("$tipoCuenta.Titular", tipoDeCuenta);
                html = html.Replace("$banco.Titular", nom_Banco);
                html = html.Replace("$div_pago.Titular", pagos);

                string folder = ConfigurationManager.AppSettings["ReportePdf"];
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }
                string folder1 = ConfigurationManager.AppSettings["Tempfiles"];
                if (!Directory.Exists(folder1))
                {
                    Directory.CreateDirectory(folder1);
                }
                PdfDocument pdf = PdfGenerator.GeneratePdf(html, PageSize.Letter);
                //pdf.Save("C:/TempFiles/Cobertura.pdf");
                pdf.Save(ConfigurationManager.AppSettings["Tempfiles"]+ "/Cobertura.pdf");
                WebClient client = new WebClient();
                client.DownloadFileAsync(new Uri(ConfigurationManager.AppSettings["Tempfiles"] + "/Cobertura.pdf"), @"C:/inetpub/wwwroot/Cobertura/assets/Pdfs/nuevo.pdf");

                return true;
            }
            else
            {
                return false;
            }
        }



        bool ICoberturaService.AlmacenarDependientes(DependientesEntity dep)
        {

            Dependiente dependiente = new Dependiente();
            Dependiente repe = new Dependiente();
            dependiente = EntityMapper.DependientesModeloMapper.Map<DependientesEntity, Dependiente>(dep);
            repe = _repository.Get<Dependiente>().Where(g => g.cedula_dependiente == dep.NoIdentificacion).FirstOrDefault();
            if (repe == null)
            {
                try
                {
                    _repository.BeginTransaction();
                    if (dependiente.sec_dependiente == 0)
                    {
                        _repository.Insert<Dependiente>(dependiente);
                        _repository.Save();
                        _repository.CommitTransaction();

                        Titular obtenerDatosTitular = new Titular();
                        obtenerDatosTitular = _repository.Get<Titular>().Where(g => g.sec_titular == dep.sec_titular).FirstOrDefault();
                        if (obtenerDatosTitular != null)
                        {
                            obtenerDatosTitular.valor_total = Convert.ToInt32(obtenerDatosTitular.valor_total) + 10;
                            _repository.Save();
                        }
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                catch (Exception e)
                {
                    _repository.RollbackTransaction();
                    return false;
                }
            }
            else
            {
                try
                {
                    Dependiente actualizaDep = new Dependiente();
                    actualizaDep = _repository.GetOne<Dependiente>(x => x.cedula_dependiente == dep.NoIdentificacion && x.sec_titular == dep.sec_titular);

                    if (actualizaDep != null)
                    {
                        _repository.BeginTransaction();

                        actualizaDep.cedula_dependiente = dep.NoIdentificacion;
                        actualizaDep.fecha_Creacion = dep.fecha_Creacion;
                        actualizaDep.fecha_Nacimiento = dep.Fecha_Nacimiento;
                        actualizaDep.genero = dep.genero;
                        actualizaDep.otro_paretesco = dep.otro_paretesco;
                        actualizaDep.primer_apellido = dep.PrimerApellido;
                        actualizaDep.primer_nombre = dep.PrimerNombre;
                        actualizaDep.sec_dependiente = dep.sec_dependiente;
                        actualizaDep.sec_parentesco = dep.sec_parentesco;
                        actualizaDep.sec_tipoDoc = dep.sec_tipoDoc;
                        actualizaDep.sec_titular = dep.sec_titular;
                        actualizaDep.segundo_apellido = dep.SegundoApellido;
                        actualizaDep.segundo_nombre = dep.SegundoNombre;

                        _repository.Save();
                        _repository.CommitTransaction();
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                catch (Exception e)
                {
                    _repository.RollbackTransaction();
                    return false;
                }
            }
        }

        bool ICoberturaService.AlmacenarCobertura(TitularEntity tit)
        {
            Titular titular = new Titular();
            Titular repetido = new Titular();
            Dependiente dep = new Dependiente();
            titular = EntityMapper.TitularModeloMapper.Map<TitularEntity, Titular>(tit);
            repetido = _repository.Get<Titular>().Where(g => g.cedula_titular == tit.NoIdentificacion).FirstOrDefault();
            if (repetido == null)
            {
                try
                {
                    _repository.BeginTransaction();
                    titular.fecha_Nacimiento = Convert.ToDateTime(tit.Fecha_Nacimiento);
                    titular.fecha_Creacion = DateTime.Now;
                    _repository.Insert<Titular>(titular);
                    _repository.Save();
                    _repository.CommitTransaction();
                    return true;

                }
                catch (Exception e)
                {
                    _repository.RollbackTransaction();
                    return false;
                }
            }
            else
            {
                try
                {
                    _repository.BeginTransaction();
                    Titular actualizaTituar = new Titular();
                    actualizaTituar = _repository.GetOne<Titular>(x => x.sec_titular == tit.sec_titular);
                    if (actualizaTituar != null)
                    {
                        actualizaTituar.sec_banco = tit.sec_banco;
                        actualizaTituar.fecha_Nacimiento = tit.Fecha_Nacimiento;
                        actualizaTituar.fecha_Creacion = tit.fecha_Creacion;
                        actualizaTituar.genero = tit.genero;
                        actualizaTituar.noCuenta = tit.noCuenta;
                        actualizaTituar.primer_nombre = tit.PrimerNombre;
                        actualizaTituar.primer_apellido = tit.PrimerApellido;
                        actualizaTituar.segundo_nombre = tit.SegundoNombre;
                        actualizaTituar.segundo_apellido = tit.SegundoApellido;
                        actualizaTituar.sec_titular = tit.sec_titular;
                        actualizaTituar.sec_plan = tit.sec_plan;
                        actualizaTituar.sec_banco = tit.sec_banco;
                        actualizaTituar.sec_empresa = tit.sec_empresa;
                        actualizaTituar.sec_tipoDoc = tit.sec_tipoDoc;
                        actualizaTituar.sec_tipoCuenta = tit.sec_tipoCuenta;
                        actualizaTituar.valor_total = tit.valor_total;
                        actualizaTituar.div_pago = tit.div_pago;

                        _repository.Save();
                        _repository.CommitTransaction();
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                catch (Exception e)
                {
                    _repository.RollbackTransaction();
                    return false;
                }
            }

        }

        byte[] ICoberturaService.GetCombinedFile(ReporteEntity nuevo)
        {
            using (var package = new ExcelPackage())
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("datos");
                var range = worksheet.Cells[2, 1];
                var headerRange = worksheet.Cells[1, 1];
                var content = worksheet.Cells[2, 1];
                headerRange.LoadFromText(ConfigurationManager.AppSettings["textColumns"]);
                List<string> asds = new List<string>();
                List<Titular> list = null;
                List<Dependiente> dependientes = null;
                List<ReportExcel> titulares = null;
                List<ReportExcel> dep1 = null;
                List<ReportExcel> total = new List<ReportExcel>();
                string fechaIniString = nuevo.fch_inicio.ToShortDateString();
                string fechaFinString = nuevo.fch_final.ToShortDateString();
                DateTime fechaInicial = new DateTime();
                DateTime fechaFinal = new DateTime();
                if (DateTime.TryParse(fechaIniString, out DateTime fechaInici))
                {
                    fechaInicial = fechaInici;
                }
                if (DateTime.TryParse(fechaFinString, out DateTime fechaFin))
                {
                    fechaFinal = fechaFin.AddDays(1);
                }
                list = _repository.Get<Titular>(c => c.sec_empresa == nuevo.sec_empresa && c.fecha_Creacion >= fechaInicial && c.fecha_Creacion <= fechaFinal).ToList();
              list.ForEach(titular =>
                {
                    
                    total.Add(EntityMapper.ExcelTitMapper.Map<Titular, ReportExcel>(titular));
                    titular.Dependiente.ToList().ForEach(dependiente =>
                    {
                        
                        ReportExcel dependienteExcel = EntityMapper.ExcelDepMapper.Map<Dependiente, ReportExcel>(dependiente);
                        dependienteExcel.NRO_DOC_TITULAR = titular.cedula_titular;
                        dependienteExcel.TTIPO_DOC_TITULAR = titular.sec_tipoDoc + "";
                        
                        //  dependienteExcel.COD_EMPRESA = titular.sec_empresa;
                        dependienteExcel.COD_EMPRESA = 1;
                        total.Add(dependienteExcel);
                    });
                });
               
                content.LoadFromCollection(total);

                return package.GetAsByteArray();
            }
        }

        public bool DeleteDependiente(DependientesEntity dependiente)
        {
            try
            {
                Dependiente dep = new Dependiente();
                dep = _repository.GetOne<Dependiente>(x => x.sec_dependiente == dependiente.sec_dependiente && x.sec_titular == dependiente.sec_titular);
                _repository.Delete<Dependiente>(dep);
                _repository.Save();

                Titular obtenerDatosTitular = new Titular();
                obtenerDatosTitular = _repository.Get<Titular>().Where(g => g.sec_titular == dependiente.sec_titular).FirstOrDefault();
                if (obtenerDatosTitular != null)
                {
                    obtenerDatosTitular.valor_total = Convert.ToInt32(obtenerDatosTitular.valor_total) - 10;
                    _repository.Save();
                }

                return true;
            }
            catch (Exception e)
            {

                return false;
            }
        }

    }
}
