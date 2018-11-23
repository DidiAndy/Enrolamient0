using BusinessService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Api.Controllers
{
    [RoutePrefix("api/catalogos")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CatalogosTipoCuentaController : ApiController
    {
     
        ITipoCuentaService _tipoC;

        public CatalogosTipoCuentaController(ITipoCuentaService service) => _tipoC = service;

        [Route("tipoCuenta")]
        [HttpGet]
        public HttpResponseMessage FindTipoCuentaAll()
        {
            return Request.CreateResponse(HttpStatusCode.OK, _tipoC.GetTipoCuenta());
        }
    }
}
