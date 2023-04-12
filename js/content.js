// content.js

/**
 * Checks if the current URL is an AI App that should have the AI App integration injected.
 *
 * @returns {boolean} - Returns true if the current URL is an AI App, false otherwise.
 */
function isAIAppURL() {
    // Define an array of AI App URLs
    const aiAppURLs = [
        'https://chat.openai.com/',
        'https://labs.openai.com/',
        'https://app.leonardo.ai/'
    ];

    // Check if the current URL matches any of the AI App URLs
    return aiAppURLs.some(url => window.location.href.startsWith(url));
}

/**
 * Sends a message to the background script to inject the AI App integration.
 */
function injectAIAppIntegration() {
    // Send a message to the background script with the "injectContentScript" action
    chrome.runtime.sendMessage({ action: 'injectContentScript' }, function (response) {
        if (response.success) {
            console.log('AI App integration injected');
        } else {
            console.error('Failed to inject AI App integration');
        }
    });
}

// Check if the current URL is an AI App, and if so, inject the AI App integration
if (isAIAppURL()) {
    injectAIAppIntegration();
}