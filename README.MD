# Blogging Site Application

This Node.js application is designed to manage Blogs with two types of users: Admin and Regular users. The application implements user authentication with Blogs, JWT authorization, and provides various endpoints for Blogging-site.

## Getting Started

1. extract the  Blogging-Site folder from given ZIP file 
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start 
```

The server will run on `http://localhost:3000` by default .

## Endpoints
#### USER

### 1. `/` (POST)

- **Description**: Handles user signup and provides a newly created user and JWT token upon successful response.

```json
{
    "username":"Mamta Bisht",
    "email":"mamtabisht2@gmail.com",
    "password": "mamta@123",
    "role": "admin"
    
}
```


### 2. `/login` (POST)

- **Description**: Handles user authentication and provides a JWT token upon successful login.

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```


### 3. `/logout` (POST)

- **Description**: Handles user logout.


###### BLOGS
### 1. `/` (GET)

- **Description**: Displays a list of Blogs.


### 2. `/` (POST)

- **Description**: Adds a new Blog to the Blog-Site. Only accessible by Admin users.


```json
{
    "blogTitle": "dummy4",
    "category": "new category",
    "shortDescription": "short",
    "longDescription": "long",
    "blogImage": "",
    "readTime": 13,
    "createdDate": "14-13-2023",
    "tags": ""
}
```


### 3. `/:id` (DELETE)

- **Description**: Deletes a blog from the blogging site. Only accessible by Admin users.


### 4. `/` (PATCH)

- **Description**: Adds a update aby Blog to the Blog-Site. Only accessible by Admin users.


```json
{
    "blogTitle": "dummy4",
    "category": "new category",
    "shortDescription": "short",
    "longDescription": "long",
    "blogImage": "",
    "readTime": 13,
    "createdDate": "14-13-2023",
    "tags": ""
}

## Note




