using System.Data;
using System.Data.SqlClient;
using Notflix.API.Repositories;
using Notflix.API.Repositories.Interfaces;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

builder.Services.AddScoped<IDbConnection>(provider =>
        new SqlConnection(config.GetConnectionString("NotflixConnectionString")));

builder.Services.AddScoped<IMovieRepository, MovieRepository>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => options.AddPolicy("Cors",
                builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("Cors");

app.MapControllers();

app.Run();