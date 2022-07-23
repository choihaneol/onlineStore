using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context; //using API data

        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();

            //Json serializer error > DTO 생성 > DTO 형태로 반환 
            return new BasketDto
            {
                Id = basket.Id, 
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId, 
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity

                }).ToList()

            };
        }

       
        [HttpPost] // api/bascket?productId=3&quantity=2
        //ActionResult:return the models to the views, file streams and redirect to the controller
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity) 
        {
            //get basket
            var basket = await RetrieveBasket();

            //create basket
            if(basket == null) basket = CreateBasket();

            //get product
            var product = await _context.Products.FindAsync(productId);
            if(product == null) return NotFound();

            //add item
            basket.AddItem(product, quantity);

            // save changes
            //_context.SaveChangesAsync():if something has happened to our database, the # of chages return
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return StatusCode(201);

            return BadRequest(new ProblemDetails{Title="Problem saving item to basket"});
        }

   

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {

            //get basket
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();

            //remove item or reduce quantity
            basket.RemoveItem(productId, quantity);

            //save change
            var result = await _context.SaveChangesAsync() > 0;
            
            if(result) return Ok();

            return BadRequest (new ProblemDetails{Title = "Problem removing item from the basket"});
        }

         private async Task<Basket> RetrieveBasket()
        {
            //Basket에 아무것도 없으면 null return 
            return await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{IsEssential = true, Expires = DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket{BuyerId = buyerId};
            _context.Baskets.Add(basket);
            return basket;
        }

    }
}