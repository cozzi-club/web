# Cozzi — Build Checklist

Work through phases in order, one at a time.

## Ground rules (apply to every phase)
- [x] Stack: Next.js (App Router, via CLI) + React + TypeScript + Tailwind v4 + GSAP + Three.js + Lenis + Lucide icons
- [ ] Break UI into small, reusable components — DRY, no repeated markup/styles
- [ ] Pixel-perfect to Figma
- [ ] Optimization / performance first (Server Components by default, lazy-load heavy client code like Three.js)
- [x] Tailwind theme lives in `src/app/globals.css` (`@theme`) — no `tailwind.config` file
- [x] Only two fonts: Banter Grotesk (display) + TT Neoris (all body text)
- [ ] Ask for the mobile Figma link before any responsive work
- [x] Only install more packages when actually needed

## Phase 1 — Project setup
- [x] Scaffold with `create-next-app` (TS, Tailwind, ESLint, App Router, `src/`, `@/*` alias)
- [x] Install `gsap`, `@gsap/react`, `three`, `@types/three`, `lenis`, `lucide-react`
- [x] Remove Next.js boilerplate (Geist fonts, demo page, public SVGs)

## Phase 2 — Skills (installed globally, not in this repo)
- [x] Next.js / React performance — `vercel-react-best-practices`
- [x] Tailwind v4 — `tailwind-design-system`
- [x] Responsive / UI quality — `web-design-guidelines`
- [x] Three.js — `threejs-fundamentals`, `threejs-animation`, `threejs-shaders`
- [x] GSAP — `gsap-core`, `gsap-scrolltrigger`

## Phase 3 — Theme
- [x] Brand colors as Tailwind tokens (`bg-ink`, `text-parchment`, `bg-rust`, …)
- [x] Font tokens: `font-display` (Banter Grotesk), `font-sans` (TT Neoris)
- [x] Type scale from Figma: `text-display-xl`, `text-display-lg`, `text-heading`, `text-body`, `text-label`, `text-caption`
- [x] Swatch hex codes confirmed from the Figma Branding board (node 54958:104)

## Phase 4 — Fonts
- [x] User adds font files to `src/app/fonts/`
- [x] Convert used weights to Latin-subset woff2 (Banter Bold; Neoris Hairline/Regular/DemiBold)
- [x] Wire them up with `next/font/local` in `src/app/fonts/index.ts` (`--font-banter`, `--font-neoris`)
- [x] Body defaults to TT Neoris Hairline (`font-hairline`), per Figma
- [x] Decided: only Banter + TT Neoris. Figma's TT Commons Pro DemiBold → TT Neoris DemiBold; Wallsmith / Suisse Mono → replaced
- [ ] Confirm web licenses for Banter Grotesk + TT Neoris before launch

## Phase 5 — Core components & providers
- [x] `Button` / `ButtonLink` — outline by default, fills on hover (Figma "btn state 0" / "btn hover"); `tone` parchment (dark bg) | rust (light bg) | ink; 48px tall, 210px min
- [x] Typography: `Heading` (xl/lg/md, Banter) and `Text` (body/lead/label/caption, Neoris)
- [x] `cn()` helper (no tailwind-merge — it would mis-merge custom `text-*` tokens)
- [x] Button hover/focus: clip-path fill wipes left → right; label colour flips exactly at the wipe edge
- [x] `SizedImage` for fixed-size Figma images (no next/image rounding warnings)
- [x] Heavy component logic lives in hooks: `useHeroScene`, `useDiscPlayer`
- [x] GSAP registered once in `src/lib/gsap.ts` (ScrollTrigger + useGSAP)
- [x] Lenis smooth-scroll driven by GSAP ticker, synced with ScrollTrigger, off for reduced-motion
- [x] `lucide-react` — no setup needed (named imports are tree-shaken)
- [x] `Container` (1280px Figma frame), `PositionedImage` (Figma coords + optional parallax), `Logo`, `Badge`, `ScrollCue`

