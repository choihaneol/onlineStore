using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
     //Inherent API controller attribute: 아래의 placeholder로부터 파생된 모든컨트롤에 유효함 
    [ApiController]
    [Route("api/[controller]")]


    public class BaseApiController : ControllerBase //BaseApiContoroller는 ControllerBase에서 파생
    {
       

    }

}

