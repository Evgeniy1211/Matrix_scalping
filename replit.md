# Evolution Matrix - Trading Technology Visualization

## Overview

This is a React-based web application that visualizes the evolution of trading machine technologies from 2000 to 2025, with a focus on scalping strategies. The application presents an interactive matrix showing how different trading system components have evolved across five revisions, from traditional machine learning approaches to modern hybrid AI systems. The project includes data visualization components using D3.js, interactive filtering capabilities, and a technology tree representation to help users understand the progression of algorithmic trading technologies.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application follows a modern React architecture using TypeScript and functional components with hooks. The UI is built with shadcn/ui components providing a consistent design system based on Radix UI primitives. The application uses a single-page architecture with client-side routing via Wouter, keeping the navigation simple with just a main evolution matrix page and a 404 fallback.

### Component Structure
The main components are organized around the core visualization features:
- `EvolutionMatrix` - Interactive matrix showing technology evolution across revisions
- `TechnologyTree` - D3.js-powered hierarchical visualization of technology relationships  
- `RevisionExplanations` - Educational content explaining each revision period
- Comprehensive UI component library from shadcn/ui for consistent styling

### Styling and Design System
The project uses Tailwind CSS with a custom design system featuring CSS variables for theming. The configuration supports both light and dark modes with a neutral color palette. Custom utility classes handle interactive states like hover and active elevations, creating a polished user experience.

### State Management and Data Flow
State management relies on React's built-in hooks (useState, useEffect) for local component state. The application uses TanStack Query for any future server state management needs, though the current implementation appears to use static data structures. Data is organized in TypeScript interfaces defining evolution data, revision periods, and technology nodes.

### Backend Architecture
The backend uses Express.js with TypeScript in a minimal setup. The server is configured with Vite integration for development hot reloading and includes basic middleware for JSON parsing, logging, and error handling. The routing structure is prepared for API endpoints with a `/api` prefix, though currently contains placeholder implementations.

### Database Layer
The application is configured to use Drizzle ORM with PostgreSQL through Neon Database serverless connections. The schema defines a basic user table with username/password authentication structure. Database migrations are handled through Drizzle Kit, and the configuration supports environment-based database URL management.

### Development Tooling
The build system uses Vite for fast development and production builds, with TypeScript compilation and React JSX support. The development environment includes automatic error overlays and Replit-specific tooling for cloud development. ESBuild handles server-side bundling for production deployments.

## External Dependencies

### UI and Component Libraries
- **Radix UI** - Comprehensive set of unstyled, accessible UI primitives for building the component system
- **shadcn/ui** - Pre-built component library built on top of Radix UI with consistent styling
- **Tailwind CSS** - Utility-first CSS framework for styling with custom design tokens
- **Lucide React** - Icon library providing consistent iconography throughout the application

### Data Visualization
- **D3.js** - Powerful data visualization library used for creating the interactive technology tree component
- **React Hook Form** - Form state management with validation support (though not actively used in current implementation)

### State Management and HTTP
- **TanStack Query** - Server state management library for caching and synchronizing remote data
- **Wouter** - Lightweight client-side routing library for navigation

### Backend Framework and Database
- **Express.js** - Web application framework for the Node.js backend server
- **Drizzle ORM** - Type-safe ORM for database operations with PostgreSQL support
- **Neon Database** - Serverless PostgreSQL database provider for scalable data storage
- **Zod** - TypeScript schema validation library for data validation and type inference

### Development and Build Tools
- **Vite** - Build tool providing fast development server and optimized production builds
- **TypeScript** - Static type checking for improved code quality and developer experience
- **ESBuild** - Fast JavaScript bundler for server-side code compilation
- **Drizzle Kit** - Database migration and introspection toolkit