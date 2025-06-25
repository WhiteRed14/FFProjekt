using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarRepairApi.Models;

namespace CarRepairApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarRepairController : ControllerBase
    {
        private readonly CarRepairContext _context;
        public CarRepairController(CarRepairContext context)
        {
            _context = context;
            /*if (!_context.Users.Any())
            {
                _context.Users.AddRange(
                    [
                    new User {
                        Name = "Jan",
                        Surname = "Kowalski",
                        Email = "jan.kowalski@example.com",
                        Role = "Client",
                        Password = "jkpass1"},
                    new User {
                        Name = "Anna",
                        Surname = "Nowak",
                        Email = "anna.nowak@example.com",
                        Role = "Client",
                        Password = "anpass1"},
                    new User {
                        Name = "Piotr",
                        Surname = "Wiśniewski",
                        Email = "piotr.wisniewski@example.com",
                        Role = "Client",
                        Password = "pwpass1"},
                    new User {
                        Name = "Maria",
                        Surname = "Wójcik",
                        Email = "maria.wojcik@example.com",
                        Role = "Client",
                        Password = "mwpas1"},
                ]);
                _context.SaveChanges();
            }
            if (!_context.CarRepairs.Any())
            {
                _context.CarRepairs.AddRange(
                    [
                    new CarRepair { 
                        PlateNumber = "GWE 2137W",
                        Make = "VolksWagen",
                        Model = "Golf",
                        Note = "Wycinanie kata",
                        OwnerId = 1 },

                    new CarRepair {
                        PlateNumber = "KR1234AB",
                        Make = "Toyota",
                        Model = "Corolla",
                        Note = "Wymiana oleju silnikowego i filtra",
                        OwnerId = 2,
                        StartDate = new DateOnly(2025, 3, 10),
                        EndDate = new DateOnly(2025, 3, 11)},

                    new CarRepair {
                        PlateNumber = "WA4567CD",
                        Make = "Audi",
                        Model = "A3",
                        Note = "Naprawa układu hamulcowego",
                        OwnerId = 3,
                        StartDate = new DateOnly(2025, 4, 2),
                        EndDate = new DateOnly(2025, 4, 4)},

                    new CarRepair {
                        PlateNumber ="PO8910EF",
                        Make = "Renault",
                        Model = "Megane",
                        Note = "Wymiana sprzęgła",
                        OwnerId = 4,
                        StartDate = new DateOnly(2025, 2, 15),
                        EndDate = new DateOnly(2025, 2, 17)}
                ]);
                _context.SaveChanges();
            }*/
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarRepair>>> GetCars()
        {
            return await _context.CarRepairs.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<CarRepair>> GetCarRepair(int id)
        {
            var CarRepair = await _context.CarRepairs.FindAsync(id);
            if (CarRepair == null) return NotFound();
            return CarRepair;
        }

        [HttpPost]
        public async Task<ActionResult<CarRepair>> PostCarRepair(CarRepair CarRepair)
        {
            _context.CarRepairs.Add(CarRepair);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCarRepair), new { id = CarRepair.Id }, CarRepair);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCarRepair(int id, CarRepair CarRepair)
        {
            if (id != CarRepair.Id) return BadRequest();

            var existingCarRepair = await _context.CarRepairs.FindAsync(id);
            if (existingCarRepair == null) return NotFound();

            _context.Entry(existingCarRepair).State = EntityState.Detached;
            _context.CarRepairs.Update(CarRepair);

            try { await _context.SaveChangesAsync(); }
            catch (DbUpdateConcurrencyException)
            {
                if (!await CarRepairExists(id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCarRepair(int id)
        {
            var CarRepair = await _context.CarRepairs.FindAsync(id);
            if (CarRepair == null) return NotFound();

            _context.CarRepairs.Remove(CarRepair);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private async Task<bool> CarRepairExists(int id)
        {
            return await _context.CarRepairs.AnyAsync(e => e.Id == id);
        }
    }
}
