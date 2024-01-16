using RabbitMQconsumer.RabbitMq;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHostedService<RabbitMqListener>();

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
