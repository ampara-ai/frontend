---
name: Serene Justice
colors:
  surface: '#fbf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#42474c'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#73787d'
  outline-variant: '#c2c7cd'
  surface-tint: '#446279'
  primary: '#415f76'
  on-primary: '#ffffff'
  primary-container: '#5a7890'
  on-primary-container: '#fcfcff'
  inverse-primary: '#abcae5'
  secondary: '#4a654f'
  on-secondary: '#ffffff'
  secondary-container: '#c9e7cc'
  on-secondary-container: '#4e6953'
  tertiary: '#495f6b'
  on-tertiary: '#ffffff'
  tertiary-container: '#627884'
  on-tertiary-container: '#fbfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cae6ff'
  primary-fixed-dim: '#abcae5'
  on-primary-fixed: '#001e2f'
  on-primary-fixed-variant: '#2b4a60'
  secondary-fixed: '#cceacf'
  secondary-fixed-dim: '#b0ceb4'
  on-secondary-fixed: '#062010'
  on-secondary-fixed-variant: '#334d38'
  tertiary-fixed: '#cfe6f4'
  tertiary-fixed-dim: '#b3cad8'
  on-tertiary-fixed: '#061e29'
  on-tertiary-fixed-variant: '#344a55'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  headline-lg:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Public Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-lg:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  button:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  gutter: 16px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is anchored in the principles of safety, empathy, and institutional reliability. Designed for survivors of domestic violence in Peru, the UI prioritizes a "calm-first" philosophy. The visual language avoids any elements that could trigger anxiety or stress, opting instead for a **Corporate Modern** style infused with high-empathy minimalism.

The interface serves as a steady guide, using generous whitespace and a muted, earthy palette to lower the cognitive load. Every interaction is intentional, reinforcing a sense of agency and protection. The design movement is characterized by soft edges, low-contrast depth, and an unwavering commitment to legibility.

## Colors

The palette is designed to be soothing and non-threatening.
- **Primary & Secondary:** A combination of soft blues and sage greens creates an institutional but organic feel, reminiscent of nature and stability.
- **Backgrounds:** We use warm whites and very light grays to distinguish content areas without using harsh borders.
- **Alerts:** The coral/red is strictly reserved for the "Quick Exit" (Salir Rápido) functionality and life-safety warnings. It must never be used for standard errors or decorative elements to prevent unnecessary alarm.
- **Text:** Dark grays and blues provide high contrast against the light backgrounds for accessibility, avoiding absolute black to keep the look "soft."

## Typography

This design system uses **Public Sans** for its institutional clarity and exceptional legibility. Given the sensitive nature of the platform, typography is oversized to ensure users can read guidance clearly under stress or on small mobile devices. 

- **Hierarchy:** Use large headlines to clearly state the current step or legal status.
- **Readability:** Body text uses a generous 1.6 line-height to prevent "walls of text," making legal information digestible.
- **Alignment:** Standardize on left-alignment for all body text to assist with scanning and reading flow.

## Layout & Spacing

This design system follows a **Mobile-first, Fluid Grid** approach. 
- **Margins:** A minimum safe area of 24px is maintained on the left and right of all mobile screens to prevent accidental taps near screen edges.
- **Vertical Rhythm:** Information is stacked vertically in clear, logical blocks. Use "stack-lg" (48px) to separate distinct sections of legal guidance.
- **Touch Targets:** All interactive elements must be a minimum of 48px in height to accommodate various levels of motor control and ensure ease of use.

## Elevation & Depth

To maintain a sense of safety, this design system avoids harsh, dark shadows. 
- **Ambient Shadows:** Surfaces use very soft, diffused shadows (15-20% opacity) tinted with the primary blue color (`#5D7B93`) rather than pure black. This makes elements appear to float gently above the warm background.
- **Tonal Layers:** Secondary information is placed on the `background_cool` surface to create a subtle recessed effect.
- **Glassmorphism:** Use a subtle backdrop blur on the top navigation bar to maintain context of the scroll position while ensuring the text remains legible.

## Shapes

The shape language is defined by "Friendly Geometry." 
- **Radius:** A standard corner radius of 12px-16px is applied to all cards and buttons. This removes "sharpness" from the UI, contributing to the empathetic feel.
- **Iconography:** Use "Linear Light" icons with rounded terminals. Avoid jagged edges or aggressive pointed shapes.
- **Buttons:** Primary buttons should be significantly rounded to feel approachable and "clickable."

## Components

### Quick Exit Button
The most critical component. It must be persistently visible (pinned to the bottom or top-right). Styled in `accent_danger` (#E57373) with white text, it provides an immediate escape to a neutral site like Google or a weather app.

### Buttons
- **Primary:** Filled with `primary_color_hex`, white text, 16px radius, 56px height for mobile.
- **Secondary:** Outlined with `primary_color_hex`, 2px border, for less critical actions.

### Cards
White surfaces (`#FFFFFF`) with a 1px border of `background_cool` and a soft ambient shadow. Cards are used to encapsulate legal advice snippets or contact information for local authorities (DEMUNA/CEM).

### Input Fields
Large text areas with 16px padding and `background_cool` fills. The focus state uses a 2px sage green border to signal a "safe" interaction point.

### Progress Indicators
Simplified step-trackers at the top of the screen using the sage green palette. This helps the user understand how far they are into the legal guidance process without feeling overwhelmed.

### Universal Iconography
Standardized icons for "Phone" (Emergency), "Document" (Legal Paperwork), and "Shield" (Protection Orders). Icons must always be accompanied by a text label for absolute clarity.