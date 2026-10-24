# Minzo Africa — Liberia Services Directory & Reviews

A web-based directory that helps people in Liberia discover healthcare facilities and service providers, explore available services, compare ratings, and make more informed decisions about their care.

## 1. Project Overview

Minzo Africa is a healthcare discovery platform designed to improve access to information about healthcare facilities and professionals in Liberia.

The platform provides a centralized directory where users can search for facilities, explore categories, view business information, and read or submit reviews.

### Objectives

- Make healthcare facilities easier to discover.
- Centralize facility contact information and service details.
- Help users compare facilities through ratings and reviews.
- Allow business owners to register and manage their listings, subject to approval.
- Support administrators in verifying listings and moderating platform content.

## 2. Key Features

### Public Directory
- Browse healthcare categories, including hospitals, clinics, pharmacies, laboratories, dental care, maternity services, specialist care, and eye care.
- Search for facilities by name and relevant criteria.
- Filter and explore directory listings.
- View facility details, contact information, ratings, and reviews where available.
- Discover top-rated facilities.
- Find nearby facilities when location permissions and the required backend functionality are available.

### Reviews and Ratings
- Submit ratings and written reviews through an authenticated account.
- Support anonymous review display where implemented.
- Prevent duplicate reviews according to the platform's review rules.
- Provide moderation workflows before reviews are published.

### Business Management
- Support business registration and facility ownership workflows.
- Allow owners to manage their listings after approval.
- Display verification status for approved businesses.

### Administration
- Review and approve business registrations.
- Moderate reviews and directory content.
- Manage facility information and verification status.
- Maintain audit records for administrative actions where implemented.

*Feature availability depends on the current backend implementation and integration status.*

## 3. Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework, routing, and application rendering |
| React | Component-based user interface |
| TypeScript | Static typing and safer development |
| Tailwind CSS | Responsive styling and utility-based design |
| Lucide React | Icons for navigation, categories, and interface elements |
| Next.js App Router | Page routing and layouts |
| REST API | Communication between the frontend and backend |
| Node.js backend | Server-side API functionality |
| MongoDB | Data persistence, according to the project architecture |
| Git and GitHub | Version control and team collaboration |
| Render | Backend hosting and API deployment |

## 4. System Architecture

Minzo Africa uses a frontend/backend architecture.

```text
User
  |
  v
Next.js Frontend
  |
  +-- Pages and layouts
  +-- Reusable UI components
  +-- Search and filtering
  +-- API service layer
  |
  v
REST API
  |
  +-- Authentication
  +-- Business directory
  +-- User and review operations
  +-- Administrative operations
  |
  v
MongoDB Database
```

The frontend handles presentation, navigation, user interactions, and API requests. The backend handles business logic, authentication, validation, data operations, and authorization.

## 5. Technical Implementation Details

### 5.1 Frontend Structure

The application uses the Next.js App Router to organize pages and shared layouts.

- `app/` — application routes, page components, global styles, and root layout.
- `components/layout/` — reusable interface elements such as the navigation bar, footer, and search bar.
- `components/home/` — homepage sections, category grids, facility cards, nearby facilities, and informational sections.
- `lib/` — shared utilities, category configuration, and API integration logic.

Components are designed for reuse to keep the interface consistent and make future maintenance easier.

### 5.2 API Integration

The frontend communicates with the backend through a shared API utility layer, including `lib/api.ts`.

The API layer is responsible for:

- Constructing API request URLs.
- Sending HTTP requests to the backend.
- Processing JSON responses.
- Normalizing backend facility data for frontend components.
- Handling unsuccessful responses and API errors.

The frontend should use a configurable backend base URL rather than hardcoding deployment URLs throughout individual components.

### 5.3 Backend Endpoints

The documented backend API includes the following routes:

| Endpoint | Purpose |
|---|---|
| `GET /hello` | Health check |
| `GET /api/v1/business/all` | Retrieve business listings |
| `GET /api/v1/business/one/:id` | Retrieve a business by ID |
| `GET /api/v1/business/nearby` | Retrieve nearby businesses |
| `GET /api/v1/business/top-rated` | Retrieve top-rated businesses |
| `GET /api/v1/business/ratings/:id` | Retrieve ratings for a business |
| `/api/v1/auth` | Authentication operations |
| `/api/v1/users` | User-related operations |
| `/api/v1/admin` | Administrative operations |

