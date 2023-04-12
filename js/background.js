// background.js

/**
 * Listener for messages from content script and other parts of the extension.
 * 
 * @param {Object} message - The message object containing the type and data.
 * @param {Object} sender - An object containing information about the sender.
 * @param {Function} sendResponse - A function to send a response back to the sender.
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check the message type and call appropriate function
    switch (message.type) {
        // Add cases for different message types here
        // For example:
        // case 'FETCH_PROMPTS':
        //     handleFetchPrompts(message, sender, sendResponse);
        //     break;
        case 'injectContentScript':
            handleInjectContentScriptMessage(message, sender, sendResponse);
            break;
    }

    // This line is necessary for asynchronous sendResponse usage
    return true;
});

/**
 * Injects the content script into all open tabs.
 */
function injectContentScript() {
    // Query for all open tabs
    chrome.tabs.query({}, (tabs) => {
        // Iterate over each open tab and inject the content script
        tabs.forEach((tab) => {
            chrome.tabs.executeScript(tab.id, { file: 'content.js' });
        });
    });
}

/**
 * Listener for the extension installation or update event.
 * 
 * @param {Object} details - An object containing information about the event.
 */
chrome.runtime.onInstalled.addListener((details) => {
    // Check if the event type is installation or update
    if (details.reason === 'install' || details.reason === 'update') {
        // Inject the content script into all open tabs
        injectContentScript();
    }
});

/**
 * Handles messages from the content script requesting content script injection.
 *
 * @param {Object} request - The message object containing the action to perform.
 * @param {Object} sender - The sender object containing information about the sender.
 * @param {Function} sendResponse - A function to send a response to the sender.
 */
function handleInjectContentScriptMessage(request, sender, sendResponse) {
    // Check if the action is "injectContentScript"
    if (request.action === 'injectContentScript') {
        // Inject the AI App integration script into the specified tab
        chrome.tabs.executeScript(sender.tab.id, { file: 'js/ai-app-integration.js' });
        sendResponse({ success: true });
    }
}
