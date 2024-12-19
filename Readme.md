# Todo task API Documentation

## Overview of the service
It consist of features like creating todos,updating,filtering , deleting etc

## Base URL
```
http://localhost:3000/todos
```

## Endpoints

### List Todos
Retrieves a list of todos with optional filtering.

- **URL**: `/`
- **Method**: `GET`
- **Query Parameters**:
  - `filter` (optional): 
    - `all`: All todos (default)
    - `done`: Completed todos
    - `upcoming`: todos with date time greater than current day/date
- **Success Response**:
  - **Code**: 200
  - **Content**: redirects to page with list of todos and add todo forms
- **Error Response**:
  - **Code**: 400
  - **Response**: `{ "success": false, "message": "Error listing Todos" }`
- **Sample Request**:
  ```
  GET /todos?filter=upcoming
  ```

### Create Todo
Creates a new todo item.

- **URL**: `/`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "name": "Complete project",
    "description": "Finish the todo API implementation",
    "date": "2024-12-25T10:00:00",
    "isDone": false
  }
  ```
- **Required Fields**:
  - `name` (string): 3-50 characters
  - `description` (string): 5-200 characters
  - `date` (ISO date string)
- **Optional Fields**:
  - `isDone` (boolean): defaults to false
- **Success Response**:
  - **Code**: 201
  - **Content**: Created todo object
- **Error Response**:
  - **Code**: 400
  - **Content**: 
    ```jsn
    {
      "success": false,
      "message": "Validation Error",
      "details": ["Name must be between 3 and 50 characters"]
    }
    ```

### Update Todo
Updates an existing todo item.

- **URL**: `/:id`
- **Method**: `PUT`
- **URL Parameters**: 
  - `id`: Todo ID
- **Request Body**: Same as Create Todo
- **Success Response**:
  - **Code**: 200
  - **Content**: Updated todo object
- **Error Response**:
  - **Code**: 404
  - **Content**: `{ "success": false, "message": "Todo not found" }`

### Toggle Todo Status
Toggles the completion status of a todo.

- **URL**: `/:id/toggle`
- **Method**: `PUT`
- **URL Parameters**:
  - `id`: Todo ID
- **Success Response**:
  - **Code**: 200
  - **Content**: Updated todo object
- **Error Response**:
  - **Code**: 404
  - **Content**: `{ "success": false, "message": "Todo not found" }`

### Delete Todo
Deletes a todo item.

- **URL**: `/:id`
- **Method**: `DELETE`
- **URL Parameters**:
  - `id`: Todo ID
- **Success Response**:
  - **Code**: 200
  - **Content**: `{ "success": true, "message": "Todo deleted successfully" }`
- **Error Response**:
  - **Code**: 404
  - **Content**: `{ "success": false, "message": "Todo not found" }`

## Data Models

### Todo Schema
```typescript
{
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50
  },
  description: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 200
  },
  date: {
    type: Date,
    required: true
  },
  isDone: {
    type: Boolean,
    default: false
  }
}
```

## Error Handling

All endpoints return errors in the following format:
```json
{
  "success": false,
  "message": "Error message here",
  "details": ["Optional array of specific error details"]
}
```

Common error codes:
- `400`: Bad Request (validation errors)
- `404`: Not Found
- `500`: Internal Server Error

## Frontend Integration

### AJAX Requests
When making AJAX requests, include the header:
```javascript
headers: {
  'X-Requested-With': 'XMLHttpRequest'
}
```

### Form Validation Rules
- Name: 3-50 characters
- Description: 5-200 characters
- Date: Valid ISO date string
- isDone: Boolean (optional)

## Examples

### Create Todo Request
```javascript
fetch('/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  body: JSON.stringify({
    name: "Team meeting",
    description: "Weekly sync with the development team",
    date: "2024-12-21T14:00:00"
  })
});
```
