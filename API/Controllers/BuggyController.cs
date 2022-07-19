using System;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    //BuggyController : return http error response
    //BuggyController is derived from BaseApiController
    public class BuggyController : BaseApiController
    {

        [HttpGet("not-found")] //404
        public ActionResult GetNotFound() 
        {
            return NotFound();
        }

        [HttpGet("bad-request")] //400
        public ActionResult GetBadRequest()
        {
            return BadRequest("This is a bad request");
        }

        [HttpGet("unauthorised")] //401
        public ActionResult GetUnauthorised()
        {
            return Unauthorized();
        }

        [HttpGet("vaildation-error")] //400
        public ActionResult GetValidationError() //if model states are failed
        {
            ModelState.AddModelError("Problem1", "This is the first error");
            ModelState.AddModelError("Problem2", "This is the second error");
            return ValidationProblem();
        }

        [HttpGet("server-error")] //500
        public ActionResult GetSeverError()
        {
            throw new Exception("This is a server error");
        }   
    }
}