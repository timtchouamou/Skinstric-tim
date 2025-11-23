This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


Summary of the Header Component:

The Header component displays the app title "SKINSTRIC" and 
shows the current section of the page (such as Analysis, Intro, 
Results, etc.), which is passed in as a prop.
import React → allows JSX.
import './header.css' → loads styles for this header.
({ section }) → receives a section value from the parent.
Renders:
The app name: SKINSTRIC
The section name wrapped in gray curly braces: { Analysis }, { Intro }, etc.
Uses CSS classes like uppercase and gray for styling.

In short:  It’s a reusable header bar that shows the app name and the current section of the page.

The Test component:
 collects the user's name and location in two steps, 
 sends the data to your backend,
  shows loading and success states, 
  and then lets the user continue to the next stage.

  The Results component:
   lets the user upload an image, 
   converts it to Base64,
    sends it to your AI backend, 
    saves the results in localStorage,
     and navigates the user to the analysis page
      while showing a clean loading animation.

Camera and capture page omponent: 
    opens the user’s camera,
     captures an image, 
     lets the user review it,
      sends it to your AI backend,
       stores the results, 
       and navigates to the analysis page with a clean loading animation.

SUMMARY OF IA-ANALYSIS PAGE:

✔ Displays a header
✔ Shows AI Analysis instructions
✔ Displays 4 diamond-shaped sections (only 1 links somewhere for now)
✔ Shows navigation buttons (“Back” and “Get Summary”)
✔ Uses next/link for fast navigation
✔ Uses custom CSS from analysis.css
✔ Structured cleanly into top/middle/bottom sections

SUMMARY OF SUMMARY PAGE
✔ Loads AI analysis data from localStorage
✔ Formats it into an easy-to-use structure
✔ Lets user switch between:
Race predictions
Age predictions
Sex predictions
✔ Shows:
A circular confidence graph
A sorted list of options
Clickable radio-like selection
✔ Allows user to correct AI predictions
