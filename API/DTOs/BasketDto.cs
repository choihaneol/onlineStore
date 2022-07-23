using System.Collections.Generic;

namespace API.DTOs
{
    public class BasketDto
    { //Json 타입으로 반환 

        public int Id { get; set; }

        public string BuyerId { get; set; }

        public List<BasketItemDto> Items { get; set; }

    }
}