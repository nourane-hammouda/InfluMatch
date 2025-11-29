# Frontend-Backend Integration Guide

## ✅ What Has Been Done

### 1. **Frontend Structure**
- Moved frontend folder from `InfluMatch Platform Design/` to `frontend/` for better organization
- Updated Vite configuration to use port **5173** (matching Django CORS settings)
- Added Vite proxy configuration to forward `/api` requests to Django backend

### 2. **API Integration**
- Created `frontend/src/lib/api.ts` - API service utility for Django backend communication
  - Handles JWT token storage and refresh
  - Automatic token refresh on 401 errors
  - Generic API methods (GET, POST, PUT, PATCH, DELETE)
  
### 3. **Authentication**
- Updated `frontend/src/contexts/AuthContext.tsx` to use real API calls instead of mocks
- Created Django authentication endpoints:
  - `/api/auth/register/` - User registration
  - `/api/auth/token/` - Login (uses email instead of username)
  - `/api/auth/token/refresh/` - Token refresh
  - `/api/auth/user/` - Get current user info
- Created custom JWT serializer for email-based authentication

### 4. **Django Configuration**
- Updated CORS settings to allow frontend on port 5173
- Configured Django to serve frontend build in production mode
- Added frontend build directory path in settings

## 🚀 How to Run

### Development Mode

1. **Start Django Backend:**
   ```bash
   cd /Users/nouranehammouda/miniconda3/influmatch
   source venv/bin/activate  # or ./venv/bin/python
   python manage.py runserver
   ```
   Backend runs on: `http://127.0.0.1:8000`

2. **Start Frontend (in a new terminal):**
   ```bash
   cd /Users/nouranehammouda/miniconda3/influmatch/frontend
   npm install  # if not already done
   npm run dev
   ```
   Frontend runs on: `http://localhost:5173`

### Production Mode

1. **Build Frontend:**
   ```bash
   cd frontend
   npm run build
   ```
   This creates a `build/` directory with production assets.

2. **Update Django Settings:**
   - Set `DEBUG = False` in `backend/settings.py`
   - Django will automatically serve the frontend build

3. **Run Django:**
   ```bash
   python manage.py collectstatic
   python manage.py runserver
   ```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "type_utilisateur": "influenceur" // or "entreprise"
  }
  ```

- `POST /api/auth/token/` - Login
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `GET /api/auth/user/` - Get current user (requires authentication)
- `POST /api/auth/token/refresh/` - Refresh access token

## ⚠️ Important Notes

### Type Mapping
- Frontend uses: `'influencer'` and `'company'`
- Backend uses: `'influenceur'` and `'entreprise'`
- The API service automatically handles this conversion

### Environment Variables
Create a `.env` file in the `frontend/` directory (optional):
```
VITE_API_URL=http://127.0.0.1:8000/api
```
If not set, it defaults to `http://127.0.0.1:8000/api`

### CORS Configuration
The Django backend is configured to allow requests from:
- `http://localhost:5173`
- `http://127.0.0.1:5173`

If you change the frontend port, update `CORS_ALLOWED_ORIGINS` in `backend/settings.py`

## 🔧 Potential Modifications Needed

### 1. **User Profile Data**
The `AuthContext` currently expects certain profile fields. You may need to:
- Update the user endpoint to return more profile data
- Map Django model fields to frontend interface
- Add profile completion logic based on your models

### 2. **Additional API Endpoints**
You'll need to create views and serializers for:
- Influencer profiles
- Company profiles
- Campaigns
- Applications
- Notifications
- Marketplace data

### 3. **Error Handling**
Consider adding:
- Better error messages in French
- Toast notifications for API errors
- Loading states for async operations

### 4. **Protected Routes**
Update `App.tsx` to:
- Check authentication status from API
- Redirect to login if not authenticated
- Handle token expiration gracefully

## 📁 File Structure

```
influmatch/
├── backend/          # Django project settings
├── api/              # Django app
│   ├── views/        # API views
│   │   ├── auth_views.py
│   │   └── user_views.py
│   ├── serializers/  # DRF serializers
│   └── models/       # Database models
├── frontend/         # React + Vite frontend
│   ├── src/
│   │   ├── services/
│   │   │   └── api.ts        # API service
│   │   └── contexts/
│   │       └── AuthContext.tsx
│   └── vite.config.ts
└── manage.py

```

## 🐛 Troubleshooting

### Frontend can't connect to backend
- Check that Django is running on port 8000
- Verify CORS settings in `backend/settings.py`
- Check browser console for CORS errors

### Authentication not working
- Verify the JWT serializer is correctly configured
- Check that user model uses email as USERNAME_FIELD
- Test endpoints with curl or Postman first

### Build errors
- Make sure all dependencies are installed: `npm install`
- Check Node.js version compatibility
- Clear node_modules and reinstall if needed

