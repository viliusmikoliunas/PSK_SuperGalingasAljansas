using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Eshop.Data;
using Eshop.Data.Entities;
using Eshop.DataContracts;
using Eshop.DataContracts.RepositoryInterfaces;
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
        
        //needs token checking because this is admin operation
        [HttpPost]
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
            _itemsRepository.SaveSingleItem(newItem);

            return Ok("Item added successfully");
        }
    }
}

