# Jade Wok Documentation

## Product overview

Jade Wok is a fictional premium Chinese restaurant HTML template. The implementation is deliberately static: it uses HTML5, one shared CSS file and one readable vanilla JavaScript file. There is no framework, build step, database, backend, password flow, analytics credential or map API key.

The visual system combines deep jade (`#164B3B`), jade green (`#1F6A52`), warm ivory (`#F7F2E8`), soft gold (`#C8A96B`) and charcoal (`#1D211F`) with Playfair Display for editorial headings and Manrope / DM Sans for interface text.

> All business details, menu items, prices, dates, testimonials, awards, biographies and restaurant history are fictional demo content. Replace them before publishing.

## What is included

| Area | Included |
| --- | --- |
| Pages | 15 standalone HTML pages |
| Design | Responsive editorial restaurant system |
| Interactions | Navigation, filters, lightbox, accordions, carousel, forms, cookie notice and back-to-top |
| SEO | Unique title and description, canonical placeholder, Open Graph, Twitter card and Restaurant JSON-LD |
| Branding | `logo.svg`, `favicon.svg`, CSS variables and reusable logo markup |
| Documentation | Installation, customization, content, images, forms, JavaScript, accessibility, credits, sources and changelog |

## Newly expanded professional sections

The template now includes several richer sections beyond a basic restaurant landing page. The homepage has a **culinary journey** sequence, a dark **experience chooser**, a chef quotation feature, a room-and-ritual mosaic, rotating testimonials and a journal preview. The About page adds a three-part values system, ingredient philosophy and a five-chapter timeline. Private Dining includes three room cards, three menu packages and an event enquiry form. The Chef Details page includes a career timeline, signature dish list and fictional recognitions. Locations provides two structured location cards with hours and map replacement panels. The Journal contains eight complete fictional stories in six filterable categories.

These sections are all documented here and can be removed, reordered or duplicated without changing the JavaScript architecture.

## Page guide

| File | Purpose |
| --- | --- |
| `index.html` | Conversion-led homepage with hero, signatures, experience cards, chef feature, culinary journey, gallery preview, testimonials, journal preview and newsletter. |
| `about.html` | Story, philosophy, ingredient sourcing, values, timeline and reservation CTA. |
| `menu.html` | Filterable menu with 20 fictional dishes across dim sum, small plates, soups, seafood, wok classics, roasted specialties, noodles, vegetarian, desserts and drinks. |
| `menu-details.html` | Signature Peking Duck editorial detail page with ingredients, preparation, dietary information, serving guidance and pairing recommendations. |
| `reservations.html` | Accessible reservation request form with simulated success state and backend integration notes. |
| `private-dining.html` | Private dining rooms, event packages, capacity details and enquiry form. |
| `gallery.html` | Filterable masonry-style gallery with keyboard-accessible lightbox. |
| `chefs.html` | Team listing for Lin Wei, Mei Chen and Daniel Zhao. |
| `chef-details.html` | Lin Wei profile, philosophy, career timeline, signature dishes and fictional recognitions. |
| `locations.html` | Downtown and Riverside location cards with hours, directions placeholders and reservation links. |
| `contact.html` | Contact details, validated contact form and FAQ preview. |
| `faq.html` | Twelve expandable FAQs covering reservations, dietary requirements, parties, children, parking, gift cards and cancellations. |
| `blog.html` | Eight filterable fictional journal posts. |
| `blog-details.html` | Long-form sample article with breadcrumbs, author box, pull quote, inline image, tags and related posts. |
| `404.html` | Custom recovery page with home and menu escape routes. |

## Installation

