
using BusinessService;
using BusinnesEntities;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebAPI.Controllers
{

    [RoutePrefix("api/cobertura")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CoberturaController : ApiController
    {
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
        [Route("ArchivoPdf")]
        [HttpGet]
        public HttpResponseMessage ArchivoPDF()
        {
            return Request.CreateResponse(HttpStatusCode.OK, _nuevo.ArchivoPdf());
        }
        [Route("CoberturaSave")]
        [HttpPost]
        public HttpResponseMessage SaveCobertura(TitularEntity titular)
        {
            return Request.CreateResponse(HttpStatusCode.OK, _nuevo.AlmacenarCobertura(titular));
        }
    }
}
