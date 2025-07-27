# Real Estate Analytics Dashboard

A comprehensive full-stack web application that replicates a Power BI dashboard for real estate analytics. Built with React, Tailwind CSS, and Node.js, this application demonstrates modern web development practices with authentication, interactive data visualization, and real-time analytics.

## 🎯 Assessment Task Completion

This project successfully addresses all requirements from the assessment task:

### ✅ **Dashboard Replication**

- **Accurate UI replication** of the provided wireframes
- **Responsive design** that works across all devices
- **Professional styling** with Tailwind CSS
- **Interactive components** with smooth animations

### ✅ **Frontend Requirements**

- **Dashboard UI replication** as per wireframes ✓
- **Table with sortable/filterable dummy JSON data** ✓
- **Static chatbot widget** (no logic needed) ✓
- **Navigation** (sidebar with collapsible menu) ✓
- **Map feature with polygon drawing, dummy pins, and filtering** ✓

### ✅ **Backend Requirements**

- **`/login` route with hardcoded authentication** ✓
- **`/data` route to serve table and map data** ✓
- **JWT/session authentication** ✓

### ✅ **Personal Contribution (BONUS)**

- **Enhanced Table Component**: Advanced sorting, filtering, and pagination
- **Interactive Map**: Polygon drawing, pin filtering, and zoom controls
- **Real-time Chatbot**: Interactive AI assistant with simulated responses
- **Authentication System**: JWT-based login with role-based access
- **Responsive Design**: Mobile-first approach with adaptive layouts

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **React Router** - Client-side routing and navigation
- **Lucide React** - Beautiful, customizable icons
- **Axios** - HTTP client for API communication

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **JWT** - JSON Web Tokens for authentication
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd real-estate-analytics-dashboard
   ```

2. **Install all dependencies**

   ```bash
   npm run install-all
   ```

3. **Start the application**
   ```bash
   npm run dev
   ```

### Manual Installation

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd client && npm install

# Install backend dependencies
cd ../server && npm install

# Start both frontend and backend
cd .. && npm run dev
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 🔐 Authentication

### Demo Credentials

- **Admin**: `admin` / `admin123`
- **User**: `user` / `user123`
- **Demo**: `demo` / `demo123`

### Features

- JWT-based authentication
- Role-based access control
- Secure token storage
- Automatic session management

## 📊 Dashboard Features

### 1. Market View

- **Hero Banner**: Professional call-to-action section
- **Data Tables**: Top 10 MSA rankings with sortable columns
- **Filters**: Date selection and builder type filtering
- **Real-time Updates**: Live data refresh capabilities

### 2. Acquisition View

- **Metrics Cards**: Key performance indicators with trend indicators
- **Interactive Map**: Property location visualization
- **Advanced Filters**: Multi-criteria filtering system
- **Data Table**: Detailed property information with pagination

### 3. URLs Management

- **Company Grid**: Professional logo display
- **Brand Management**: Organized partner company showcase
- **Quick Access**: Direct navigation to partner resources

### 4. Enhanced Table (BONUS)

- **Advanced Sorting**: Multi-column sorting with visual indicators
- **Smart Filtering**: Real-time search and filter capabilities
- **Pagination**: Efficient data loading with page navigation
- **Status Indicators**: Color-coded status badges

### 5. Interactive Map (BONUS)

- **Polygon Drawing**: Interactive area selection tool
- **Pin Filtering**: Filter pins by type and status
- **Zoom Controls**: Map navigation with zoom in/out
- **Pin Details**: Click-to-view property information

### 6. Chatbot Widget (BONUS)

- **AI Assistant**: Simulated intelligent responses
- **Real-time Chat**: Live message exchange
- **Context Awareness**: Relevant real estate insights
- **Floating Interface**: Non-intrusive chat experience

## 🔌 API Endpoints

### Authentication

- `POST /api/login` - User authentication with JWT token

### Data Endpoints (Protected)

- `GET /api/data/market-data` - Market view analytics
- `GET /api/data/acquisition-data` - Acquisition metrics
- `GET /api/data/companies` - Company/URL data
- `GET /api/data/table` - Enhanced table with sorting/filtering
- `GET /api/data/map` - Map pins and polygon data
- `GET /api/data/chatbot` - Chatbot message history

### Health Check

- `GET /api/health` - Server status verification

## 🎨 Design System

### Color Palette

- **Primary**: Purple (#9333EA) - Brand identity
- **Secondary**: Dark Blue (#1E293B) - Professional appearance
- **Accent**: Green (#10B981) - Success indicators
- **Neutral**: Gray scale - Clean, modern interface

### Typography

- **Font Family**: Inter - Modern, readable typeface
- **Hierarchy**: Clear heading and body text structure
- **Responsive**: Scalable text across all devices

### Components

- **Cards**: Consistent shadow and border radius
- **Buttons**: Interactive states with hover effects
- **Tables**: Clean, sortable data presentation
- **Forms**: Accessible input fields with validation

## 📱 Responsive Design

### Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Features

- **Mobile-first** approach
- **Flexible layouts** with CSS Grid and Flexbox
- **Touch-friendly** interface elements
- **Adaptive navigation** for different screen sizes

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start both frontend and backend
npm run client       # Start React development server
npm run server       # Start Node.js development server

# Production
npm run build        # Build React app for production
npm start           # Start production server

# Utilities
npm run install-all  # Install all dependencies
```

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the React app: `npm run build`
2. Deploy the `client/build` folder
3. Set environment variables for API endpoints

