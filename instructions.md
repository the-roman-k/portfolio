# Professional Web Interface from Figma Design - Enhanced Portfolio Development Instructions

You are a senior frontend architect. Transform my Figma mockups into pixel-perfect, production-ready HTML + CSS code for my **design portfolio website**. Use modern vanilla web technologies with zero frameworks.

## Portfolio Project Context

I am creating my **design portfolio** from multiple mockups in my Figma file. My Figma file contains:

- **"templates" frame**: Contains main section templates/components that should be built first
- **"styleguide" section**: Contains all typography styles and main colors used in the file
- **Multiple portfolio pages/screens**: Each reusing the templates from the "templates" frame
- **Consistent design system**: Colors, typography, spacing, and components used across all screens

### Development Approach
1. **Analyze Figma Variables & Styles**: First, examine all variables for colors, spacing, typography, and text styles in the Figma file. Extract these as core CSS custom properties to use consistently across all designs. Any additional colors not in the variables should be added separately as custom CSS for specific items.
2. **Top-Down Page Analysis**: When analyzing a large page with multiple sections, use a systematic top-down approach:
   - Count and identify all sections within the selected page
   - Implement sections one by one, from top to bottom
   - Read section names to distinguish between separate pages vs sections within a page
   - Pages contain the word "page" in their name
   - Sections within pages contain the word "section" followed by the template name (e.g., "section-hero-template", "section-portfolio-grid")
   - Use template names to identify reusable components across different pages
3. **Templates First**: Analyze my "templates" frame and create reusable CSS components for each template section
4. **Component Library**: Build a library of reusable CSS classes that can be used across all portfolio pages
5. **Page Assembly**: Use the template components to build each complete portfolio page
6. **Consistency**: Ensure perfect visual consistency when templates are reused across different pages

## Page Analysis Methodology

### **Top-Down Section Implementation**
When I provide a large page selection:

1. **Page Overview**: 
   - Identify the total number of sections in the page
   - List each section name and its corresponding template
   - Plan the implementation order (top to bottom)

2. **Section Naming Convention Recognition**:
   - **Pages**: Names contain "page" (e.g., "page templates", "page mainpage")
   - **Sections**: Names contain "section" + template name (e.g., "section project-hero", "section project-hero-vertical", "section title+2 columns text")
   - **Template Mapping**: Use the template name after "section" to map to reusable components

3. **Implementation Sequence**:
   ```
   Page: Homepage
   ├── section project-hero (uses project-hero template)
   ├── section project-hero-vertical (uses project-hero-vertical template)
   ├── section title+2 columns text (uses title+2 columns text template)
   └── section title+description+2 columns text (uses title+description+2 columns text template)
   ```
