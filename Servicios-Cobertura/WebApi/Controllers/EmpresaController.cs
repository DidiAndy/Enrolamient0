using BusinessService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebAPI.Controllers
{
    [RoutePrefix("api")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EmpresaController : ApiController
    {

        IEmpresaService _empresa;

        public EmpresaController(IEmpresaService service) => _empresa = service;

        [Route("empresa/{id}")]
        [HttpGet]
        public HttpResponseMessage FindEmpresa(string id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, _empresa.GetEmpresa(id));
        }
    }
}
