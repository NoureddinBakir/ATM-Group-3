// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}


// GET /users/[userID]
// CRUD - Create, UPdate, Delete
// API Methods -  GET, PATCH, PUT, DELETE
// /users - GET, PATCH, DELETE
// localhost:8080/users/[userID]