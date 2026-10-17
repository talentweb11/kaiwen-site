# kaiwen-site

Kaiwen's personal portfolio project for ICT3113 Lab Week 06, set up using OpenAI Codex.

The website will use plain HTML, CSS, and a little vanilla JavaScript, with no frameworks or build step. Site files will live in `public/`.

Planned sections: hero, about, skills, projects, repos, and contact. The site must be responsive with no horizontal scrolling at 375px.

Deployment: `.github/workflows/deploy.yml` publishes `public/` to GitHub Pages on pushes to `main`, or when run manually. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** before the first deployment.

## Preview locally

Run `python -m http.server 8000 --directory public` from this directory, then open http://localhost:8000. There is no installation or build step.

## Personalize before applying for jobs

- In `public/index.html`, replace both placeholder email links and LinkedIn URLs. Review the draft tagline, bio, and skills; replace the project placeholder with a real highlight.
- GitHub links and the repository feed currently use `talentweb11`. To change accounts, update the links in `public/index.html` and `GITHUB_USER` in `public/script.js`.
- The repository feed makes an unauthenticated client-side GitHub API request. Empty results, network errors, timeouts, and API rate limits show a plain message. No API token is needed or included.
- Typography uses Google Fonts with local sans-serif fallbacks.

`AGENTS.md` contains the project instructions for Codex. `CLAUDE.md` contains the same instructions for compatibility with the original lab.
