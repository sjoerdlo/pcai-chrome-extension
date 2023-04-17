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
	console.log('Is AI app. Inject!');

	chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
		// Check the message type and call appropriate function
		switch (message.action) {
			case "executeAiAppIntegration":
				sendResponse({ success: true });
				break;
		}

		// This line is necessary for asynchronous sendResponse usage
		return true;
	});
}

// Check if the current URL is an AI App, and if so, inject the AI App integration
if (isAIAppURL()) {
	injectAIAppIntegration();

	// Send a message to the background script to execute the AI App integration
	// This message will be caught by the message listener in background.js
	chrome.runtime.sendMessage({ action: "executeAiAppIntegration" });
} else {
	console.log('Not an AI app. Skipping injection.');
}
