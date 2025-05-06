# 💘 Make Love Not War

A PostCSS CLI tool and browser-side enabler that scopes CSS frameworks (like Tailwind, Bootstrap, and Bulma) to activate only when a specific class (e.g., `.tw`, `.bs`, `.bu`) is present on the same element. This enables per-element opt-in without global interference or class renaming.

---

## Why?

When using multiple CSS frameworks on the same page, class name collisions (like `container`, `text-center`, etc.) are common. Tailwind offers a `prefix` option, but that requires rewriting every class, so it's too verbose. Other frameworks don't even offer such option.

**This tool solves that by:**

* Transforming selectors like `.text-red-500` into `.tw.text-red-500`, so Tailwind utilities only activate when `class="tw"` is present.
* Allowing Bootstrap and Bulma to be processed similarly (e.g., with `.bs`, `.bu`), enabling all three to coexist cleanly.
* Eliminating the need descendant wrappers (can still cause conflicts) or class name prefixing (too verbose).

---

## Features

* 🔀 Namespace any CSS framework with a single opt-in class (e.g., `tw`, `bs`, `bu`)
* 🧩 Keeps original class names intact
* 📦 CLI tool for build-time processing
* 🧪 Optional runtime support for Tailwind Play via `MutationObserver` monstrosity

---

## CLI Usage

Use via `npx` with no installation required:

```bash
npx @camilaprav/makelovenotwar <prefix> <input.css> [options]
```

### Arguments:

* `<prefix>` – the class to use as a namespace (e.g., `bs` for Bootstrap)
* `<input.css>` – path to the source CSS file

### Options:

* `-o, --output <file>` – specify output file (default: `stdout`)

### What it does:

* Rewrites selectors like `.box` → `.bu.box`.
* Activates Bulma classes only when `class="bu"` is present.

### Example:

```bash
npx @camilaprav/makelovenotwar bs bootstrap.css -o bootstrap-scoped.css
npx @camilaprav/makelovenotwar bu bulma.css -o bulma-scoped.css
```

Then in HTML:

```html
<link rel="stylesheet" href="bootstrap-scoped.css">
<link rel="stylesheet" href="bulma-scoped.css">
<div class="bs container mt-4">Bootstrap</div>
<div class="bu container is-primary">Bulma</div>
```

This enables **side-by-side usage** of multiple frameworks without class name collisions.

---

## Browser Usage (for Tailwind Play CDN)

To use this with a Tailwind Play environment where build-time processing isn’t available or is undesirable, inject the following scripts:

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
<script type="module" src="https://esm.sh/@camilaprav/makelovenotwar/tailwind-play.js"></script>
```

### What it does:

* Finds the inline `<style>` block with Tailwind utilities.
* Rewrites selectors like `.text-red-500` → `.tw.text-red-500`.
* Activates Tailwind utilities only when `class="tw"` is present.

To prevent a flash of unstyled Tailwind content, add the `hidden` attribute to the body element. `tailwind-play.js` removes it automatically once patching is ready.
