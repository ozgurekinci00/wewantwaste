# Skip Hire Page Redesign

## Overview
This project is a redesign of the skip selection page of https://wewantwaste.co.uk/, focusing on improved UI/UX, responsive design, and maintainable React code. The application allows users to browse and select skip options based on their needs.

## Key Improvements

### Dual Layout Options
- Users can toggle between two different viewing layouts via the toggle button on the navigation bar:
  - Carousel Layout: A modern, new carousel layout, looks completely different from the original page as requested. This layout also contains a list view for easier comparison between skip options (Can be tested by clicking the "Compare All Options" button in the carousel layout).
  - Grid Layout: Improved version of the original page with modern, dynamic interface.

### Visual Design Enhancements
- Implemented a modern, clean interface with consistent styling throughout
- Created a visually appealing hero section with subtle animations and decorative elements
- Designed a cohesive color scheme based on skip categories (small, medium, large, xlarge)
- Added smooth transitions and animations for a more polished user experience
- Improved typography with better hierarchy and readability

### UX Improvements
- Added responsive design for all screen sizes (mobile, tablet, desktop)
- Implemented smooth animations when navigating between skip options
- Enhanced visual feedback for user interactions
- Improved information display with clear categorization of skip features
- Added "Most popular" indicator for the 8-yard skip option

### Technical Enhancements
- Developed using modern React with functional components and hooks
- Implemented responsive layouts using Tailwind CSS
- Integrated Framer Motion for smooth, performant animations
- Optimized for performance by minimizing unnecessary re-renders
- Used environment-aware styling with light/dark mode support

### Code Structure
- Organized components with clear separation of concerns
- Created reusable UI components for maintainability
- Implemented context for global state management

## Data Integration
The skip options are populated manually in a JSON with the data from the url: https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft with some additional information (skip measurements, descriptions, illustrations) from the url: https://www.renewableenergymarketing.net/skip-hire/

## Considerations
There were a few inconsistencies with the given data (e.g. 20 yard and 40 yard skips have the same price). But considering this is just a proof-of-concept, I left them unchanged. I also added some mock detailed information to demonstrate the possible improvements.

## Installation and Setup

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd wewantwaste

# Install dependencies
npm install

# Start the development server
npm start
```