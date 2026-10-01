# IHLink Academy

Standalone learning and skills-development platform for IHLink technology and engineering programmes.

## Platform role

- **Platform key:** `academy`
- **Frontend:** standalone repository
- **Backend:** shared IHLink Supabase project
- **Administration:** IHLink Command Center
- **Deployment:** Vercel

## Core capabilities

- Course catalogue and enrolment
- Application and enrolment review
- Learning sessions and schedules
- Attendance records
- Learning resources and assignments
- Completion certificates and verification
- Customer/student workspace and support

## Architecture

Academy maintains dedicated course, enrolment, session, resource, attendance and certificate records while sharing the IHLink account/backend architecture.

The platform uses shared IHLink authentication and backend services while retaining its own customer-facing routes, platform authorization and specialist workflow.

## Technology

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Supabase
- Vercel

## Local development

```bash
npm install
npm run dev
```

Build for production with `npm run build`. Where configured, run `npm run typecheck` and `npm run lint` before release.

## Environment and secrets

Configure public client values such as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` through environment configuration. Cross-platform origin variables may be configured where IHLink handoff is required.

Never commit service-role credentials, payment/provider secrets, private API keys or webhook secrets.

## Data and security

Customer records are protected through Supabase Row Level Security and server-side workflows. Privileged operational changes and payment settlement must remain server-authorized. Specialist data must not become writable merely because an account is generally active.

## IHLink ecosystem integration

The application is a standalone IHLink platform connected to the shared backend and central Command Center. Authentication may be shared, but platform/service authorization remains explicit.

## Deployment

Production is deployed through the IHLink Vercel team. Verify production routing, environment configuration and core authenticated flows after each release.

## Ownership

**IHLink Co. Ltd.**  
Copyright © 2026 IHLink Co. Ltd. All rights reserved.
