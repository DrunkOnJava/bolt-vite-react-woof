# HealthPortal

A modern healthcare management system built with React, TypeScript, and Tailwind CSS.

## Features

- Patient and Provider Dashboards
- Medication Management
- Appointment Scheduling
- Secure Messaging System
- Receipt Management
- Real-time Notifications

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code

## Project Structure

```
src/
├── assets/         # Static assets
├── components/     # React components
│   ├── auth/      # Authentication components
│   ├── common/    # Shared components
│   ├── layout/    # Layout components
│   └── ui/        # UI components
├── context/       # React context providers
├── hooks/         # Custom React hooks
├── lib/           # Third-party library configurations
├── pages/         # Page components
├── services/      # API and service functions
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT
