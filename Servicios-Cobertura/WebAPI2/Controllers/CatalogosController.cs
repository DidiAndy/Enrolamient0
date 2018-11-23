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
    [RoutePrefix("api/catalogos")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CatalogosController : ApiController
    {
        IBancoService _banco;

        public CatalogosController(IBancoService service) => _banco = service;

        [Route("banco")]
        [HttpGet]
        public HttpResponseMessage FindBancosAll()
        {

            return Request.CreateResponse(HttpStatusCode.OK, _banco.GetBanco());
        }
    }
}
