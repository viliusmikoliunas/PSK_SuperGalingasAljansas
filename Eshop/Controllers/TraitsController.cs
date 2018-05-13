using System;
using System.Collections.Generic;
using System.Linq;
using Eshop.Data.Entities;
using Eshop.DataContracts.DataTransferObjects;
using Eshop.DataContracts.RepositoryInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Eshop.Controllers
{
    [Produces("application/json")]
    [Route("api/Traits")]
    public class TraitsController : Controller
    {
        private readonly ITraitsRepository _traitsRepository;

        public TraitsController(ITraitsRepository traitsRepository)
        {
            _traitsRepository = traitsRepository;
        }

        [HttpGet]
        public IEnumerable<Trait> GetAll()
        {
            return _traitsRepository.GetAll();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult AddTrait([FromBody] TraitDto traitData)
        {
            if (string.IsNullOrEmpty(traitData.Title))
                return BadRequest("Title missing");

            Trait newTrait = new Trait
            {
                Title = traitData.Title,
            };
            _traitsRepository.Add(newTrait);

            return Ok("Trait added successfully");
        }

        [HttpGet]
        public Trait GetTrait(int id)
        {
            return _traitsRepository.GetTrait(id);
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateTrait([FromBody] TraitDto updatedTrait)
        {
            var traitToUpdate = GetTrait(updatedTrait.Id);
            if (string.IsNullOrEmpty(updatedTrait.Title))
                return BadRequest("Title missing");

            traitToUpdate.Title = updatedTrait.Title;
            _traitsRepository.Update(traitToUpdate);
            return Ok("Trait updated successfully");
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteTrait([FromBody] TraitDto deletedTrait)
        {
            var TraitToDelete = GetTrait(deletedTrait.Id);
            _traitsRepository.Update(TraitToDelete);
            return Ok("Trait updated successfully");
        }

    }
}

