# Galleria Slideshow - WordPress Theme

![Galleria Theme](https://img.shields.io/badge/WordPress-Theme-blue) ![Version](https://img.shields.io/badge/version-1.0-green) ![License](https://img.shields.io/badge/license-MIT-orange)

A modern, fully-featured WordPress theme built for the [Frontend Mentor Galleria Slideshow Challenge](https://www.frontendmentor.io/challenges/galleria-slideshow-site-tEA4pwsa6). This theme transforms a static art gallery slideshow into a dynamic WordPress-powered website with custom post types, advanced custom fields, and stunning GSAP animations.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Animations](#animations)
- [Screenshots](#screenshots)
- [Credits](#credits)

## 🎨 Overview

This project is a WordPress implementation of the Frontend Mentor Galleria Slideshow challenge. It features a beautiful art gallery with a masonry grid layout, an immersive slideshow experience, and a lightbox view for full-screen image viewing.

### Key Highlights

- **Custom Post Type**: `artwork` post type for managing gallery items
- **Advanced Custom Fields (ACF)**: Structured data management for artworks
- **GSAP Animations**: Professional-grade animations throughout the interface
- **Responsive Design**: Mobile-first approach with tablet and desktop layouts
- **Masonry Layout**: Dynamic grid system using GSAP Flip plugin
- **Slideshow Mode**: Navigate through artworks with smooth transitions
- **Lightbox Gallery**: Full-screen image viewing experience

## ✨ Features

### Core Functionality

- ✅ **Dynamic Masonry Grid**: Responsive artwork gallery with automatic layout
- ✅ **Slideshow Navigation**: Browse artworks with previous/next controls
- ✅ **Animated Transitions**: Smooth GSAP-powered animations between slides
- ✅ **Lightbox View**: Full-screen image gallery with click-to-zoom
- ✅ **Progress Bar**: Visual indicator of slideshow progress
- ✅ **Responsive Images**: Adaptive image loading based on screen size
- ✅ **Hover Effects**: Interactive states for all clickable elements
- ✅ **Keyboard Navigation**: ESC key support for closing modals
- ✅ **Custom Logo Support**: WordPress Customizer integration
- ✅ **ACF JSON**: Version-controlled custom fields

### User Experience

- Navigate the slideshow and view each painting details
- Click on any artwork to enter slideshow mode
- View images in full-screen lightbox
- Responsive layout optimized for mobile, tablet, and desktop
- Smooth scroll-to-top on slide transitions
- Dynamic content loading without page refresh

## 🛠 Technologies Used

### Core Technologies

- **WordPress** (6.x+) - CMS Platform
- **PHP** (8.0+) - Server-side scripting
- **SCSS/Sass** - CSS preprocessing
- **JavaScript (ES6+)** - Client-side scripting

### WordPress Plugins

- **Advanced Custom Fields (ACF)** - Custom field management
- **Custom Post Type UI** - Custom post type creation

### JavaScript Libraries

- **GSAP 3.13** - Animation library
  - GSAP Core
  - Flip Plugin
  - SplitText Plugin
  - ScrollSmoother Plugin

### Development Tools

- **Sass** - CSS compilation
- **npm** - Package management
- **Local by Flywheel** - Local development environment (recommended)

## 📁 Project Structure

```
galleria-theme/
├── acf-json/                      # ACF field configurations (version controlled)
│   └── group_68efb7c6918f4.json  # Artwork fields
├── assets/
│   ├── icons/                     # SVG icons
│   │   ├── icon-back-button.svg
│   │   ├── icon-next-button.svg
│   │   └── icon-view-image.svg
│   ├── images/                    # Theme images
│   │   └── galleria.svg          # Logo
│   ├── js/                        # JavaScript modules
│   │   ├── artwork-detail.js     # Slideshow & lightbox logic
│   │   ├── header-animation.js   # Header animations
│   │   └── masonry-layout.js     # Grid layout with GSAP Flip
│   └── scss/                      # Sass source files
│       ├── _artwork-detail.scss  # Slideshow styles
│       ├── _design-system.scss   # Design tokens & mixins
│       ├── _front-page.scss      # Homepage styles
│       ├── _header.scss          # Header styles
│       └── main.scss             # Main entry point
├── dist/
│   └── css/                       # Compiled CSS
│       ├── main.css
│       └── main.css.map
├── template-parts/
│   └── artwork-detail.php        # Slideshow modal template
├── dev.php                        # Development template (testing)
├── footer.php                     # Footer template
├── front-page.php                 # Homepage template
├── functions.php                  # Theme functions
├── header.php                     # Header template
├── index.php                      # Index template
├── style.css                      # Theme metadata
├── package.json                   # npm dependencies
└── README.md                      # This file
```

## 📋 Prerequisites

Before installing this theme, ensure you have:

- WordPress 6.0 or higher
- PHP 8.0 or higher
- Node.js and npm (for development)
- **Advanced Custom Fields (ACF) PRO** (required for ACF fields)
- **Custom Post Type UI** (required for artwork post type)

## 🚀 Installation

### 1. Install WordPress

Set up a fresh WordPress installation using your preferred method:

- Local by Flywheel (recommended)
- XAMPP/MAMP
- Docker
- Live server

### 2. Install Required Plugins

Install and activate the following plugins:

```
1. Advanced Custom Fields PRO
2. Custom Post Type UI
```

### 3. Install Theme

1. Download or clone this repository
2. Copy the `galleria-theme` folder to `wp-content/themes/`
3. Activate the theme in WordPress Admin → Appearance → Themes

### 4. Install Dependencies

Navigate to the theme directory and install npm packages:

```bash
cd wp-content/themes/galleria-theme
npm install
```

### 5. Compile Styles

Build the CSS from SCSS:

```bash
npm run build
```

For development with auto-compilation:

```bash
npm run watch
```

## ⚙️ Configuration

### 1. Create Custom Post Type

Go to **CPT UI → Add/Edit Post Types** and create a new post type:

- **Post Type Slug**: `artwork`
- **Plural Label**: `Artworks`
- **Singular Label**: `Artwork`
- **Menu Icon**: `dashicons-art`
- **Supports**: Title
- **Show in REST**: Yes (checked)
- **Hierarchical**: No

Save the post type.

### 2. Import ACF Fields

The ACF fields are stored in `acf-json/` and should auto-import when ACF is activated.

If they don't appear automatically:

1. Go to **Custom Fields → Field Groups**
2. The "Artwork Fields" group should be visible
3. If not, check that ACF JSON is properly configured

#### Artwork Fields Structure

The following fields are configured for the `artwork` post type:

| Field Name         | Field Type | Required | Description                |
| ------------------ | ---------- | -------- | -------------------------- |
| `artist`           | Text       | Yes      | Artist name                |
| `artist_image`     | Image      | Yes      | Artist portrait            |
| `year`             | Number     | Yes      | Year of creation           |
| `description`      | WYSIWYG    | Yes      | Artwork description        |
| `source`           | URL        | No       | External source link       |
| `thumbnail`        | Image      | Yes      | Grid thumbnail image       |
| `hero_image_large` | Image      | Yes      | Slideshow image (desktop)  |
| `hero_image_small` | Image      | No       | Slideshow image (mobile)   |
| `gallery_image`    | Image      | Yes      | Lightbox full-screen image |

### 3. Add Artworks

1. Go to **Artworks → Add New**
2. Enter the artwork title
3. Fill in all ACF fields (especially required images)
4. Publish the artwork
5. Repeat for all artworks in your gallery

**Recommended**: Add at least 15 artworks for the best gallery experience.

### 4. Set Homepage

1. Go to **Settings → Reading**
2. Select "A static page" for homepage display
3. Set your homepage to display the artworks

## 💻 Development

### Sass Compilation

The theme uses Sass for styling. Two npm scripts are available:

**Build (one-time compilation)**

```bash
npm run build
```

**Watch (auto-compile on save)**

```bash
npm run watch
```

### File Watching

During development, run the watch command to automatically compile SCSS changes:

```bash
npm run watch
```

### Customizing Styles

All styles are in `assets/scss/`:

- `_design-system.scss` - Colors, typography, spacing tokens
- `_header.scss` - Header and navigation
- `_front-page.scss` - Gallery grid
- `_artwork-detail.scss` - Slideshow and lightbox

Edit these files and they'll automatically compile to `dist/css/main.css`.

### JavaScript Modules

The theme uses modular JavaScript:

- `header-animation.js` - Fade-in animations on page load
- `masonry-layout.js` - Dynamic grid layout with GSAP Flip
- `artwork-detail.js` - Slideshow navigation and lightbox

All scripts are loaded via `functions.php` with proper dependencies.

## 🎬 Animations

This theme features extensive GSAP animations:

### Masonry Grid Animations

- **Fade In**: Artworks fade in on page load
- **Hover Scale**: Cards scale on hover
- **Flip Transition**: Smooth grid repositioning

### Slideshow Animations

- **Opening**: Grid scales down, slideshow fades in
- **Closing**: Slideshow fades out, grid scales up
- **Slide Transitions**:
  - Images slide down/up
  - Text words animate with SplitText
  - Artist images slide vertically
  - "View Image" button slides
  - Progress bar animates width
  - Slide control text animates

### Lightbox Animations

- **Open**: Modal fades in, image scales with bounce
- **Close**: Modal fades out smoothly

### Animation Timings

All animations use `expo.out` easing for a professional feel:

- Page load fade: `0.5s`
- Slideshow transitions: `1s`
- Lightbox: `0.4s`

## 📸 Screenshots

### Homepage - Masonry Grid

The responsive masonry layout displays all artworks in a beautiful grid.

### Slideshow View

Click any artwork to enter slideshow mode with detailed information.

### Lightbox Gallery

Click "VIEW IMAGE" or the artwork image to view in full-screen lightbox.

### Mobile Responsive

Fully optimized for mobile devices with touch-friendly controls.

## 🎯 Frontend Mentor Challenge

This project is a solution to the [Galleria slideshow site challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/galleria-slideshow-site-tEA4pwsa6).

### Challenge Requirements Met

✅ View the optimal layout depending on device screen size  
✅ See hover states for all interactive elements  
✅ Navigate the slideshow and view each painting  
✅ View each painting in a lightbox

### Additional Features

- WordPress CMS integration
- Custom post type for artworks
- Advanced custom fields for data management
- GSAP-powered animations
- SplitText word animations
- Smooth slide transitions
- Progress bar
- Keyboard navigation

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

**MKA Dev**

- Frontend Mentor - [@Kherraz-Med-Achraf](https://www.frontendmentor.io/profile/Kherraz-Med-Achraf)
- Portfolio - [https://kma-dev.fr](https://kma-dev.fr)

## 🙏 Credits

- **Design**: [Frontend Mentor](https://www.frontendmentor.io)
- **Challenge**: [Galleria Slideshow Site](https://www.frontendmentor.io/challenges/galleria-slideshow-site-tEA4pwsa6)
- **WordPress**: [WordPress.org](https://wordpress.org)
- **GSAP**: [GreenSock Animation Platform](https://greensock.com/gsap/)
- **ACF**: [Advanced Custom Fields](https://www.advancedcustomfields.com/)

**Built with ❤️ using WordPress, GSAP, and modern web technologies**