Open `index.html` directly for a local preview. For the most reliable browser behavior, run a static server from the project root:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080/`. On shared hosting, upload the contents of the folder to `public_html` using cPanel File Manager or FTP. Do not upload `build_site.py` if you are preparing a commercial distribution ZIP; it is a local generation utility, not required by the final template.

## Customization

### Brand and logo

Replace the inline SVG logo markup in the header and footer if you need a different mark, or use the provided `logo.svg` as a starting point. `favicon.svg` is already referenced by every page. For a raster logo, update the `<img>` source and always keep descriptive alternative text.

### Colors, spacing and typography

Edit the `:root` block at the beginning of `assets/css/style.css`. The principal tokens are `--jade`, `--deep-jade`, `--ivory`, `--sand`, `--gold`, `--charcoal`, `--muted`, `--serif`, `--sans`, `--container` and `--shadow`. Replace the Google Fonts link in each HTML head and update the `--serif` / `--sans` variables together.

### Content and contact details

Search the HTML files for `88 Lantern Street`, `+1 (212) 555-0188`, `hello@jadewok.example` and `Fictional demo content`. Replace the address, telephone, email, hours, social URLs and the JSON-LD values before production.

### Menu

Menu items in `menu.html` are individual `.menu-row` elements. Update the item name, description, price, image URL and `data-category` value. Add the same category value to a filter button to make a new filter work. Dish cards on `index.html` and related pages use the `.dish-card` pattern.

### The culinary journey and new sections

The homepage `.journey-grid` holds three steps: Arrive, Explore and Stay awhile. Each `.journey-card` is self-contained and can be duplicated for an additional moment or replaced with a service promise. The `.experience-grid` holds Lunch, Evening and Private Dining cards. The About page `.values-grid` and `.timeline` support additional principles or milestones. The Private Dining `.room-grid` and `.package-list` are designed to accept additional rooms and packages while preserving the responsive layout.

### Blog

Each journal card in `blog.html` is a `.journal-card`. To add a post, duplicate a card, update the title, category, date, image, excerpt and `data-category` value. For a complete article, duplicate `blog-details.html`, update the metadata, article body, pull quote, author box and related posts. Keep every article title unique and add a matching title and description to the document head.

### Images

The demo uses remote Unsplash URLs in the HTML to keep the repository lightweight. Replace every URL with properly licensed images before selling or publishing. Recommended dimensions are 1800px wide for hero images, 1200–1400px for feature images, 1000px for dishes and 800–1200px for journal thumbnails. Use WebP or optimized JPEG, provide meaningful `alt` text, and keep `loading="lazy"` on below-the-fold images.

### Forms

All forms are front-end demonstrations. `assets/js/main.js` listens for `[data-validate-form]`, uses native browser validation, displays a status message and resets after a short simulated delay. To connect a real service, replace `event.preventDefault()` with a `fetch()` call to your endpoint or use a hosted form service such as Formspree, EmailJS or your own PHP / Node / serverless API. Add server-side validation, spam protection, consent language and privacy handling before collecting personal data.

### JavaScript interactions

The shared script controls the sticky header, mobile navigation, localStorage cookie notice, back-to-top button, native form validation, category filters, gallery lightbox and the three-item testimonial carousel. It is intentionally unminified and organized into feature blocks so it can be extended without a build process.

### Accessibility

The template uses semantic `header`, `nav`, `main`, `section`, `article`, `footer`, labels for fields, visible focus rings, descriptive image alt text, keyboard-friendly buttons, `aria-expanded`, `aria-controls`, `role="status"` and `prefers-reduced-motion`. Continue this practice when adding content. Never use a clickable `div` when a native button or link is appropriate.

## Browser support

The template is designed for current Chrome, Edge, Firefox and Safari on desktop and mobile. Older browsers may not support `backdrop-filter`, `aspect-ratio`, `:has` or some newer CSS behavior; the layout still degrades gracefully.

## Credits and sources

- [Google Fonts](https://fonts.google.com/) — Playfair Display, Manrope and DM Sans.
- [Unsplash](https://unsplash.com/) — remote demo photography URLs; verify rights and replace before commercial release.
- The SVG jade wok / lotus symbol is original template artwork included in `logo.svg` and `favicon.svg`.

## Changelog

### 1.0.0 — Initial release

Complete static restaurant template with 15 pages, premium responsive design, reusable sections, demo interactions, SEO foundations, original SVG branding and full documentation.
