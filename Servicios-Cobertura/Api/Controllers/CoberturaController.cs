
using BusinessService;
using BusinnesEntities;
using System;
using System.Configuration;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Api.Controllers
{

    [RoutePrefix("api/cobertura")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CoberturaController : ApiController
    {
        //private static Logger logger = LogManager.GetCurrentClassLogger();

        ICoberturaService _nuevo;
        public CoberturaController(ICoberturaService service) => _nuevo = service;
        
        [Route("titular/{identificationNumber}")]
        [HttpGet]
        public HttpResponseMessage FindDatosTit(string identificationNumber)
        {
            return Request.CreateResponse(HttpStatusCode.OK, _nuevo.FindDatosTitular(identificationNumber));
        }
        [Route("dependiente/{identificationNumber}")]
        [HttpGet]
        public HttpResponseMessage FindDatosDep(string identificationNumber)
        {            
            return Request.CreateResponse(HttpStatusCode.OK, _nuevo.FindDatosDep(identificationNumber));
        }
        [Route("tipoDoc")]
        [HttpGet]
        public HttpResponseMessage FindTipoDoc()
        {
            return Request.CreateResponse(HttpStatusCode.OK, _nuevo.FindTipoDoc());
        }

        [Route("titular")]
        [HttpGet]
        public HttpResponseMessage FindTitular()
        {
            return Request.CreateResponse(HttpStatusCode.OK, _nuevo.FindTitular());
        }

        [Route("titularLocal/{id}")]
        [HttpGet]
        public HttpResponseMessage FindTitularLocal(string id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, _nuevo.FindTitularLocal(id));
        }


        [Route("dependienteLocal/{id}")]
        [HttpGet]
        public HttpResponseMessage FinddependienteLocal(string id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, _nuevo.FinddependienteLocal(id));
        }


        [Route("ArchivoPdf/{nuevo}")]
        [HttpGet]
        public HttpResponseMessage ArchivoPDF(string nuevo)
        {
            Request.CreateResponse(HttpStatusCode.OK, _nuevo.ArchivoPdf(nuevo));
            var fileInfo = new FileInfo(ConfigurationManager.AppSettings["Tempfiles"] + "/Cobertura.pdf");
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest);
            if (fileInfo.Exists)
            {
                var fileStream = File.ReadAllBytes(fileInfo.FullName);
                var statusCode = HttpStatusCode.OK;
                response = Request.CreateResponse(statusCode);
                response.Content = new ByteArrayContent(fileStream);
                response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/pdf");
                response.Content.Headers.ContentLength = fileStream.Length;
                response.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = fileInfo.FullName
                };
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "error");
            }

        }

        [Route("DependienteSave")]
        [HttpPost]
        public HttpResponseMessage AlmacenarDependientes(DependientesEntity depend)
        {
            return Request.CreateResponse(HttpStatusCode.OK, _nuevo.AlmacenarDependientes(depend));
        }

        [Route("CoberturaSave")]
        [HttpPost]
        public HttpResponseMessage SaveCobertura(TitularEntity titular)
        {
            bool retorna = false;
            retorna = _nuevo.AlmacenarCobertura(titular);
            return Request.CreateResponse(HttpStatusCode.OK, retorna);
        }

        [Route("DeleteDependiente")]
        [HttpPost]
        public HttpResponseMessage DeleteDependiente(DependientesEntity dependiente)
        {
            bool retorna = false;
            retorna = _nuevo.DeleteDependiente(dependiente);
            return Request.CreateResponse(HttpStatusCode.OK, retorna);
        }


        [Route("exportarExcel")]
        [HttpPost]
        public HttpResponseMessage getCombinedFile(ReporteEntity nuevo)
        {
            try
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest);
                var fileStream = _nuevo.GetCombinedFile(nuevo);
                var statusCode = HttpStatusCode.OK;
                response = Request.CreateResponse(statusCode);
                response.Content = new ByteArrayContent(fileStream);
                response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                response.Content.Headers.ContentLength = fileStream.Length;
                response.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = "cobertura.xlsx"
                };
                return response;
                
            } catch (Exception e)
            {
                //logger.Error(e);
                return Request.CreateResponse(HttpStatusCode.BadRequest, "error");
            }
            
        }
    }
}
