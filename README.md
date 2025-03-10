
## **Overview**
This assignment involves **setting up a Web API using Express.js and MongoDB Atlas**, allowing users to interact with a movies database. You will:
1. Load sample movie data into MongoDB Atlas.
2. Build an Express.js Web API to perform CRUD operations.
3. Deploy the API to **Vercel**.

## **Project Setup**

### **Step 1: Load Sample Data in MongoDB Atlas**
1. **Create a new MongoDB Atlas project** 
2. Load the **Sample Dataset**.
3. Ensure you have **database user permissions** and whitelist `0.0.0.0/0` for connections.

### **Step 2: Build the Web API**
1. **Create a new project folder** (e.g., `moviesAPI`) and open it in **VS Code**.
2. Initialize an **Express.js** server with a single `GET /` route returning `{message: "API Listening"}`.
3. Install necessary **npm** packages:
   ```sh
   npm init -y
   npm install express mongoose cors dotenv
   ```
4. Create a `.gitignore` file with:
   ```plaintext
   node_modules
   .env
   ```
5. **Initialize a Git repository**:
   ```sh
   git init
   ```
6. **Add the `moviesDB.js` module**:
   - Create a `modules/` folder.
   - Add `moviesDB.js` (provided in the assignment).

7. **Obtain MongoDB Connection String**:
   - Go to MongoDB Atlas → Select Cluster → Click `Connect` → Choose `Connect Your Application`.
   - Replace `<password>` with **your actual password**.
   - Append `/sample_mflix` to the connection string.
   - Store it in `.env`:
     ```sh
     MONGODB_CONN_STRING=your_connection_string
     ```

8. **Initialize the Database Module** in `server.js`:
   ```js
   const MoviesDB = require("./modules/moviesDB.js");
   const db = new MoviesDB();
   
   db.initialize(process.env.MONGODB_CONN_STRING).then(() => {
       app.listen(HTTP_PORT, () => {
           console.log(`Server listening on: ${HTTP_PORT}`);
       });
   }).catch((err) => {
       console.log(err);
   });
   ```

## **API Routes**

| Method | Route | Description |
|--------|-------|-------------|
| **POST** | `/api/movies` | Add a new movie |
| **GET** | `/api/movies?page=1&perPage=5&title=MovieTitle` | Get movies (optional title filter) |
| **GET** | `/api/movies/:id` | Get movie by ID |
| **PUT** | `/api/movies/:id` | Update a movie by ID |
| **DELETE** | `/api/movies/:id` | Delete a movie by ID |

- **Status Codes:**
  - `201` → Created successfully
  - `204` → No content
  - `500` → Server error


## **Step 3: Deploy to Vercel**
1. **Push code to GitHub**:
   ```sh
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```
2. **Deploy on Vercel**:
   - Follow the **Vercel Guide** (from WEB322 site).
   - Add the **MongoDB connection string** in **Vercel Environment Variables**.
   - Verify deployment and API functionality.

## **Submission Requirements**
1. **Compress `.zip` of your project folder (including `.env`)** and submit it.

