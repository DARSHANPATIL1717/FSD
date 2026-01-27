# Personal Website Template

This is a responsive personal website template built with HTML, CSS, and JavaScript. It includes a Home page, Contact Us page with a Google Map embed, and email notification functionality.

## Features

- Responsive design that works on desktop, tablet, and mobile devices
- Home page with hero section and about section
- Contact Us page with contact form and embedded Google Map
- Email notification on form submission using EmailJS
- Clean, modern design with easy-to-customize CSS

## Setup

1. Clone or download this repository
2. Open the `personal-website` folder
3. Open `index.html` in your web browser to view the website

## Customization

### Google Maps
To customize the Google Map location:
1. Go to [Google Maps](https://www.google.com/maps)
2. Find your desired location
3. Click "Share" > "Embed a map"
4. Copy the iframe src URL and replace it in `contact.html`

### Email Notifications
To set up email notifications:
1. Sign up for a free account at [EmailJS](https://www.emailjs.com/)
2. Create a new email service (e.g., Gmail)
3. Create a new email template
4. Replace the placeholders in `script.js`:
   - `YOUR_USER_ID` with your EmailJS user ID
   - `YOUR_SERVICE_ID` with your service ID
   - `YOUR_TEMPLATE_ID` with your template ID

### Styling
- Edit `style.css` to customize colors, fonts, and layout
- The website uses a mobile-first responsive design approach

## File Structure

```
personal-website/
├── index.html          # Home page
├── contact.html        # Contact Us page
├── style.css           # Stylesheet
├── script.js           # JavaScript for form handling
└── README.md           # This file
```

## Browser Support

This template works in all modern browsers that support HTML5, CSS3, and ES6 JavaScript.

## License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).
