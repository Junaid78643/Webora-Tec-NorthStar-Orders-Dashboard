# Northstar Admin Dashboard

A responsive admin dashboard for reviewing and managing a small business's sample store orders. It runs entirely in the browser and does not require a backend or build step.

## Features

- Summary cards for total, pending, processing, and completed orders.
- Search orders by order number, customer, or email.
- Filter by order status and sort by date, amount, or customer name.
- Open an order detail view with customer, payment, address, and line-item information.
- Update order status and see summary counts update immediately.
- Export the sample orders as a CSV file.
- Loading, no-results, and error states; refresh and retry controls.
- Premium responsive layout with a compact mobile navigation, clear status badges, and keyboard-accessible controls.
- Subtle entrance and hover animations, with reduced-motion preferences respected.

## Technologies

- HTML5
- CSS3 (responsive layout and native dialog)
- Vanilla JavaScript (sample data and client-side interactions)

## Run locally

1. Download or clone this project.
2. Open `index.html` in a modern browser.

For a local web server, run `npx serve .` from the project directory (Node.js required), then open the URL printed by the command.

## Deploy

This is a static site; no build command or server-side runtime is needed.

### GitHub Pages

1. Push the project files to a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch containing the files and the root (`/`) folder, then save.
5. Wait for the deployment to finish and open the Pages URL shown in settings.

### Netlify or Vercel

1. Import the repository in Netlify or Vercel, or upload the project directory.
2. Set the publish/output directory to the project root.
3. Leave the build command empty; there is no compilation step.
4. Deploy and open the generated site URL.

## Data notes

The order records in `app.js` are realistic demo data held in memory. Status changes last only for the current page session and reset on refresh. For persistent or shared data, replace the local array and `loadOrders()` with an API and connect status updates to the backend.
