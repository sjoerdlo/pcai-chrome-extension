// main-panel.js

/**
 * Opens the manage prompts URL in a new tab.
 */
function openManagePromptsURL() {
    // Define the manage prompts URL
    const managePromptsURL = 'https://example.com/manage';

    // Open the URL in a new tab
    chrome.tabs.create({ url: managePromptsURL });
}

/**
 * Opens the login/register URL in a new tab.
 */
function openLoginRegisterURL() {
    // Define the login/register URL
    const loginRegisterURL = 'https://example.com/login';

    // Open the URL in a new tab
    chrome.tabs.create({ url: loginRegisterURL });
}

// Add event listeners to the buttons
document.getElementById('manage-prompts-button').addEventListener('click', openManagePromptsURL);
document.getElementById('login-register-button').addEventListener('click', openLoginRegisterURL);
