# PWA Icons

Place your PWA icons here:
- `icon-192.png` - 192x192 pixels
- `icon-512.png` - 512x512 pixels

These icons should be square, with your app logo/branding.

For development, you can generate simple placeholder icons using ImageMagick or similar tools.

Example using ImageMagick:
```bash
convert -size 192x192 xc:#000000 -fill white -gravity center -pointsize 72 -annotate +0+0 "CEB" icon-192.png
convert -size 512x512 xc:#000000 -fill white -gravity center -pointsize 200 -annotate +0+0 "CEB" icon-512.png
```

Or use an online icon generator like:
- https://www.pwabuilder.com/imageGenerator
- https://realfavicongenerator.net/
