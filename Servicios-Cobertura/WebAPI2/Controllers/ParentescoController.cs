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
    public class ParentescoController : ApiController
    {
        IParentescoService _parentesco;
        public ParentescoController(IParentescoService service) => _parentesco = service;
        [Route("parentesco")]
        [HttpGet]
        public HttpResponseMessage FindPlanAll()
        {
            return Request.CreateResponse(HttpStatusCode.OK, _parentesco.GetParentesco());
        }
    }
}
