from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    page.goto("http://localhost:9992")
    page.wait_for_timeout(2000)

    # Navigation to Tasks
    page.get_by_role("link", name="Tasks").click()
    page.wait_for_timeout(1000)

    # Navigation to Desktop
    page.get_by_role("link", name="Desktop").click()
    page.wait_for_timeout(1000)

    # Back to Home
    page.get_by_role("link", name="Home").click()
    page.wait_for_timeout(1000)

    # Take screenshot of the Home page
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
