---
name: BeerDang
description: Mobile-first beer pack unit-price calculator
colors:
  primary: "#075aa4"
  text: "#1d2935"
  background: "#ffffff"
  result-background: "#eef5fc"
  result-border: "#cbdff3"
typography:
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Malgun Gothic', sans-serif"
    fontSize: "28px"
    fontWeight: 700
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Malgun Gothic', sans-serif"
    fontSize: "14px"
rounded:
  control: "9px"
  result: "12px"
spacing:
  control-gap: "8px"
  mobile-inset: "20px"
---

# Design System: BeerDang

## Overview

**Creative North Star: "One-screen calculator"**

BeerDang is a utility used while shopping. The calculator and its answer appear immediately; branding, decorative imagery, slogans, and marketing sections do not compete with the task.

## Colors

White provides the working surface, dark text carries data and labels, and blue marks the selected option and the computed price. The result gets one lightly tinted surface so it can be found without a nested card layout.

## Typography

Use the system Korean-capable sans stack. Numeric input and output use tabular figures; the result is the largest text. Labels stay readable at 15px and explanatory copy at 12–14px.

## Layout

The work area is capped at 960px. At 720px and below, fields and result stack in task order with a 20px side inset. Four equal-width choice targets, including “기타”, are at least 56px high. A custom numeric field appears directly below its choice row. On desktop the fields and result sit side by side.

## Elevation & Depth

The interface is flat. Borders and one tinted result surface separate tasks; no decorative shadows.

## Shapes

Controls have softly rounded 9px corners; the result surface uses 12px. Avoid icon tiles and ornamental shapes.

## Components

Choices are native buttons with `aria-pressed`, a visible blue selection, hover feedback, and keyboard focus. The price input opens a numeric keyboard on mobile, formats thousands separators, and retains the caret during editing. The result updates in an accessible live region.

## Do's and Don'ts

- Do put the price input and 10ml answer on the first mobile screen.
- Do keep labels, values, and units unambiguous.
- Don't add a hero, badges, decorative graphics, or fake navigation to this working screen.
