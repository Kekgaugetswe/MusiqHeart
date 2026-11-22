# MusiqHeart

Static HTML, CSS and JavaScript website. No build or npm installation needed.

## Run locally

From this folder:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. Use an HTTP server rather than opening index.html directly: navigation and collections load with fetch.

## Update the music

- `data/djsets.json`: released Pull Up Kulture episodes, newest first. Only episodes 01–03 are currently included.
- `data/appreciation.json`: Appreciation mixes, newest first.
- `assets/images/`: local YouTube thumbnail artwork.
- `index.html`: featured episode and verified playlist links. Update the featured card when a new episode is released.
- `styles/sets.css`: responsive DJ Sets page styles; shared styles for the other pages remain in `styles/style.css`.

Video thumbnails open an embedded preview inside the same card. Only one preview is active at a time; Close preview stops it. A manual Watch on YouTube link remains available for blocked videos. No automatic popup or redirect occurs. The featured play icon and Watch episode button also play inside the featured image area. The red logo and favicon are retained. The Appreciation row supports touch/trackpad scrolling, keyboard scrolling when focused, and previous/next buttons. Reduced-motion preferences are respected.

The episode IDs, playlist IDs and Appreciation titles were checked against the public @musiqheartza channel on 22 November 2026. The site is deliberately curated rather than automatically publishing upcoming episodes.

## Deployment cache

HTML asset references, collection JSON requests and shared component requests use a release query parameter. Bump this version together when deploying changed assets to prevent cached scripts being paired with newer HTML.

### Native player controls

The featured section and mix cards now display YouTube's own embedded preview and controls. There are no custom play overlays or autoplay. Rounded corners are restored without thin outlines. Direct YouTube links remain available for blocked videos.
