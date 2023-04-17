// background.js

/**
 * Listener for messages from content script and other parts of the extension.
 * 
 * @param {Object} message - The message object containing the type and data.
 * @param {Object} sender - An object containing information about the sender.
 * @param {Function} sendResponse - A function to send a response back to the sender.
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('chrome.runtime.onMessage.addListener');
    // Check the message type and call appropriate function
    switch (message.action) {
        case 'executeAiAppIntegration':
            console.log('executeAiAppIntegration received');
            executeAiAppIntegration(sender.tab);
            sendResponse({ success: true });
            break;
        case 'injectOverlay':
            injectOverlayHTML(sender.tab);
            chrome.scripting.insertCSS({target: {tabId: sender.tab.id}, files: ['css/ai-app-integration-overlay.css']});
            sendResponse({success: true});
            break;
    }

    // This line is necessary for asynchronous sendResponse usage
    return true;
});

/**
 * Injects the AI App Integration overlay HTML into the specified tab and executes the associated script.
 *
 * @param {Object} tab - The Tab object where the AI App Integration overlay HTML should be injected.
 */
function injectOverlayHTML(tab) {
    // Fetch the AI App Integration overlay HTML from the extension's local file
    fetch(chrome.runtime.getURL('html/ai-app-integration-overlay.html'))
        .then(response => response.text())
        .then(html => {
            // Inject the fetched HTML content into the specified tab
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: function (htmlContent) {
                    const div = document.createElement('div');
                    div.innerHTML = htmlContent;
                    document.body.appendChild(div);
                },
                args: [html],
            }, () => {
                // Execute ai-app-integration-overlay.js after injecting the HTML content
                // This ensures that the DOM elements are available when the script runs
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['js/ai-app-integration-overlay.js']
                });
            });
        })
        .catch(err => console.error('Error injecting AI App Integration overlay HTML:', err));
}





/**
 * Executes the AI App Integration content script (ai-app-integration.js).
 * This function injects ai-app-integration.js into the specified tab.
 *
 * @param {Object} tab - The Tab object where the AI App Integration script should be executed.
 */
function executeAiAppIntegration(tab) {
    // Inject ai-app-integration.js into the specified tab
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            files: ["js/ai-app-integration.js"],
        },
        () => {
            console.log("ai-app-integration.js injected!");
        }
    );
}