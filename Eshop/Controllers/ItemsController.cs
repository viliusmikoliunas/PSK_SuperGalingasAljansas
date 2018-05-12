using System.Collections.Generic;
using Eshop.Data.Entities;
using Eshop.DataContracts.DataTransferObjects;
using Eshop.DataContracts.RepositoryInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Eshop.Controllers
{
    [Produces("application/json")]
    [Route("api/Items")]
    public class ItemsController : Controller
    {
        private readonly IItemsRepository _itemsRepository;

        public ItemsController(IItemsRepository itemsRepository)
        {
            _itemsRepository = itemsRepository;
        }

        //method name doesn't matter much its all about [http] tags
        [HttpGet]
        public IEnumerable<Item> GetAll()
        {
            return _itemsRepository.GetAll();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult AddItem([FromBody] ItemDto itemData)
        {
            if (string.IsNullOrEmpty(itemData.Title))
                return BadRequest("Title missing");
            if (itemData.Cost == 0)
            {
                return BadRequest("Unacceptable item cost");
            }

            Item newItem = new Item
            {
                Cost = itemData.Cost,
                Title = itemData.Title,
                Description = itemData.Description
            };
            _itemsRepository.Add(newItem);

            return Ok("Item added successfully");
        }

        [HttpDelete]
        //[Authorize(Roles = UserRoleString.Admin)]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteItem([FromBody] DeleteItemDto itemDto)
        {      
            if (_itemsRepository.Delete(itemDto.Id) == true) return Ok("Item has been deleted");
            else return NotFound("The item does not exist in the database");
        }

    }
}

