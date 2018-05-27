using System.Linq;
using Eshop.Data.Entities;
using Eshop.DataContracts;
using Eshop.DataContracts.DataTransferObjects;
using Eshop.DataContracts.DataTransferObjects.Requests;
using Eshop.DataContracts.DataTransferObjects.Responses;
using Eshop.DataContracts.RepositoryInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Eshop.Controllers
{
    [Produces("application/json")]
    [Route("api/items")]
    public class ItemsController : Controller
    {
        private readonly IItemsRepository _itemsRepository;

        public ItemsController(IItemsRepository itemsRepository)
        {
            _itemsRepository = itemsRepository;
        }

        [HttpGet]
        public IActionResult GetAll([FromQuery] PaginationRequest paginationRequest)
        {
            var allItems = _itemsRepository.GetAllDto().ToList();
            //temporary lame implementation - need to make repository/DB do this skip take stuff
            var allItems = _itemsRepository.GetAllDto().ToList();
            var items = allItems
                .Skip((paginationRequest.Page - 1) * paginationRequest.Limit)
                .Take(paginationRequest.Limit);

            var response = new PaginationResponse<Item>
            {
                Items = items,
                AllItemsCount = allItems.Count
            };
            return Ok(response);
        }

        [HttpPost]
        [Authorize(Roles = UserRoleString.Admin)]
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
                Description = itemData.Description,
                PictureLocation = itemData.PictureLocation,
                //ItemCategories = itemData.ItemCategories,
                //ItemTraits = itemData.ItemTraits
            };
            _itemsRepository.Add(newItem);

            return Ok("Item added successfully");
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = UserRoleString.Admin)]
        public IActionResult DeleteItem(int id)
        {      
            if (_itemsRepository.Delete(id)) return Ok("Item has been deleted");
            return NotFound("The item does not exist in the database");
        }

        [HttpGet("{id}")]
        public IActionResult GetItem(int id)
        {
            return Ok(_itemsRepository.GetItemDto(id));
        }

        [HttpPut]
        [Authorize(Roles = UserRoleString.Admin)]
        public IActionResult UpdateItem([FromBody] UpdatedItemDto updatedItem)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var itemToUpdate = _itemsRepository.GetItem(updatedItem.Id);
            if (itemToUpdate != null)
            {
                if (string.IsNullOrEmpty(updatedItem.Title))
                    return BadRequest("Title missing");
                if (updatedItem.Cost == 0)
                    return BadRequest("Unacceptable item cost");

                if (updatedItem.ItemTraits != null)
                {
                    var itemTraits = itemToUpdate.ItemTraits.ToList();
                    itemTraits.RemoveAll(x => !updatedItem.ItemTraits.Select(y => y.TraitId).Contains(x.TraitId));
                    var newTraits = updatedItem.ItemTraits.Where(x => !itemTraits.Select(y => y.TraitId).Contains(x.TraitId)).ToList();
                    itemTraits.AddRange(newTraits);
                    itemToUpdate.ItemTraits = itemTraits;
                }

                if (updatedItem.ItemCategories != null)
                {
                    var itemCategories = itemToUpdate.ItemCategories.ToList();
                    itemCategories.RemoveAll(x => !updatedItem.ItemCategories.Select(y => y.CategoryId).Contains(x.CategoryId));
                    var newCategories = updatedItem.ItemCategories.Where(x => !itemCategories.Select(y => y.CategoryId).Contains(x.CategoryId)).ToList();
                    itemCategories.AddRange(newCategories);
                    itemToUpdate.ItemCategories = itemCategories;
                }

                if (itemToUpdate.Cost != updatedItem.Cost) itemToUpdate.Cost = updatedItem.Cost;
                if (itemToUpdate.Description != updatedItem.Description) itemToUpdate.Description = updatedItem.Description;
                if (itemToUpdate.PictureLocation != updatedItem.PictureLocation) itemToUpdate.PictureLocation = updatedItem.PictureLocation;
                if (itemToUpdate.Title != updatedItem.Title) itemToUpdate.Title = updatedItem.Title;

                _itemsRepository.Update(itemToUpdate);
                return Ok("Item updated successfully");
            }
            return NotFound("Item does not exist in the database");
        }       
    }
}

