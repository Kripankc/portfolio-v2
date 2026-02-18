# Portfolio Deployment Guide

You need to change 2 settings in your GitHub Repository for the deployment to work.

## 1. Locate the "Settings" Tab
1.  Open your repository: `https://github.com/kripankc/portfolio-v2`
2.  Look at the **top navigation bar** (below the repo name).
3.  You will see: `Code`, `Issues`, `Pull requests`, `Actions`, `Projects`, `Wiki`, `Security`, `Insights`, **`Settings`**.
4.  Click on the **`Settings`** tab (usually the last one on the right, with a gear icon ⚙️).

---

## 2. Configure "Pages" (The most important step!)
1.  In the **left sidebar** of the Settings page, scroll down to the **"Code and automation"** section.
2.  Click on **`Pages`**.
3.  On the main screen, under **"Build and deployment"**:
    *   Find the **"Source"** dropdown menu.
    *   It currently says **"Deploy from a branch"**.
    *   **Click it** and select **`GitHub Actions`** (it might say Beta).
4.  There is no save button for this specific change; it saves automatically or asks you to confirm.

---

## 3. Configure "Workflow Permissions" (If step 2 doesn't fix it)
1.  In the **left sidebar**, click on **`Actions`** (click the arrow `▼` to expand).
2.  Click on **`General`**.
3.  Scroll down to the bottom to **"Workflow permissions"**.
4.  Select **`Read and write permissions`**.
5.  Click **`Save`**.

---

## 4. Re-run the Failed Job
1.  Go to the **`Actions`** tab (top navigation bar).
2.  Click on the latest workflow run (it likely has a red ❌).
3.  Click the **`Re-run jobs`** button (top right) -> **`Re-run all jobs`**.

Your site should go live minutes after this succeeds!
