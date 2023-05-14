using Notflix.API.Enumerables;

namespace Notflix.API.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public Category? Category { get; set; }
        public int? Rating { get; set; }

        public Movie(string title, string category, int rating)
        {
            Title = title;
            Rating = rating;
        }
    }
}