# Music API

This project is a Music API built with NestJS, MongoDB, and MinIO. It allows users to manage music tracks and playlists, including uploading and storing MP3 files and album cover images.

## Features

- CRUD operations for music tracks
- CRUD operations for playlists
- Upload and store MP3 files and album cover images using MinIO
- Search for tracks and playlists by title, artist, album, or genre

## Prerequisites

- Docker
- Docker Compose

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/nguyendungdev/music_library_management_api.git
cd music_library_management_api
```

### Environment Variables

Create a `development.env` file in the config directory and add the following environment variables:

```
MONGODB_URI=mongodb://user:password@mongodb:27017/musicdb
APP_PORT=3000
API_PREFIX=api/v1
APP_NAME=Music API
MINIO_ENDPOINT=localhost
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=music-library
MINIO_PORT=9000
```

### Docker Compose

Use Docker Compose to build and run the application:

```
docker-compose up --build
```

This will start the following services:

- MongoDB
- MinIO
- Music API

### Access the Application

The Music API will be available at `http://localhost:3000`.
### API Documentation
The API documentation is available at http://localhost:3000/api/v1 using Swagger
## API Endpoints

### Tracks

- `POST /api/v1/tracks` - Create a new track
- `GET /api/v1/tracks` - Get all tracks
- `GET /api/v1/tracks/:id` - Get a track by ID
- `PUT /api/v1/tracks/:id` - Update a track
- `DELETE /api/v1/tracks/:id` - Delete a track

### Playlists

- `POST /api/v1/playlists` - Create a new playlist
- `GET /api/v1/playlists` - Get all playlists
- `GET /api/v1/playlists/:id` - Get a playlist by ID
- `PUT /api/v1/playlists/:id` - Update a playlist
- `DELETE /api/v1/playlists/:id` - Delete a playlist
- `POST /api/v1/playlists/:id/tracks/:trackId` - Add a track to a playlist

### Search

- `GET /api/v1/search?query=searchTerm` - Search for tracks and playlists by title, artist, album, or genre

## File Upload

The application uses MinIO to store MP3 files and album cover images. Ensure that MinIO is running and accessible at the endpoint specified in the environment variables.

## License

This project is licensed under the MIT License.