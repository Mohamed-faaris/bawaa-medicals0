# Bavaa Medicals

A TurboRepo monorepo for a medical delivery platform with multiple applications.

## 📁 Project Structure

```
bavaa-medicals/
├── apps/
│   ├── admin-panel/      # Admin dashboard (Vite + React)
│   ├── mobile/           # Customer mobile app (Vite + React)
│   ├── delivery-mobile/  # Delivery partner app (Vite + React)
│   ├── admin-mobile/     # Admin mobile app (Vite + React)
│   └── server/           # Express.js backend API
├── packages/
│   ├── shared/           # Shared Zod schemas and types
│   ├── drizzle-db/       # Database package with Drizzle ORM
│   └── ui/               # Shared UI components
```

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) installed
- Node.js 18+ (optional, Bun is preferred)

### Installation

```bash
# Install dependencies for all packages
bun install

# Start all applications in development mode
bun run dev
```

### Running Individual Apps

```bash
# Admin Panel (http://localhost:3000)
bunx turbo run dev --filter=@bavaa/admin-panel

# Mobile App (http://localhost:3001)
bunx turbo run dev --filter=@bavaa/mobile

# Delivery Mobile App (http://localhost:3002)
bunx turbo run dev --filter=@bavaa/delivery-mobile

# Admin Mobile App (http://localhost:3003)
bunx turbo run dev --filter=@bavaa/admin-mobile

# Server API (http://localhost:5000)
bunx turbo run dev --filter=@bavaa/server
```

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start all apps in development mode |
| `bun run build` | Build all apps for production |
| `bun run lint` | Run ESLint across all packages |
| `bun run typecheck` | Run TypeScript type checking |
| `bun run clean` | Clean all node_modules and build outputs |

## 🛠 Tech Stack

### Frontend
- **Vite** - Build tool
- **React** - UI library
- **TypeScript** - Type safety
- **TanStack Router** - File-based routing
- **TanStack Query** - Data fetching and caching
- **TailwindCSS** - Utility-first CSS framework

### Backend
- **Express.js** - Web framework
- **Drizzle ORM** - Database ORM
- **Zod** - Schema validation

### Monorepo
- **TurboRepo** - Build system
- **Bun** - Package manager and runtime

## 📱 Applications

### Admin Panel
Web-based admin dashboard for managing products, orders, and users.
- Port: 3000
- Stack: Vite + React + TailwindCSS

### Mobile App
Customer-facing mobile app for browsing products and placing orders.
- Port: 3001
- Stack: Vite + React + TailwindCSS

### Delivery Mobile App
App for delivery partners to manage deliveries.
- Port: 3002
- Stack: Vite + React + TailwindCSS

### Admin Mobile App
Mobile admin interface for on-the-go management.
- Port: 3003
- Stack: Vite + React + TailwindCSS

### Server
REST API backend serving all applications.
- Port: 5000
- Stack: Express.js + Drizzle ORM

## 🔗 Shared Packages

### @bavaa/shared
Shared Zod schemas and TypeScript types used across all applications.

```typescript
import { userSchema, createUserSchema, type User } from '@bavaa/shared';

// Validate input
const result = createUserSchema.parse({
  name: "John Doe",
  email: "john@example.com",
  role: "customer"
});
```

### @bavaa/drizzle-db
Database configuration and schema definitions using Drizzle ORM.

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run tests and type checking: `bun run typecheck`
4. Commit your changes
5. Push and create a pull request

## 📝 License

MIT License - see LICENSE file for details.