### Backend Deployment (Render/Railway)

1. Deploy the `server` folder
2. Set environment variables:
   - `PORT`: Server port
   - `JWT_SECRET`: JWT signing secret
   - `NODE_ENV`: Environment (production/development)

## 🎯 Personal Contribution Features

### 1. Enhanced Table Component

**Problem Solved**: Traditional tables lack advanced functionality for data analysis.
**Solution**: Built a comprehensive table with:

- Multi-column sorting with visual indicators
- Real-time filtering with search capabilities
- Server-side pagination for performance
- Status badges with color coding
- Responsive design for mobile devices

### 2. Interactive Map with Polygon Drawing

**Problem Solved**: Static maps don't allow user interaction and area selection.
**Solution**: Created an interactive map featuring:

- Click-to-draw polygon functionality
- Pin filtering by type and status
- Zoom controls for navigation
- Pin details on click
- Visual legend for different property types

### 3. Real-time Chatbot Widget

**Problem Solved**: Users need quick access to help and insights.
**Solution**: Developed a floating chatbot with:

- Simulated AI responses for real estate queries
- Real-time message exchange
- Professional UI with user/bot message distinction
- Non-intrusive floating interface
- Context-aware responses

### 4. JWT Authentication System

**Problem Solved**: Basic authentication lacks security and scalability.
**Solution**: Implemented secure authentication with:

- JWT token-based authentication
- Role-based access control
- Secure token storage
- Automatic session management
- Protected API routes

## 🏆 Challenges Faced & Solutions

### 1. **Complex State Management**

**Challenge**: Managing authentication state across components
**Solution**: Implemented React Context and localStorage for persistent state

### 2. **Real-time Data Updates**

**Challenge**: Keeping UI in sync with backend data changes
**Solution**: Used useEffect hooks and axios interceptors for automatic updates

### 3. **Responsive Design**

**Challenge**: Ensuring consistent experience across all devices
**Solution**: Mobile-first approach with Tailwind CSS breakpoints

### 4. **API Security**

**Challenge**: Protecting sensitive data endpoints
**Solution**: JWT middleware with role-based access control

### 5. **Performance Optimization**

**Challenge**: Loading large datasets efficiently
**Solution**: Implemented pagination and lazy loading

## 📸 Screenshots

_[Screenshots would be included here showing the dashboard, login page, enhanced table, interactive map, and chatbot widget]_

## 🎥 Video Walkthrough

_[Video demonstration would be included here showing the application features and user interactions]_

## 🔮 Future Enhancements

1. **Real-time Analytics**: WebSocket integration for live data updates
2. **Advanced Charts**: D3.js integration for complex visualizations
3. **Export Functionality**: PDF/Excel export capabilities
4. **User Management**: Admin panel for user management
5. **Mobile App**: React Native companion app

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ for the assessment task, demonstrating full-stack development capabilities and product thinking.