The actual HTTP methods, request parameters, authentication requirements, and response structures should be confirmed against the backend implementation before integrating each endpoint.

### 5.4 Facility Categories

Facility categories are maintained in a shared configuration module, such as `lib/categories.ts`.

The category configuration supplies labels, values, and other presentation metadata used to render category cards and construct search URLs.

For example, selecting a category can navigate to a URL such as:

`/search?type=Hospital`

URL query parameters allow the search page to initialize its filters based on the selected category.

### 5.5 Search and Filtering

The search interface allows users to enter search terms and explore directory listings.

Depending on the backend support, filters can include:

- Facility name or keyword.
- Category.
- County.
- Rating.
- Verification status.
- Proximity to the user's location.

Search values should be encoded when constructing URLs, and filtering logic should remain consistent between the frontend and backend.

### 5.6 Responsive UI and Styling

Tailwind CSS is used to implement responsive layouts, typography, spacing, borders, colors, and interaction states.

The interface uses reusable components and responsive breakpoints to adapt to mobile and desktop screens.

Interactive elements include hover states, keyboard focus indicators, transitions, and clear navigation affordances.

Lucide React provides consistent icons for healthcare categories and interface controls.

### 5.7 Authentication and Authorization

Authentication-related operations are handled through the backend API.

Protected operations should require valid authentication, while authorization checks must be enforced by the backend according to the user's role.

The intended roles include public users, business owners, and administrators. Business verification and administrative permissions should never rely solely on frontend visibility or client-side checks.

### 5.8 Data Validation and Error Handling

The application should handle API failures, empty search results, loading states, malformed responses, and unavailable services gracefully.

The frontend should not assume that every request succeeds or that every facility has every optional field populated.

Backend validation remains authoritative for authentication, reviews, business registration, and administrative operations.

## 6. Installation and Local Development

### Prerequisites

- Node.js and npm.
- Git.
- Access to the Minzo Africa backend API.
- Access to any required environment variables.

### Clone the Repository

```bash
git clone <FRONTEND_REPOSITORY_URL>
cd minzo-africa
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_API_URL=https://minzo-mvp-backend.onrender.com
```

Use the actual environment variable name expected by the existing API utility. If `lib/api.ts` uses a different name, retain that name rather than introducing a conflicting variable.

Do not commit `.env.local`, credentials, private API keys, or secrets to GitHub.

### Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

### Run the Production Build Locally

```bash
npm run start
```

## 7. Development Guidelines

- Use TypeScript for new components and API integrations.
- Prefer reusable components over duplicated interface code.
- Keep API communication in the shared service layer where practical.
- Follow Next.js App Router conventions.
- Add `"use client"` only to components that require client-side interactivity or browser APIs.
- Use `next/navigation` for App Router navigation hooks.
- Keep environment-specific values out of source code.
- Test responsive layouts and loading, empty, and error states.
- Avoid committing unresolved merge conflicts or generated build artifacts.
- Validate backend response structures before relying on them in the UI.

## 8. Testing and Quality Assurance

Before submitting changes, verify:

- The application builds successfully.
- Navigation and search links work as expected.
- API requests use the correct base URL and endpoint.
- Loading and error states are handled.
- Category filters and query parameters behave correctly.
- Facility cards render correctly when optional data is missing.
- Responsive layouts work on mobile and desktop.
- Protected features respect authentication and authorization requirements.

Run the production build with:

```bash
npm run build
```

## 9. Deployment

The Next.js frontend can be deployed to a compatible hosting platform, such as Vercel, with the required environment variables configured in the deployment settings.

The backend is hosted separately, and the frontend's API base URL must point to the appropriate backend environment.

Before deployment, confirm that:

- The production build completes successfully.
- The frontend uses the correct production API URL.
- The backend is available and returns the expected response structures.
- Required environment variables are configured.
- Any necessary cross-origin resource sharing (CORS) settings allow the frontend origin.
- No secrets or development-only configuration are exposed.

## 10. Project Status

Minzo Africa is being developed as a minimum viable product (MVP). The directory interface, API integration, business workflows, reviews, and administration capabilities should be assessed individually to distinguish completed functionality from planned or partially integrated features.

## 11. Contributing

1. Create a feature branch.
2. Make focused changes using the existing project conventions.
3. Test the affected components and API flows.
4. Run the production build.
5. Commit the changes with a descriptive message.
6. Submit a pull request for review.

## 12. License

Add the project's chosen license and ownership information before distributing the software publicly.
