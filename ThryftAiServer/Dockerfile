# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy csproj and restore as distinct layers
COPY ["ThryftAiServer.csproj", "./"]
RUN dotnet restore "ThryftAiServer.csproj"

# Copy everything else and build
COPY . .
RUN dotnet build "ThryftAiServer.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "ThryftAiServer.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY certs /app/certs

# Aedify (and most platforms) need the app listening on 0.0.0.0
# and often provide a PORT env var. Default to 8080 if PORT is not set.
ENV ASPNETCORE_URLS=http://0.0.0.0:8080
ENV ASPNETCORE_HTTP_PORTS=8080

EXPOSE 8080

ENTRYPOINT ["dotnet", "ThryftAiServer.dll"]
