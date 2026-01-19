# Deployment Guide for AMS PC Parts Store

This Next.js application can be deployed to various platforms. The recommended platform for Next.js is **Vercel** for the best performance and ease of use.

## option 1: Deploy to Vercel (Recommended)

Vercel provides the best integration with Next.js.

### Prerequisites
1.  A [GitHub](https://github.com/), [GitLab](https://gitlab.com/), or [Bitbucket](https://bitbucket.org/) account.
2.  A [Vercel](https://vercel.com/) account.

### Steps
1.  **Initialize Git** (if not already done):
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  **Push to GitHub**:
    *   Create a new repository on GitHub.
    *   Run the commands shown by GitHub to push your existing code:
        ```bash
        git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
        git branch -M main
        git push -u origin main
        ```
3.  **Deploy on Vercel**:
    *   Go to your [Vercel Dashboard](https://vercel.com/dashboard).
    *   Click **"Add New..."** -> **"Project"**.
    *   Import your GitHub repository.
    *   Vercel will detect `Next.js` and configure build settings automatically.
    *   Click **Deploy**.

> **Note:** If the build fails on Vercel due to peer dependency issues (like we saw locally), you may need to add an environment variable in Vercel project settings:
> *   Name: `NPM_FLAGS`
> *   Value: `--legacy-peer-deps`
>
> Or update your "Install Command" in Vercel settings to: `npm install --legacy-peer-deps`

---

## Option 2: Deploy using Vercel CLI (No Git required)

If you don't want to use Git/GitHub, you can deploy directly from your terminal.

1.  **Install Vercel CLI**:
    ```bash
    npm i -g vercel
    ```
2.  **Login**:
    ```bash
    npx vercel login
    ```
3.  **Deploy**:
    ```bash
    npx vercel
    ```
    *   Follow the prompts. Vercel will upload your code and build it in the cloud.

---

## Option 3: Docker / proper Hosting

If you want to host it on a VPS (like DigitalOcean, AWS, etc.):

1.  **Build the Docker image**:
    (You will need to create a `Dockerfile` first - ask me if you need one!)
2.  **Run the container**:
    ```bash
    docker run -p 3000:3000 your-image-name
    ```

## Verification

After deployment, verify:
*   The site loads.
*   The "Get Quote" buttons work (they link to WhatsApp).
*   The scroll animations perform smoothly.

## Local Testing (Production Simulation)

To "deploy" locally and test exactly what users will see:

1.  **Build the application** (if you haven't already):
    ```bash
    npm run build
    ```
2.  **Start the production server**:
    ```bash
    npm run start
    ```
3.  Open [http://localhost:3000](http://localhost:3000) in your browser.

This runs the optimized production build, which is faster and behaves differently than `npm run dev` (which is for development).