4. **In Figma make Layer-by-Layer Analysis using Figma MCP:** 
- Select the section container (not the content)
- Look at Design panel → Fill
*Copy gradient parameters:*
   - Type: Linear/Radial
   - Angle: (e.g., 64deg)
   - Colors: (e.g., #272939, #2E555E)
   - Stops: (e.g., 11.85%, 81.43%)

5. **In Figma make Cross-Reference Multiple Selection using Figma MCP:**
- Select entire page → Get broad structure
- Select individual sections → Get specific styling
- Select content elements → Get text/image details
- Combine all information manually


## Critical Design Requirements:

**IMPORTANT**: Create recreation of the original design. Do not add any design elements that are not present in the original. Do not modify or "improve" the visual design in any way.

- Maintain exact spacing, colors, typography, and layout as specified in Figma
- Maintain exactly the same text content as specified in Figma
- Use images from **img** folder
- Use precise measurements from Figma variables and styles
- Preserve original color schemes, gradients, and visual hierarchy exactly
- Keep all visual elements in their exact positions and sizes
- Do not add any design elements that are not present in the original
- Do not modify or "improve" the visual design in any way

## Navigation Requirements:
- In **templates** frame I have 2 levels of the navigation **nav-level-01** and **nav-level-02** components. level-02 navigation only present for *Selected Projects* item. for all other pages only first level of navigation should be used. 
- navigation bar should be reused as component
- navigation bar should be responsive and hamburger menu should be implemented
- hamburger menu should be visible only when standard menu doesn't fit viewport
- interactive states like hover, pressed, active are also present in **templates** 

## Design Token System & Theming

### **Figma Variables & Styles Analysis**
Before implementing any design, systematically extract:

1. **Color Variables**: All color variables defined in Figma (primary, secondary, semantic colors)
2. **Typography Styles**: All text styles with their exact properties (font-family, size, weight, line-height, letter-spacing)
3. **Spacing Variables**: All spacing tokens used throughout the design system
4. **Effect Variables**: Shadows, blurs, and other effects defined in Figma variables

### **Complete Tokenization Strategy**
**EVERYTHING** that can be changed for future theming must be tokenized as CSS custom properties. This includes but is not limited to:

#### **Color Tokenization**
```css
:root {
  /* Figma Color Variables (Exact extraction) */
  --primary-50: #[exact-hex];
  --primary-100: #[exact-hex];
  --primary-500: #[exact-hex]; /* Main primary */
  --primary-700: #[exact-hex];
  --primary-900: #[exact-hex];
  
  /* Secondary & Accent Colors from Figma Variables */
  --secondary: #[exact-hex];
  --accent: #[exact-hex];
  --success: #[exact-hex];
  --warning: #[exact-hex];
  --error: #[exact-hex];
  
  /* Neutral/Gray Scale from Figma Variables */
  --white: #ffffff;
  --gray-50: #[exact-hex];
  --gray-100: #[exact-hex];
  --gray-200: #[exact-hex];
  --gray-300: #[exact-hex];
  --gray-500: #[exact-hex];
  --gray-700: #[exact-hex];
  --gray-900: #[exact-hex];
  --black: #000000;
  
  /* Additional Custom Colors (not in Figma variables) */
  --custom-highlight: #[specific-hex];
  --custom-overlay: rgba(0, 0, 0, 0.5);
  
  /* Semantic Color Tokens */
  --color-text-primary: var(--gray-900);
  --color-text-secondary: var(--gray-700);
  --color-text-muted: var(--gray-500);
  --color-text-inverse: var(--white);
  --color-background-primary: var(--white);
  --color-background-secondary: var(--gray-50);
  --color-background-accent: var(--primary-50);
  --color-border: var(--gray-200);
  --color-border-focus: var(--primary-500);
  
  /* Interactive State Colors */
  --color-hover: var(--primary-700);
  --color-active: var(--primary-900);
  --color-focus: var(--primary-500);
  --color-disabled: var(--gray-300);
}
```

#### **Typography Tokenization from Figma Text Styles**
```css
:root {
  /* Font Families from Figma */
  --font-primary: '[Exact-Figma-Font]', sans-serif;
  --font-secondary: '[Exact-Figma-Font]', serif;
  --font-mono: '[Exact-Figma-Font]', monospace;
  
  /* Font Sizes from Figma Text Styles */
  --text-xs: [exact-px]px;
  --text-sm: [exact-px]px;
  --text-base: [exact-px]px;
  --text-lg: [exact-px]px;
  --text-xl: [exact-px]px;
  --text-2xl: [exact-px]px;
  --text-3xl: [exact-px]px;
  --text-4xl: [exact-px]px;
  --text-5xl: [exact-px]px;
  
  /* Font Weights from Figma */
  --weight-light: 300;
  --weight-normal: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  --weight-black: 900;
  
  /* Line Heights from Figma Text Styles */
  --leading-tight: 1.1;
  --leading-normal: 1.4;
  --leading-relaxed: 1.6;
  --leading-loose: 1.8;
  
  /* Letter Spacing from Figma Text Styles */
  --tracking-tight: -0.025em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

#### **Spacing Tokenization from Figma Variables**
```css
:root {
  /* Figma Spacing Variables (Exact extraction) */
  --space-0: 0px;
  --space-2: [exact-px]px;
  --space-4: [exact-px]px;
  --space-8: [exact-px]px;
  --space-12: [exact-px]px;
  --space-16: [exact-px]px;
  --space-20: [exact-px]px;
  --space-24: [exact-px]px;
  --space-32: [exact-px]px;
  --space-40: [exact-px]px;
  --space-48: [exact-px]px;
  --space-56: [exact-px]px;
  --space-64: [exact-px]px;
  --space-80: [exact-px]px;
  --space-96: [exact-px]px;
  --space-112: [exact-px]px;
  --space-128: [exact-px]px;
  
  /* Semantic Spacing Tokens */
  --spacing-section: var(--space-96);
  --spacing-component: var(--space-48);
  --spacing-element: var(--space-24);
  --spacing-inline: var(--space-16);
  --spacing-tight: var(--space-8);
}
```

#### **Layout & Dimension Tokenization**
```css
:root {
  /* Container Sizes */
  --container-xs: 480px;
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
  --container-max: var(--container-xl);
  
  /* Border Radius from Figma Variables */
  --radius-none: 0px;
  --radius-sm: [exact-px]px;
  --radius-base: [exact-px]px;
  --radius-md: [exact-px]px;
  --radius-lg: [exact-px]px;
  --radius-xl: [exact-px]px;
  --radius-2xl: [exact-px]px;
  --radius-full: 9999px;
  
  /* Shadows from Figma Effect Variables */
  --shadow-sm: [exact-shadow-values];
  --shadow-base: [exact-shadow-values];
  --shadow-md: [exact-shadow-values];
  --shadow-lg: [exact-shadow-values];
  --shadow-xl: [exact-shadow-values];
  
  /* Z-Index Scale */
  --z-index-below: -1;
  --z-index-normal: 1;
  --z-index-tooltip: 10;
  --z-index-dropdown: 20;
  --z-index-modal: 30;
  --z-index-toast: 40;
  
  /* Transitions */
  --transition-fast: 0.15s ease-in-out;
  --transition-normal: 0.2s ease-in-out;
  --transition-slow: 0.3s ease-in-out;
}
```

#### **Component-Specific Tokens**
```css
:root {
  /* Button Tokens */
  --button-padding-x: var(--space-16);
  --button-padding-y: var(--space-8);
  --button-border-radius: var(--radius-base);
  --button-font-weight: var(--weight-medium);
  --button-transition: var(--transition-normal);
  
  /* Navigation Tokens */
  --nav-height: [exact-px]px;
  --nav-padding: var(--space-16);
  --nav-link-padding: var(--space-12);
  --nav-background: var(--color-background-primary);
  --nav-border: var(--color-border);
  
  /* Card Tokens */
  --card-padding: var(--space-24);
  --card-border-radius: var(--radius-lg);
  --card-shadow: var(--shadow-base);
  --card-background: var(--color-background-primary);
  
  /* Grid Tokens */
  --grid-gap: var(--space-24);
  --grid-columns-mobile: 1;
  --grid-columns-tablet: 2;
  --grid-columns-desktop: 3;
}
```

## CSS Class Optimization & Reusability

### **Maximum Class Reusability Strategy**
- **Minimize CSS Classes**: Create the minimum number of classes necessary for repeatable items or items with identical parameters
- **Reusable Components**: Elements with the same styling should share the same CSS class
- **Smart Grouping**: Group elements by visual properties (same color, same typography, same spacing) rather than by location
- **Figma Layer Analysis**: Use Figma layer names as validation for reusability - similar layer names often indicate reusable components

### **Tokenized Class Naming & Reusability Pattern**
```css
/* Reusable typography classes using Figma text styles */
.heading-xl {
  font-family: var(--font-primary);
  font-size: var(--text-4xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  color: var(--color-text-primary);
  margin-bottom: var(--space-16);
}

.heading-lg {
  font-family: var(--font-primary);
  font-size: var(--text-2xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-normal);
  color: var(--color-text-primary);
  margin-bottom: var(--space-12);
}

.body {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--weight-normal);
  line-height: var(--leading-relaxed);
  color: var(--color-text-primary);
}

/* Reusable layout classes using Figma spacing */
.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--space-16);
}

