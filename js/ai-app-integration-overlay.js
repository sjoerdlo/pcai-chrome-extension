// ai-app-integration-overlay.js

function initializeSidebar() {
    const aiAppIntegrationButton = document.getElementById('pcai-btn-toggleSidebar');
    console.log(aiAppIntegrationButton);
    if (aiAppIntegrationButton) {
        aiAppIntegrationButton.addEventListener('click', handleSidebarToggle);
    }
}

function handleSidebarToggle() {
	console.log('sidebar btn click');

	const sidebar = document.getElementById('pcai-skv837s0');
	sidebar.classList.toggle('active');

    chrome.runtime.sendMessage({ action: 'openSidebar' });
}

initializeSidebar();

/**
 * Opens the main panel when the AI App Integration button is clicked.
 */
/*function onAIAppIntegrationButtonClick() {
    // Open the main panel
    chrome.runtime.sendMessage({ action: 'openMainPanel' });
}*/

// Add event listener to the AI App Integration button
//document.getElementById('ai-app-integration-button').addEventListener('click', onAIAppIntegrationButtonClick);
