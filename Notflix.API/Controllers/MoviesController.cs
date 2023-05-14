using Microsoft.AspNetCore.Mvc;
using Notflix.API.Models;
using Notflix.API.Repositories.Interfaces;

namespace Notflix.API.Controllers
{
    [Route("api/movies")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieRepository _repository;
        private readonly ILogger<MoviesController> _logger;

        public MoviesController(IMovieRepository repo, ILogger<MoviesController> logger)
        {
            _repository = repo;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAllMovies()
        {
            try
            {
                var movies = _repository.GetAll();

                if (movies is null)
                    return NotFound();

                return Ok(movies);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("exists")]
        public IActionResult GetMovieExists([FromQuery] string title)
        {
            var exists = _repository.EntityExists(title.Trim());
            return Ok(exists);
        }

        [HttpPost("getmoviebytitle")]
        public IActionResult GetMovieByTitle([FromQuery] string title)
        {
            try
            {
                var entity = _repository.GetByTitle(title);

                if (entity is null)
                    return NotFound();

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("getmoviesbycategory")]
        public IActionResult GetMoviesByCategory([FromQuery] int category, string title)
        {
            try
            {
                //    //var movie = new Movie(title, Category, id);
                //    var entity = _repository.GetByIdOrDescription(movie);

                //    if (movie is null)
                //        return NotFound();

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("updatemovie")]
        public IActionResult UpdateMovie([FromBody] Movie movie)
        {
            try
            {
                var movieExists = _repository.EntityExists(movie.Title);

                if (!movieExists)
                    return BadRequest("Movie doesn't exist?");

                _repository.Update(movie);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("addNewMovie")]
        public IActionResult AddMovie([FromBody] Movie movie)
        {
            try
            {
                var movieExists = _repository.EntityExists(movie.Title);

                if (movieExists)
                    return BadRequest("Movie already exists");

                _repository.Add(movie);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {
            try
            {
                _repository.Delete(id);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}