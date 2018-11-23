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
    public class CatalogosPlanController : ApiController
    {
       
        IPlanService _plan;


        public CatalogosPlanController(IPlanService service) => _plan = service;

        [Route("plan")]
        [HttpGet]
        public HttpResponseMessage FindPlanAll()
        {
            return Request.CreateResponse(HttpStatusCode.OK, _plan.GetPlanes());
        }
    }
}
