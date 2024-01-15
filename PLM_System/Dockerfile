# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Specify NuGet packages directory
ENV NUGET_PACKAGES C:\\Users\\User\\.nuget\\packages
# copy everything else and build app
COPY . .
RUN dotnet publish -c release -o /app --no-restore --packages C:\\Users\\User\\.nuget\\packages

# Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

# Expose the port your application will run on
EXPOSE 80

ENTRYPOINT ["dotnet", "PLM_System.dll"]