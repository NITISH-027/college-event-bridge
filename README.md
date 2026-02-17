# College Event Bridge

A production-ready mobile-first Progressive Web App (PWA) built with Next.js 14, TypeScript, Tailwind CSS, ShadCN UI, and Supabase for connecting college students with campus events.

## Features

- **Authentication**: Email/password and Google OAuth sign-in with Supabase Auth
- **Event Management**: Create, edit, delete events with image uploads
- **Real-time Comments**: Post and view comments with live updates using Supabase Realtime
- **User Profiles**: Customizable profiles with event and comment counts
- **Mobile-First Design**: Optimized for mobile devices with max-width 430px
- **PWA Support**: Installable as a native app with offline capabilities
- **Row Level Security**: Secure data access with Supabase RLS policies

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Backend**: Supabase (Database, Auth, Storage, Realtime)
- **Deployment**: Vercel (or any Node.js hosting)

## Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/NITISH-027/college-event-bridge.git
cd college-event-bridge
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to get your credentials
3. Run the SQL migration in the Supabase SQL Editor:
   - Copy the contents of `supabase/migrations/001_initial_schema.sql`
   - Execute it in the SQL Editor

4. Create the storage bucket:
   - Go to Storage in your Supabase dashboard
   - The bucket `event-images` should be created automatically by the migration
   - If not, create it manually and make it public

5. Enable Google OAuth (optional):
   - Go to Authentication > Providers
   - Enable Google provider
   - Add your Google OAuth credentials

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Replace with your actual Supabase credentials from Project Settings > API.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
college-event-bridge/
├── app/                      # Next.js App Router pages
│   ├── actions/             # Server actions for auth, events, comments, profile
│   ├── auth/                # Auth callback route
│   ├── dashboard/           # Dashboard page with event listing
│   ├── events/              # Event pages (detail, create, edit)
│   ├── login/               # Login/signup page
│   └── profile/             # User profile page
├── components/              # React components
│   ├── ui/                  # ShadCN UI components
│   └── ...                  # Custom components (Navbar, EventCard, etc.)
├── lib/                     # Utility functions and Supabase clients
│   ├── supabase/           # Supabase client configurations
│   └── utils.ts            # Utility functions
├── public/                  # Static assets
│   ├── icons/              # PWA icons
│   ├── manifest.json       # PWA manifest
│   └── sw.js               # Service worker
└── supabase/               # Database migrations
    └── migrations/
```

## Key Features Implementation

### Authentication
- Server actions in `app/actions/auth.ts`
- Middleware protection for routes in `middleware.ts`
- Login page with email/password and Google OAuth

### Events
- CRUD operations with server actions in `app/actions/events.ts`
- Image upload to Supabase Storage (bucket: `event-images`)
- Owner-only edit/delete with RLS enforcement
- Mobile-optimized event cards

### Comments
- Real-time comments using Supabase Realtime subscriptions
- Server actions in `app/actions/comments.ts`
- Owner-only delete functionality

### Profile
- User profile with avatar initials
- Event and comment counts
- Profile editing functionality

### PWA
- Manifest configuration in `public/manifest.json`
- Service worker for offline caching
- Install prompt component

## Mobile-First Design

- Maximum width: 430px (centered on larger screens)
- Touch-friendly UI elements
- Bottom navigation bar
- Floating Action Button (FAB) for quick event creation
- Apple-style minimal design

## Security

- Row Level Security (RLS) policies on all tables
- Server-side authentication checks in all mutations
- Ownership verification for updates and deletes
- Secure image upload to authenticated storage bucket

## Database Schema

### Tables

- **profiles**: User profile information
- **events**: Event details with creator reference
- **comments**: Event comments with user and event references

### Storage

- **event-images**: Public bucket for event images

See `supabase/migrations/001_initial_schema.sql` for the complete schema.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel project settings
4. Deploy!

### Other Platforms

The app uses Next.js standalone output mode and can be deployed to:
- Railway
- Render
- DigitalOcean App Platform
- Any Node.js hosting

Make sure to:
1. Set all environment variables
2. Update `NEXT_PUBLIC_SITE_URL` to your production URL
3. Configure OAuth redirect URLs in Supabase

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
