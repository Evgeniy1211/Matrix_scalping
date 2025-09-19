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

State management relies on React's built-in hooks (useState, useEffect) for local component state. The application uses TanStack Query for server state fetching via REST API. Data contracts are defined in `backend/knowledge-base/schema.ts` and shared with the frontend through the alias `@shared/schema`.

### Backend Architecture

The backend uses Express.js with TypeScript in a minimal setup. The server exposes REST API endpoints under `/api/*` from centralized sources in `backend/data/*` and serves the client app (Vite middleware in dev, static in prod).

### Database Layer

The application is configured to use Drizzle ORM with PostgreSQL through Neon Database serverless connections. The schema defines a basic user table with username/password authentication structure. Database migrations are handled through Drizzle Kit, and the configuration supports environment-based database URL management.

### Development Tooling

The build system uses Vite for fast development and production builds, with TypeScript compilation and React JSX support. The development environment includes automatic error overlays and Replit-specific tooling for cloud development. ESBuild handles server-side bundling for production deployments.

## External Dependencies

### UI and Component Libraries

- Radix UI
- shadcn/ui
- Tailwind CSS
- Lucide React

### Data Visualization

- D3.js
- React Hook Form (optional)

### State Management and HTTP

- TanStack Query
- Wouter

### Backend Framework and Database

- Express.js
- Drizzle ORM
- Neon Database
- Zod

### Development and Build Tools

- Vite
- TypeScript
- ESBuild
- Drizzle Kit

## Documentation

Comprehensive documentation has been created for easy content management and customization:

### Available Documentation Files

- `docs/frontend/evolution-matrix-guide.md` — guide for managing the evolution matrix
- `docs/frontend/technology-tree-guide.md` — D3.js technology tree guide
- `project-overview.md` — overall project architecture and quick start

### Key Documentation Features

- Data Structure Explanations
- Visual Customization Guides
- File Relationship Maps
- Step-by-step Examples
- Troubleshooting Sections

### Content Management Workflow

1. Matrix changes — edit `backend/data/evolution-data.ts` (evolutionData/treeData/integrators)
2. Tree changes — edit `backend/data/evolution-data.ts` (treeData exports)
3. Technologies — edit `backend/data/technologies.ts`
4. Trading machines — edit `backend/data/trading-machines.ts`
5. Styling changes — modify `client/src/index.css`

All changes apply automatically with hot reload during development.

The documentation is designed to enable non-technical users to easily add and modify trading technology data without requiring deep React or D3.js knowledge.
