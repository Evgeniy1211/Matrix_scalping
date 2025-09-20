# Copilot Instructions for Matrix_scalping

## Project Overview
Matrix_scalping is an interactive web application for visualizing the evolution of algorithmic trading technologies (2000–2025). It combines:
- **Evolution Matrix**: A table showing the development of technologies over time.
- **Technology Tree**: A hierarchical visualization of technology relationships.
- **Trading Machine Cases**: Real-world examples of trading systems.
- **Technology Database**: Centralized information about technologies.

### Key Technologies
- **Frontend**: React 18, TypeScript, D3.js, TailwindCSS, shadcn/ui
- **Backend**: Express.js, Drizzle ORM, Zod
- **Build Tool**: Vite

---

## Architecture

### Data Flow
1. **Backend**: Centralized data modules in `backend/data/` provide the source of truth.
   - API endpoints are defined in `backend/routes.ts`.
   - Data validation and typing use shared Zod schemas (`backend/knowledge-base/schema.ts`).
2. **Frontend**: Fetches data exclusively via API using React Query hooks.
   - Example hooks: `useTechnologies`, `useEvolutionData`, `useTradingMachines`.
3. **Integration**: Shared schemas ensure consistent validation between frontend and backend.

### Key Directories
- `client/src/`: Frontend application.
  - `components/`: React components.
  - `hooks/`: API hooks.
  - `lib/`: Utilities.
- `backend/`: Backend server and data.
  - `data/`: Centralized data modules.
  - `knowledge-base/`: Documentation and shared schemas.
  - `routes.ts`: API endpoints.
- `docs/`: Guides and documentation.

---

## Developer Workflows

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Evgeniy1211/Matrix_scalping.git
   cd Matrix_scalping
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   npm start
   ```

### Testing
- Run end-to-end tests:
  ```bash
  npm run test
  ```
- Tests use Vitest and Supertest to validate API contracts and data integrity.

### CI/CD
- CI pipeline runs `lint`, `build`, and `test` on every `main` branch update and pull request.

---

## Project-Specific Conventions

### API-Driven Frontend
- All data is fetched via API endpoints.
- Hooks map directly to endpoints:
  - `useTechnologies` → `/api/technologies`
  - `useEvolutionData` → `/api/evolution`

### Shared Validation
- Zod schemas (`backend/knowledge-base/schema.ts`) are shared between frontend and backend.
- Use `@shared/schema` alias for imports.

### Data Modules
- Centralized in `backend/data/`:
  - `evolution-data.ts`: Evolution matrix and tree data.
  - `technologies.ts`: Technology database.
  - `trading-machines.ts`: Trading machine cases.

### Component Patterns
- Components are modular and reusable.
- Example: `evolution-matrix.tsx` handles dynamic rendering of the evolution matrix.

---

## Integration Points

### External Dependencies
- **D3.js**: For hierarchical visualizations (e.g., technology tree).
- **React Query**: For API data fetching and caching.
- **Zod**: For schema validation.

### Cross-Component Communication
- Use React Context or props for state management.
- Avoid direct imports of backend data; always use API hooks.

---

## Examples

### Adding a New Technology
1. Update `backend/data/technologies.ts`.
2. Add documentation in `backend/knowledge-base/`.
3. Ensure validation via `@shared/schema`.

### Adding a New API Endpoint
1. Define the endpoint in `backend/routes.ts`.
2. Add corresponding data in `backend/data/`.
3. Write e2e tests in `tests/api.e2e.test.ts`.

---

## Notes for AI Agents
- Follow the API-driven architecture; do not hardcode data in the frontend.
- Use shared Zod schemas for validation.
- Ensure new components follow modular patterns.
- Validate all changes with existing tests or add new ones.

---

For more details, refer to the [README.md](../README.md) and `docs/` folder.