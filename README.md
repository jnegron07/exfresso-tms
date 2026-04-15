# Exfresso TMS Prototype

A high-fidelity prototype for a next-generation Transport Management System (TMS) focused on freight forwarding.

## Principles
- **Progressive Revelation**: Complexity is hidden until needed.
- **AI-Augmented**: Routing and data entry powered by simulated intelligence.
- **Consumer-Grade UI**: Premium aesthetics using Navy (#1B2A4A) and Teal (#0D9488).

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4, shadcn/ui, Framer Motion
- **State**: Zustand, React Query
- **Data**: Mock API Routes with JSON fixtures

## Features
- **Operations Dashboard**: KPI metrics, Shipment Map, and Activity feed.
- **AI Routing**: Multi-modal route search with a simulated 7-second "black box" processing state.
- **Shipment Management**: Detailed tracking timeline and financial ledger.
- **Rate Intelligence**: AI-powered normalization of carrier rate cards.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard).

## Deployment
The prototype is designed to be fully self-contained with mock data handlers in `app/api/*`. It can be deployed directly to **Vercel** for stakeholder previews.
