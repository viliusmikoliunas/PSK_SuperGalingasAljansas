using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Eshop.Data;
using Eshop.Data.Entities;
using Eshop.DataContracts;
using Microsoft.AspNetCore.Mvc;

namespace Eshop.Controllers
{
    [Produces("application/json")]
    [Route("api/Items")]
    public class ItemsController : Controller
    {
        //this and ctor are required in ef core v2
        private readonly AppDbContext _dbContext;

        public ItemsController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        //method name doesn't matter much its all about [http] tags
        [HttpGet]
        public IEnumerable<Item> GetAll()
        {
            IEnumerable<Item> items;
            using (_dbContext)
            {
                items = _dbContext.Items.ToList();
            }
            return items;
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

            using (_dbContext)
            {
                _dbContext.Items.Add(newItem);
                _dbContext.SaveChanges();
            }
            return Ok("Item added successfully");
        }
    }
}

