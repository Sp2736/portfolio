# 🌌 SP.SYS | Professional Portfolio v1

A high-performance, cinematic digital portfolio built with **Next.js 14**, **Framer Motion**, and **Tailwind CSS**. This project serves as a technical showcase of fluid UI/UX, hardware-level browser integration, and interactive physics.

[Live Demo](https://swayam-patel-v1.vercel.app) ---

## 🛠 Features

### 1. **Luxury Preloader (The "Boot" Sequence)**
* **Decryption Effect:** Real-time text scrambling and decryption on entry.
* **Liquid Curtain Transition:** A custom Framer Motion exit animation that warps the container as it reveals the site.
* **Theme-Aware:** Automatically matches the user's system preference (Dark/Light) before the site even loads to prevent hydration flicker.

### 2. **Real-Time Telemetry & Diagnostics**
A specialized panel (accessible via the floating activity icon) that hooks into real client-side APIs:
* **GPU Identification:** Uses WebGL unmasked renderer to detect actual hardware (e.g., NVIDIA RTX / Apple M-series).
* **Memory Tracking:** Live JS Heap usage monitoring.
* **Network Intelligence:** Actual RTT (Ping) and Downlink speed measurement.
* **Performance:** A high-precision 60Hz FPS counter.

### 3. **Zero-G Interaction Engine**
* **Interactive Physics:** A "shatter" mode that turns site elements into physics-enabled objects.
* **Spatial Audio:** HTML5 Audio Engine with custom sound effects for glass shattering and bubble popping.
* **Audio Control:** A granular floating controller to toggle Ambient Music, SFX, or Master Mute.

---

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Components:** [Shadcn UI](https://ui.shadcn.com/) + [Lucide Icons](https://lucide.dev/)
- **Physics:** Custom Vector-based Collision Engine
- **Deployment:** [Vercel](https://vercel.com)

---

## 📦 Installation

To run this project locally:

1. **Clone the repo:**
   ```bash
   git clone [https://github.com/Sp2736/Sp2736.git](https://github.com/Sp2736/Sp2736.git)
