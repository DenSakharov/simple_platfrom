# Use the official .NET SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /App

# Copy the csproj and restore as distinct layers
COPY PLM_System/*.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
WORKDIR /App/PLM_System
RUN dotnet publish -c Release -o out --no-restore

# Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /App
COPY --from=build-env /App/PLM_System/out .

# Expose the port and run the application
EXPOSE 80
ENTRYPOINT ["dotnet", "PLM_System.dll"]
