# Healthcare Doctor Finder Application

## Overview

This is a full-stack healthcare doctor finder application built with React, Express.js, and TypeScript. The application allows users to search for doctors by name, specialization, department, and location. It features a modern UI with shadcn/ui components, TailwindCSS styling, and a responsive design optimized for medical services.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: shadcn/ui components with Radix UI primitives
- **Styling**: TailwindCSS with custom medical theme colors
- **State Management**: React Query (@tanstack/react-query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Data Layer**: In-memory storage with interface for future database integration
- **API Design**: RESTful API with structured error handling

### Data Storage
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Shared schema definitions between client and server
- **Migrations**: Database migrations managed through Drizzle Kit
- **Current Implementation**: In-memory storage (MemStorage) with interface for easy database migration

## Key Components

### Database Schema
- **doctors**: Contains doctor information (name, qualification, specialization, department, location, availability)
- **departments**: Department information with doctor counts
- **users**: User authentication data (prepared for future implementation)

### API Endpoints
- `GET /api/doctors` - Retrieve all available doctors
- `GET /api/doctors/department/:department` - Filter doctors by department
- `GET /api/doctors/search?q=query` - Search doctors by name, specialization, or location
- `GET /api/doctors/:id` - Get specific doctor details
- `GET /api/departments` - Get all departments
- `GET /api/stats` - Get application statistics

### Frontend Components
- **DoctorCard**: Individual doctor display with consultation actions
- **SearchBar**: Search functionality with location filtering
- **DepartmentFilter**: Department-based filtering with badges
- **StatsCard**: Dashboard statistics display
- **UI Components**: Comprehensive shadcn/ui component library

## Data Flow

1. **Client Request**: User interacts with search/filter components
2. **Query Processing**: React Query manages API calls and caching
3. **Server Processing**: Express routes handle requests and validate parameters
4. **Data Retrieval**: Storage layer (currently in-memory) provides data
5. **Response**: JSON responses sent back to client
6. **UI Update**: React components re-render with new data

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React-DOM, React Query)
- UI libraries (Radix UI, shadcn/ui components)
- Styling (TailwindCSS, class-variance-authority)
- Utilities (date-fns, clsx, lucide-react for icons)

### Backend Dependencies
- Express.js for server framework
- Drizzle ORM for database interactions
- @neondatabase/serverless for PostgreSQL connection
- Zod for schema validation
- TypeScript for type safety

### Development Dependencies
- Vite for build tooling
- ESBuild for production builds
- Replit-specific plugins for development environment

## Deployment Strategy

### Development
- **Server**: Development server runs on Node.js with tsx for TypeScript execution
- **Client**: Vite dev server with HMR (Hot Module Replacement)
- **Database**: PostgreSQL connection via DATABASE_URL environment variable

### Production
- **Build Process**: 
  - Client: Vite builds static assets to `dist/public`
  - Server: ESBuild bundles server code to `dist/index.js`
- **Serving**: Express serves both API routes and static frontend files
- **Database**: Production PostgreSQL database via Neon or similar provider

### Environment Configuration
- **Database**: Requires DATABASE_URL environment variable
- **Development**: NODE_ENV=development for dev features
- **Production**: NODE_ENV=production for optimized builds

### Key Architectural Decisions

1. **Monorepo Structure**: Single repository with shared TypeScript definitions
2. **Type Safety**: End-to-end TypeScript with shared schema definitions
3. **Modern UI**: shadcn/ui for consistent, accessible components
4. **Scalable Data Layer**: Interface-based storage for easy database migration
5. **Responsive Design**: Mobile-first approach with Tailwind utilities
6. **Performance**: React Query for efficient data fetching and caching
7. **Medical Theme**: Custom CSS variables for healthcare-appropriate styling

The application is designed to be easily extendable with features like user authentication, appointment booking, and real-time updates while maintaining clean separation of concerns and type safety throughout the stack.