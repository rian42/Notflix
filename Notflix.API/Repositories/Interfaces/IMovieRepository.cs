using System.Collections;
using Notflix.API.Models;

namespace Notflix.API.Repositories.Interfaces
{
    public interface IMovieRepository
    {
        bool EntityExists(string title);

        Movie GetById(int id);

        Movie GetByTitle(string title);

        IEnumerable<Movie> GetByCategory(int category);

        IEnumerable GetAll();

        void Add(Movie entity);

        void Update(Movie entity);

        void Delete(int id);
    }
}