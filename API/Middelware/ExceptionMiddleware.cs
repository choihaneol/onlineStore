using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middelware
{
    public class ExceptionMiddleware
    {

        private readonly RequestDelegate _next; //call next middleware
        private readonly ILogger<ExceptionMiddleware> _logger; //log
        private readonly IHostEnvironment _env; //let me know which mode we're runnning

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }


        //InvokeAsync : each middleware method has to have invoke method
        public async Task InvokeAsync(HttpContext context) //HttpContext : a container for a single request and make response
        {
            try
            {
                await _next(context); 
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";  //response 형식
                context.Response.StatusCode = 500; // status code

                var response = new ProblemDetails
                {
                    Status = 500,
                    Detail = _env.IsDevelopment() ? ex.StackTrace?.ToString() : null, //full error message
                    Title = ex.Message  //error exact title
                };

                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase}; //json format을 camel case 형식으로 전송

                var json = JsonSerializer.Serialize(response, options); //serialize our problem details into json response

                await context.Response.WriteAsync(json);

            }
        }
    }
}