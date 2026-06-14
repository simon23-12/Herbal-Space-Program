# Herbal Space Program

> A humorous, browser-based 3D spaceflight game in the style of Kerbal Space Program.
> Open `index.html` (needs the bundled `three.min.js` in the same folder). Navball controls:
> W/S = pitch, A/D = yaw, Q/E = roll, ↑/↓ = throttle, mouse = camera.
>
> **Features:** maneuver nodes [K] with a Δv editor and trajectory preview ·
> SAS [T] (prograde/retrograde/node) · two moons — **Basil** and **Minty** (inclined orbit) ·
> materials-lab experiments [B] · physical stage debris · reentry glow ·
> flight restart ↩ · the HSP Space Center at the launch site · **9 interactive tutorials**
> (`tutorials.js`): each drops you into a ready-made scenario — e.g. straight into an
> 80 km orbit for maneuver nodes, or low Basil orbit for the moon landing — with live
> steps that tick off automatically.
>
> **Music:** `space.mp3` (menu) · `hangar.mp3` (assembly hall) · `inspace.mp3`
> (once space is reached).
>
> Auto-save in the browser (JSON export remains for backups) · a flight report after
> every flight · mandatory heat shield on orbital reentry · crewed pods with crew ·
> a visible red-and-white parachute · braking-distance readout on moon landings ·
> remaining stage Δv in the HUD · pause [Esc] · the nuclear engine »Einstein«
> (tech "Future Tech") · an ⚡ electrical system (batteries, deployable solar panels [G] —
> they tear off in airflow! — probes without power are uncontrollable, experiments cost 15 ⚡) ·
> auto-cutoff at the maneuver node (burns exactly the planned Δv) · escape-velocity warning ·
> crew portraits with live facial expressions (neutral/happy/panic).

A 3D spaceflight simulation in the style of Kerbal Space Program, for the browser.
**No installation, accounts or server required** — a single `index.html`, runs in any
modern browser (double-click is enough).

## Features
- **Assembly Hall (VAB):** build rockets from parts — pod, tanks, engines, solid boosters,
  decouplers, parachute, fins, landing legs. Live display of Δv and thrust-to-weight ratio
  per stage (the Tsiolkovsky equation!).
- **Real orbital physics:** Newtonian gravity, apoapsis/periapsis, an atmosphere with drag,
  the planet *Herbin* and moon *Basil*, each with its own sphere of influence.
- **Career mode:** 18 missions/milestones earn science points, which unlock 12 tech-tree
  nodes. A sandbox mode for free building (with infinite fuel via [U] for test flights).
- **Satellites:** launch a probe core, solar panels and an antenna under a payload fairing
  ([F] = jettison fairing, [N] = deploy satellite). Deployed satellites keep flying
  with correct physics.
- **Map view** with trajectory prediction, **time warp** up to 1000×.
- **Universe view:** an animated Herbin–Basil–Minty system with gravity and Δv comparisons.
- **Welcome hints** in every mode (dismissible via "Don't show again").
- **Save/Load** as a JSON download — no accounts, no cloud.

## Controls
| Key | Function |
|---|---|
| Space | Ignite stage / separate |
| ← / → (A/D) | Turn the rocket |
| ↑ / ↓ (W/S) | Throttle, Z = full, X = off |
| P | Parachute |
| M | Map view |
| , / . | Time warp (only outside the atmosphere) |
| Mouse wheel | Zoom |

## How to reach orbit
1. Launch straight up, from ~1 km slowly tilt east (right) — the "gravity turn".
2. With apoapsis > 75 km, cut thrust and coast to apoapsis (time warp).
3. There, burn horizontally (90°) until periapsis rises above 70 km. Orbit! 🛰️

## Hosting
Locally: just double-click the file. Online: upload `index.html` (together with
`three.min.js`, the images and the `.mp3` files) to any static web host —
for example Vercel, Netlify or GitHub Pages.
