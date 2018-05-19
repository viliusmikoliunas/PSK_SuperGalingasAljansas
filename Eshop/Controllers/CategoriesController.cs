using System;
using System.Collections.Generic;
using System.Linq;
using Eshop.Data.Entities;
using Eshop.DataContracts;
using Eshop.DataContracts.DataTransferObjects;
using Eshop.DataContracts.RepositoryInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Eshop.Controllers
{
    [Produces("application/json")]
    [Route("api/Categories")]
    public class CategoriesController : Controller
    {
        private readonly ICategoriesRepository _categoriesRepository;

        public CategoriesController(ICategoriesRepository categoriesRepository)
        {
            _categoriesRepository = categoriesRepository;
        }

        [HttpGet]
        public IEnumerable<Category> GetAll()
        {
            return _categoriesRepository.GetAll();
        }

        [HttpPost]
        [Authorize(Roles = UserRoleString.Admin)]
        public IActionResult AddCategory([FromBody] CategoryDto categoryData)
        {
            if (string.IsNullOrEmpty(categoryData.Title))
                return BadRequest("Title missing");           

            Category newCategory = new Category
            {
                Title = categoryData.Title,
            };
            _categoriesRepository.Add(newCategory);

            return Ok("Category added successfully");
        }

        [HttpGet("{id}")]
        public Category GetCategory(int id)
        {
            return _categoriesRepository.GetCategory(id);
        }

        [HttpPut]
        [Authorize(Roles = UserRoleString.Admin)]
        public IActionResult UpdateItem([FromBody] CategoryDto updatedCategory)
        {
            var categoryToUpdate = GetCategory(updatedCategory.Id);
            if (string.IsNullOrEmpty(updatedCategory.Title))
                return BadRequest("Title missing");

            categoryToUpdate.Title = updatedCategory.Title;
            _categoriesRepository.Update(categoryToUpdate);
            return Ok("Category updated successfully");
        }

        [HttpPut]
        [Authorize(Roles = UserRoleString.Admin)]
        public IActionResult DeleteCategory([FromBody] CategoryDto deletedCatgory)
        {
            var categoryToDelete = GetCategory(deletedCatgory.Id);
            if (categoryToDelete == null) return NotFound("Category does not exist in the database");
            else
            {
                _categoriesRepository.Delete(categoryToDelete);
                return Ok("Category has been deleted");
            }
        }

    }
}

