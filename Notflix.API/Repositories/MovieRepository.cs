using System.Collections;
using System.Data;
using Dapper;
using Notflix.API.Enumerables;
using Notflix.API.Models;
using Notflix.API.Repositories.Interfaces;

namespace Notflix.API.Repositories
{
    public class MovieRepository : IMovieRepository
    {
        private readonly IDbConnection _connection;

        public MovieRepository(IDbConnection connection)
        {
            _connection = connection;
        }

        public bool EntityExists(string title)
        {
            var entityExists = _connection.QuerySingleOrDefault<bool?>(
                "SELECT * FROM Movies WHERE Title = @Title", new { title }) != null;

            return entityExists;
        }

        public Movie GetById(int id)
        {
            var entity = _connection.QuerySingleOrDefault<Movie>("SELECT * FROM Movies WHERE Id = @id", new { id });

            return entity;
        }

        public Movie GetByTitle(string title)
        {
            var entity = _connection.QuerySingleOrDefault<Movie>("SELECT * FROM Movies WHERE Title = @title", new { title });

            return entity;
        }

        public IEnumerable<Movie> GetByCategory(int category)
        {
            var entities = _connection.QuerySingleOrDefault<IEnumerable<Movie>>("SELECT * FROM Movies WHERE Category = @category", new { category });

            return entities;
        }

        public IEnumerable GetAll()
        {
            return _connection.Query("SELECT * FROM Movies");
        }

        public void Add(Movie entity)
        {
            _connection.Execute("INSERT INTO Movies (...) VALUES (...)", entity);
        }

        public void Update(Movie entity)
        {
            _connection.Execute("UPDATE Movies SET ... WHERE Id = @Id", entity);
        }

        public void Delete(int id)
        {
            _connection.Execute("DELETE FROM Movies WHERE Id = {id}");
        }
    }
}