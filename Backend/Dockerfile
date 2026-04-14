# --- Stage 1: Build the Application ---
# Replace '8.0' with '9.0' or '10.0' if your GameStore.Api.csproj uses a newer TargetFramework
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy the project file and restore dependencies
COPY ["GameStore.Api.csproj", "./"]
RUN dotnet restore "GameStore.Api.csproj"

# Copy the rest of the code and build it
COPY . .
RUN dotnet publish "GameStore.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# --- Stage 2: Run the Application ---
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/publish .

# Tell .NET to listen on port 8080 (Render's default expectation)
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "GameStore.Api.dll"]