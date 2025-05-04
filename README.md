GitHub Pages uses Jekyll by default. Jekyll has a rule that ignores folders that start with an underscore, 

like:
_next/

So when you deployed your out/ folder, GitHub Pages saw the _next/ directory and Jekyll silently excluded it, causing all your JS, CSS, fonts, etc. to 404.