.section-spacing {
  padding: var(--spacing-section) 0;
}

.grid {
  display: grid;
  gap: var(--grid-gap);
  grid-template-columns: repeat(var(--grid-columns-mobile), 1fr);
}

/* Reusable component classes using tokens */
.btn-primary {
  background: var(--primary-500);
  color: var(--color-text-inverse);
  padding: var(--button-padding-y) var(--button-padding-x);
  border: none;
  border-radius: var(--button-border-radius);
  font-weight: var(--button-font-weight);
  text-decoration: none;
  display: inline-block;
  transition: all var(--button-transition);
  cursor: pointer;
}

.btn-primary:hover {
  background: var(--color-hover);
  transform: translateY(-1px);
}

.btn-primary:active {
  background: var(--color-active);
  transform: translateY(0);
}

.card {
  background: var(--card-background);
  border-radius: var(--card-border-radius);
  padding: var(--card-padding);
  box-shadow: var(--card-shadow);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

### **Figma Layer Name Analysis**
When analyzing Figma layers, look for reusability indicators:
- **Similar naming patterns**: "Button/Primary", "Button/Secondary" → `.btn-primary`, `.btn-secondary`
- **Numbered instances**: "Card 1", "Card 2", "Card 3" → `.card` (reusable class)
- **Component instances**: Auto-layout components → Highly reusable classes
- **Repeated elements**: Same layer names across artboards → Perfect for class reuse
- **Section naming**: "section-hero-main" indicates use of "hero-main" template

## Implementation Excellence Standards

### HTML Structure & Semantics
- **Semantic HTML5**: Use proper semantic tags (header, nav, main, section, article, aside, footer)
- **Portfolio SEO**: Optimize for portfolio discoverability with proper meta tags
- **Accessibility First**: Complete ARIA attributes, proper heading hierarchy (h1-h6), meaningful alt texts for portfolio images
- **Clean Structure**: Logical document outline, proper nesting, no unnecessary wrapper elements
- **External Assets**: Link external CSS with `<link rel="stylesheet" href="styles.css">`
- **Portfolio Meta**: Include Open Graph tags, Twitter cards for social sharing

### Advanced CSS Architecture for Portfolio

#### **Component-Based CSS Organization**
```css
/* 1. CSS Reset & Base Styles */
/* 2. Design Tokens from Figma Variables & Styles */
/* 3. Base Typography Classes (using Figma text styles) */
/* 4. Base Layout Classes (using Figma spacing) */
/* 5. Template Component Classes (using tokens) */
/* 6. Page-Specific Classes (using tokens) */
/* 7. Utility Classes (using tokens) */
/* 8. Media Queries */
/* 9. Theme Variations (future) */
```

### Layout & Responsive Design

#### **Mobile-First Approach with Tokenized Classes**
```css
/* Base responsive classes using Figma tokens */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--space-16);
}

.grid {
  display: grid;
  gap: var(--grid-gap);
  grid-template-columns: repeat(var(--grid-columns-mobile), 1fr);
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--space-24);
  }
  
  .grid--2-col { 
    grid-template-columns: repeat(var(--grid-columns-tablet), 1fr); 
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 var(--space-32);
  }
  
  .grid--3-col { 
    grid-template-columns: repeat(var(--grid-columns-desktop), 1fr); 
  }
}
```

### Interactive Elements & Functional Behavior
Add common interactive behaviors ONLY when UI elements clearly indicate their purpose:
- **Search functionality**: For search bars, input fields with search icons
- **Multi-selection**: For checkboxes, selection lists, or multi-select components
- **Sorting**: For table headers, list headers with sort indicators
- **Filtering**: For filter buttons, dropdown menus, or filter controls
- **Language switching**: For language selectors or locale switchers
- **Tabs**: For tab navigation components
- **Dropdowns**: For dropdown menus and select elements
- **Modals**: For elements that appear to trigger overlays
- **Accordion**: For collapsible content sections
- **Pagination**: For page navigation controls

### Code Quality Standards
- **Complete Tokenization**: All colors, typography, spacing, and themeable properties use CSS custom properties extracted from Figma
- **Reusable CSS Classes**: Maximize class reuse, minimize unique classes
- **Performance**: Optimize CSS (selector grouping, minimization)
- **Accessibility**: WCAG 2.1 AA compliance (contrast, focus, semantics)
- **Progressive Enhancement**: Basic functionality works without JavaScript
- **Clean Architecture**: Logical organization and clear naming conventions
- **Theme-Ready**: All tokens organized for easy theme switching in future

## Required Output Structure

### **styles.css Structure with Complete Tokenization**
```css
/* ===== CSS RESET & BASE STYLES ===== */
*, *::before, *::after { 
  box-sizing: border-box; 
  margin: 0; 
  padding: 0;
}

html { 
  scroll-behavior: smooth; 
  font-size: 16px;
}

body { 
  line-height: var(--leading-normal);
  -webkit-font-smoothing: antialiased;
  font-family: var(--font-primary);
  color: var(--color-text-primary);
  background-color: var(--color-background-primary);
}

/* ===== DESIGN TOKENS (Extracted from Figma Variables & Styles) ===== */
:root { 
  /* Figma color variables */
  /* Figma typography styles */
  /* Figma spacing variables */
  /* Figma effect variables */
  /* Additional custom tokens */
  /* Semantic tokens */
  /* Component tokens */
}

/* ===== BASE TYPOGRAPHY CLASSES (From Figma Text Styles) ===== */
.text-heading-xl { /* Uses Figma text style tokens */ }
.text-heading-lg { /* Uses Figma text style tokens */ }
.text-body { /* Uses Figma text style tokens */ }

/* ===== BASE LAYOUT CLASSES (Using Figma Spacing) ===== */
.container { /* Uses Figma spacing tokens */ }
.section-spacing { /* Uses Figma spacing tokens */ }
.grid { /* Uses Figma spacing tokens */ }

/* ===== TEMPLATE COMPONENT CLASSES (Using Tokens) ===== */
.nav { /* Navigation template component */ }
.hero-main { /* Hero main template component */ }
.portfolio-grid { /* Portfolio grid template component */ }
.btn-primary { /* Button component using tokens */ }
.card { /* Card component using tokens */ }

/* ===== UTILITY CLASSES (Using Tokens) ===== */
.visually-hidden { /* Accessibility helper */ }
.text-center { text-align: center; }
.margin-bottom { margin-bottom: var(--space-16); }

/* ===== RESPONSIVE MEDIA QUERIES ===== */
/* All responsive rules use Figma tokens */

/* ===== FUTURE THEME PLACEHOLDER ===== */
/* [data-theme="dark"] {
  --color-text-primary: var(--white);
  --color-background-primary: var(--gray-900);
} */
```

## Quality Assurance Checklist

### **Figma Variables & Styles Extraction** ✓
- [ ] All Figma color variables extracted as CSS custom properties
- [ ] All Figma text styles extracted as typography tokens
- [ ] All Figma spacing variables extracted as spacing tokens
- [ ] All Figma effect variables extracted as effect tokens
- [ ] Custom colors (not in variables) identified and tokenized separately

### **Top-Down Implementation** ✓
- [ ] Page sections identified and counted
- [ ] Section naming convention properly recognized (page vs section)
- [ ] Template mapping from section names completed
- [ ] Implementation order planned (top to bottom)
- [ ] Each section implemented using appropriate template

### **Complete Tokenization** ✓
- [ ] All themeable properties use CSS custom properties
- [ ] Figma variables properly mapped to CSS tokens
- [ ] Additional custom tokens clearly separated
- [ ] Ready for future theme implementation

### **Class Reusability** ✓
- [ ] Minimal number of CSS classes created
- [ ] Similar elements share the same classes
- [ ] Figma layer names analyzed for reusability patterns
- [ ] Template components properly reused across sections
- [ ] No duplicate styling across different classes

### **Visual Fidelity** ✓
- [ ] Colors match Figma exactly (using extracted variables)
- [ ] Typography matches exactly (using extracted text styles)
- [ ] Spacing matches exactly (using extracted spacing variables)
- [ ] Layout positioning is pixel-perfect
- [ ] All measurements use exact Figma values

### **Technical Standards** ✓
- [ ] Semantic HTML5 structure
- [ ] Clean CSS architecture with maximum reusability
- [ ] Complete design token system from Figma
- [ ] Mobile-first responsive design
- [ ] WCAG 2.1 AA accessibility compliance
- [ ] Performance optimized
- [ ] Cross-browser compatibility

---

**Please provide your Figma file URL or share the current Figma selection.** I will:

1. **Extract** all Figma variables and text styles as the foundation design token system
2. **Analyze** your selection using top-down approach, identifying all sections and their templates
3. **Map** section names to template components for maximum reusability
4. **Implement** each section systematically from top to bottom
5. **Create** minimal, highly reusable CSS classes using complete tokenization
6. **Ensure** pixel-perfect accuracy and theme-ready architecture

The result will be a professional portfolio website with exact visual accuracy, complete design token system extracted from Figma, optimized CSS architecture focused on class reusability, and production-ready code quality.