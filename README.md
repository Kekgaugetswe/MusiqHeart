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

Video cards open YouTube directly in a new tab. The red logo and favicon are retained. The Appreciation row supports touch/trackpad scrolling, keyboard scrolling when focused, and previous/next buttons. Reduced-motion preferences are respected.

The episode IDs, playlist IDs and Appreciation titles were checked against the public @musiqheartza channel on 22 November 2026. The site is deliberately curated rather than automatically publishing upcoming episodes.