## Phase 6 — Desktop page (Figma "MacBook Air - 7")
- [x] Branding board linked (node 54958:104)
- [x] CD player board linked (node 54956:103) — parts sheet; assembled players are nodes 54937:3043 / 54937:2247
- [x] Figma token (`FIGMA_TOKEN` in ~/.zshrc) — REST API used instead of the capped MCP
- [x] Export Figma assets (2x, exact node bounds) into `public/images/<section>/`; served as AVIF/WebP via next/image
- [x] Sections: AnnouncementBar, Hero, Philosophy, ProductFeature, Horizon (+ ProductCard), Origins, Contact, Music (+ DiscPlayer); Horizon and Music kept but not on the landing page since 2026-11-20
- [x] Hero headline unblurs word by word with the page intro (`IntroUnblurWords` / `useIntroUnblur`): as the preloader's doors open (`PRELOADER_OPEN` event), or straight away when there's no preloader (already played this tab, or arriving from another page). Hidden start set in CSS (`[data-intro-unblur]`) so nothing flashes before hydration; visible for reduced motion and without JS
- [x] Home update (Figma "MacBook Air - 7", comments 2026-11-08): hero radial gradient; philosophy "We've never been ones for too much. Less is more." with 9 new images (`*-3.png`) in the new layout; coffee section "Forme" heading (unblur), 110svh, new spacing; On the horizon (unblur heading) and door section on Figma spacing instead of full-screen blocks; contact: new taller collage (`collage-no-sun-2.png`, sun re-placed), heading aligned to the brown block, copy sticky from the top; music "Get jammin'", 100svh, rule across the top; buttons regular weight site-wide (`UnblurWords` / `useUnblurReveal` for the heading reveals)
- [x] Home update 2026-11-20: "On the horizon" and "Get jammin'" taken off the landing page (components kept, just not imported in `src/app/page.tsx`); philosophy is now "For the buna enthusiasts. Where daily lives are transformed into moments of presence" (Figma typo "LIIVES" fixed) with 9 re-exported images (`*-4.png`); door section gets Figma's 79px gap below the coffee gradient
- [ ] Philosophy video (Figma "image 11", bottom right): Figma can't export video, so the slot shows its still (`film-still-4.png`); drop the clip in `public/video/` and set `video` on that placement (PositionedImage plays it muted, looping, with the still as poster)
- [x] Hero 10px higher (headline + objects); mask model 10% smaller wherever it sits after a swap (`size` on HeroModel, poster scaled to match)
- [x] Coffee feature 2026-11-20: "Reserve" heading; copy "Single-origin coffee from Jimma, Ethiopia. / Medium roast, a softer & fuller expression of the bean." on two lines, top-aligned with the button, in TT Neoris Hairline Italic (`tt-neoris-hairline-italic.woff2`, as Figma renders it)
- [x] Pixel diff vs Figma render at 1280px: every section within ~1–3% (remaining: grain noise + TT Commons→Neoris)
- [x] GSAP: scroll parallax on hero objects; philosophy pins while its copy fills word by word and the photos fade/rise in (`usePhilosophyReveal`); disc player spin-up/down, power light
- [x] Tonearm split into a static holder (`tonearm-base.png`) and the arm (`tonearm-arm.png`) — only the arm swings, around its collar
- [x] Needle parks off the record; play → arm swings in, disc spins up + audio starts only on needle-down; pause → arm returns, disc spins down
- [x] Working deck: prev / play-pause / next buttons + volume slider (0–50) rebuilt in HTML from Figma specs; red button = play/pause
- [x] `usePlaylist` (audio, queue, volume) + `useDiscPlayer` (motion) hooks; 3 synthesized placeholder tracks in `public/audio/`
- [x] Player shadow: panels cut out of the export, soft CSS shadow instead of the clipped baked one
- [ ] Replace placeholder tracks with the real COZZI playlist
- [x] Footer (Figma 2026-11-08): sitemap (FAQ, Our World, Coffee, Collection, Reach out) / contact (cozziclub@gmail.com) rows, COZZI CLUB. wordmark (inline SVG from the Figma vector), socials + rights line only (no "Made with Bare hands"); md+ at least 80svh tall with the extra space shared evenly between rows, wordmark and bottom row
- [x] Every section is full-screen (`Section`: min-h-svh, content centered); banner + hero share one screen
- [x] Sticky split (md+): in Contact and Music the copy enters with the section, then `position: sticky; bottom` holds it while the collage / disc player scrolls up; both release when their bottoms align. Section spacing is Figma's (Contact 127.28 / 135.26, Music 85 / 119.34 to the panel) via `sticky-split` + `sticky-bottom`
- [x] Contact collage: sun cut out of the flattened collage (`collage-no-sun.png`, block colour restored) and rebuilt from the Figma vector (`sun.svg`); spins once per 40s, still for reduced motion
- [x] Contact block: cream on home, espresso (`surface="espresso"`) on other pages; desktop heading 57px / paragraph 28px (a touch under Figma, by request)
- [x] Contact split into two screens: `Origins` (handwriting + arch) → `Contact` (text + collage)
- [x] Origins ("The door into the club", unblur heading) → "Inside story, if you will": one image (the jebena; Figma now shows a landscape in the arch, kept the jebena as agreed earlier), arch drawn in CSS and framed on the vase, expands to full screen, then the copy rises in word by word, OUR STORY → /about. No letter strip (removed at the user's request), no arrow. Figma spacing, not a full-screen block
- [ ] Mobile + reduced-motion: lore copy + OUR STORY not shown yet (only the static arch) — needs a mobile design
- [x] Origins per Figma: letter strip (4096px crop of the original scan, 6% opacity, 2px blur, -0.34° tilt), Figma's arrow (`ScrollCue size`), arch 154px under the strip — one block, centred
- [x] Origins arch → full-screen reveal, the original version (Figma comment: "first version of the door animation"): starts as the arch's top enters the viewport, frame + photo clip-paths open from the arch shape while the photo scales from the arch crop to cover; pinned 220%; static on mobile / reduced motion
  - [x] Pinned centred on the screen (like the finalized full-screen version) instead of at the top, so the heading isn't jammed under the nav; arch 77px higher than Figma (275.42) so the block fits at 1920×1080 with ~50px clear above the heading; the reveal stage shifts up by the same offset
- [x] About is its own page `/about` (Figma `54873:446` intro + `54872:417` side-scroll; mobile `54875:476`): story → contact → footer; "Our World" links here
  - [x] 6235×736 design track scaled to viewport height; arrows jump to the next story
  - [x] Collage parallax: one linear drift per piece (50 / 80 / 110 design px by cluster order), at its design position mid-screen; the last cluster settles exactly as the track stops — steady speed, no jumps
  - [x] Drum sits 40px left of Figma so its (faster) drift never opens a gap to the cup still life; the wax seal has no drift (fixed to the track) while the map and farmer drift past it
- [x] No em dashes in site copy, titles or meta (`Page | Cozzi`)
  - [x] Opening still life starts at 150% and settles to 100% (clipped to its box) as it reaches the left edge (`zoom`)
  - [x] Drum re-exported from Figma (`drum-cutout.png`; the old file was the wrong crop of the sample sheet); letter + music score rebuilt from the full-res scans at full ink with CSS opacity (30% reads like Figma's 20%)
  - [x] 13 collage pieces baked from Figma originals (crops, vector/image masks, colour adjustments) → `public/images/about/`
  - [x] `useHorizontalScroll` + `HorizontalScroll`, `StoryBlock`, shared `CircleArrow` (also used in Music)
  - [ ] Mobile About (Figma `54875:476`) — stacked layout, Phase 7
- [ ] Real link targets: LEARN MORE, View all, product cards, REACH OUT, FAQ, socials (footer sitemap anchors already scroll to sections)
- [ ] Playlist audio for the red button (Spotify/Apple embed or audio files?)
- [x] Hero 3D: user's GLB models (Draco + WebP) in one three.js canvas, fitted to the Figma object bounds and posed to match
  - [x] 1024px-texture copies in `public/3d/hero/` (3.5MB → 1.6MB, 4× less GPU memory); originals untouched
  - [x] Figma PNGs show first, then crossfade to 3D (instant first paint; fallback if WebGL fails)
  - [x] three.js lazy-loaded (152KB gz chunk), textures pre-uploaded before reveal, renders only while visible
  - [x] GSAP: intro scale/rotate, idle float + sway, scroll-scrubbed drift/spin; static for reduced-motion
  - [x] Draco decoder copied from `three` by `postinstall` into `public/draco/` (gitignored)
  - [x] Drag to move + rotate each object; on release it spins with momentum, springs home (elastic), then resumes floating
  - [x] Each scene mount owns its canvas (fixes texture corruption from React Strict Mode double-mount)

## Phase 7 — Responsive
- [x] Mobile Figma link received (landing page, node 54710:240)
- [x] Responsive scaling: `--zoom` (set pre-paint) + `design-zoom` on `Container` — 390px mobile frame below md, 1280px desktop frame above (scaled down to 768)
- [x] Mobile layouts for every section via `max-md:` overrides; `PositionedImage`/`SizedImage` take a `mobile` box (or `null` to hide)
- [x] Hero: mobile object layout for posters + 3D scene (re-mounts per breakpoint), logo top-left + Menu button
- [x] Mobile menu overlay (sitemap), shared nav content in `src/content/navigation.ts`
- [x] About mobile: vertical stack (Figma `54875:476`), stories zoomed per Figma; horizontal scroll only md+
- [x] Product cards 2-col (zoomed), contact re-ordered (heading → collage → text → button), disc player zoomed + HIT IT button
- [x] Sections full-screen from md up; natural design heights on mobile (hero stays one screen)
- [x] Banner (all pages): one static line "Online store launching soon. Join the waitlist." on ink, regular weight; the whole bar opens the waitlist sheet
- [x] Announcement bar: 35.2px bar (Figma 44px less a fifth, per the review comment) / 13px text, 33px / 11px on mobile, all × the design zoom like the rest of the page (~53px / 19.5px at 1920)
- [x] Desktop scales up to 1920px: the 1280px frame grows with the viewport (zoom 1.5 at 1920 — same as 150% browser zoom), centred beyond; `src/lib/design.ts` holds the frame constants, zoom script and `designSizes()` for image `sizes`
- [ ] Tablet portrait (768–1023): currently the desktop design scaled — decide if it should use the mobile layout instead
- [ ] Mobile content differences in Figma to confirm: 4th product card, footer "Events" vs "Upcoming", info@cozzi.world / +91(123 4567)

- [x] Philosophy re-synced with Figma (updated 2026-10-18): 8 photos re-exported (`*-2.png`) with new positions/sizes/crops; pinned centre-on-centre so the copy stays mid-screen

## Phase 8 — More pages
- [x] `/catalog` (Figma `54652:139`): site header (mix-blend-difference nav, mobile logo + Menu), "Catalogue" title, 3×2 `ProductGrid` (shared with home). Product cards don't navigate: a click opens the frosted "be the first to be notified" sheet, sliding up from the bottom and back down on close (only the sheet blurs; clear backdrop closes it) (`WaitlistDialog`, native `<dialog>`, rendered once in the layout; `openWaitlist()`), also from the home "On the horizon" cards
- [x] `/faq` (Figma `54909:530`): full-bleed portrait (baked with the Figma crop) + single-open accordion (grid-rows height transition, a11y)
- [x] Shared content: `src/content/products.ts`, `src/content/faq.ts`, header nav in `navigation.ts`; "View all" → /catalog, footer FAQ → /faq
- [x] `SiteHeader` (logo + Our World / Coffee / Partner up / Shop "Coming Soon!", Shop opens the waitlist) on every page: home hero, /about, /contact, /faq, /catalog, /coffee; logo 23.8px and links 26.5px below the banner (closer to the top, Figma 2026-11-08), logo 94.9px wide
- [x] About intro tightened: black panel 620px (Figma 830), still life shown whole at its natural 1275px; the rest of the track shifts left by the difference (`fig()` in about.tsx). Story band + mobile stack on cream (was parchment)
- [x] Footer / mobile menu sitemap: "Upcoming" removed
- [x] Nav is white with `mix-blend-difference` (logo, links, Menu button)
- [x] Origins reveal layer bleeds 2px past the screen (section clips only horizontally) so fractional smooth-scroll offsets can't show a line
- [x] Header fixed on every page (`useFixedHeader`): starts under the banner, slides to the top as you scroll; `mix-blend-difference` on mobile too so it reads over any section. On /about it slides away while the side-scroll runs and returns when it's done (`<html data-header="hidden">` from `useHorizontalScroll`)
- [x] About Figma comments (2026-11-08): new side-scroll images (table + cup where the grinder was, jebena pour where the table still life was, red topo map, new farmer; mobile map + farmer too); updated "The radiant throughline" copy; story labels, bodies and intro in TT Neoris Regular; handwriting white on the mobile black band; contact collage with white stamps and handwriting on espresso (`collage-no-sun-dark.png`); hairline between the still life and the black band fixed; hidden header comes back while the mouse is at the top of the screen (`useHeaderPeek`, `header-hidden:` variant)
- [x] Enquire page Figma comments (2026-11-08): title and content moved up (title 125px, intro 273.7px, form 90px below it), intro text in parchment, field labels in 7px boxes so the stack matches Figma's height; after sending, the form clears and a check + "Thanks for dropping us a line. We'll get back to you." fades in 28px under Submit
- [x] Coffee page Figma comments (2026-11-08): ‘Naqamte’ Classic → Forme (hero, catalogue card, meta); "On our online store." card opens the waitlist (`WaitlistButton`); product description band 90% of the screen, block centred; contact copy lines up with the mesob block via the shared Contact section (same as the landing page)
- [x] TT Neoris Medium (500) added (`tt-neoris-medium.woff2`); used for the About bodies, labels and intro, and the landing section bodies (`lead` text: contact, music, "Inside story")
- [x] TT Neoris woff2s rebuilt from the source .ttf without TrueType hinting (gasp: smoothing only), same Latin set, ~1/3 smaller: Windows applies hinting (macOS ignores it), which could distort small text like the nav
- [x] Preloader, home page only, once per tab session (handled like the eaha project, styled after mdebeauty.com without the side ornaments): one GSAP timeline in `usePreloader`: on ink, a thin gold arch line (bone → sand → caramel) draws itself up the left, over the top and down the right while "Opening 0–100%" counts up; then, at 100%, the text and arch blur out one after another, a seam opens down the middle of the dark screen and its two halves slide apart like doors (flat, ~1.1s) while the hero settles from a 1.06 zoom (`[data-preloader-zoom]`); on complete the `sessionStorage` flag is set and the component unmounts. Flag already set: unmounts at once (plus a head-script `data-preloaded` rule so reloads never flash it). No wordmark. No JS: `<noscript>` hides it. Reduced motion: skipped
- [x] Page transitions (`next-view-transitions`, View Transitions API): curved wipe — the new page rises from the bottom behind a bowed edge that flattens as it covers the screen, the old page drifts up and dims (`usePageTransition`, `TransitionLink` on all internal links); same-page anchors, external / mailto / tel, modified clicks and reduced motion navigate normally
- [x] `/coffee` (Figma `54731:94` "COFFEE/product"): gradient hero + header, ‘Naqamte’ / Classic (second line muted), "Product description" heading (no copy in the design), spec table (dividers within 0.1px of Figma), availability cards (shop note underlined), dark contact block. Replaces the old `/products/[slug]` pages; home "Learn more" and the footer "Coffee" link go here
- [x] `/contact` (Figma `54910:865`): "Enquire" page with validated form (shared `Field` component, also used by the waitlist)
- [x] "Reach out" / "Partner up" link to /contact; catalogue cards open the waitlist sheet
- [ ] Contact form: connect an email/CRM service (currently client-side only)
- [ ] Replace the 5 placeholder products (copy, specs, images) in `src/content/products.ts`
- [ ] Waitlist form: connect an email service (currently client-side only)
- [ ] FAQ: real answers for 6 of 7 questions (placeholders in `src/content/faq.ts`)
- [ ] Catalogue: real products (design repeats the 3 upcoming items)
- [x] Mobile /faq (Figma `54910:907`): own still-life crop via `<picture>` art direction (`getImageProps`, one download), stacked questions
- [x] Mobile /coffee (Figma `54796:637`): short hero with centred name (muted 2nd line), no description, specs + cards = desktop block zoomed to 358px, cream contact block (`Contact surface="coffee"`, button tone `ink-parchment`)
- [x] Mobile /catalog: 2-column grid (as requested — no separate Figma frame)

## Phase 9 — Optimization pass
- [ ] Image optimization (`next/image`, sizes, formats)
- [ ] Bundle check, lazy-load Three.js, reduced-motion support
- [ ] Lighthouse / Core Web Vitals check
