// ai-app-integration.js

/**
 * Creates and returns the prompt collector button element.
 *
 * @returns {HTMLElement} - The created prompt collector button element.
 */
function createPromptCollectorButton() {
    const button = document.createElement('button');
    button.id = 'prompt-collector-button';
    button.textContent = 'Collect Prompt';
    button.style.backgroundColor = 'blue';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.padding = '4px 8px';
    button.style.cursor = 'pointer';
    button.style.marginLeft = '8px';

    button.addEventListener('click', () => {
        // TODO: Implement prompt collection logic here
        console.log('Prompt collection button clicked');
    });

    return button;
}

/**
 * Inserts the prompt collector button into the appropriate location for the AI App.
 */
function insertPromptCollectorButton() {
    // Define an array of AI App URL patterns and button insertion functions
    const aiAppButtonInsertionMap = [
        {
            urlPattern: /^https:\/\/chat\.openai\.com\//,
            insertButton: () => {
                const actionBar = document.querySelector('.action-bar');
                if (actionBar) {
                    actionBar.appendChild(createPromptCollectorButton());
                }
            }
        },
        {
            urlPattern: /^https:\/\/labs\.openai\.com\//,
            insertButton: () => {
                const actionBar = document.querySelector('.submit-wrapper');
                if (actionBar) {
                    actionBar.appendChild(createPromptCollectorButton());
                }
            }
        },
        {
            urlPattern: /^https:\/\/app\.leonardo\.ai\//,
            insertButton: () => {
                const actionBar = document.querySelector('.action-buttons');
                if (actionBar) {
                    actionBar.appendChild(createPromptCollectorButton());
                }
            }
        }
    ];

    // Find the appropriate button insertion function for the current URL and call it
    for (const appConfig of aiAppButtonInsertionMap) {
        if (appConfig.urlPattern.test(window.location.href)) {
            appConfig.insertButton();
            break;
        }
    }
}

// Insert the prompt collector button into the AI App
insertPromptCollectorButton();

/**
 * Gets the prompt and response from the ChatGPT app.
 *
 * @returns {Object} - An object containing the prompt and response.
 */
function getChatGPTPromptAndResponse() {
    const inputElement = document.querySelector('.input-box');
    const responseElement = document.querySelector('.response-box');

    return {
        prompt: inputElement ? inputElement.value : '',
        response: responseElement ? responseElement.textContent : ''
    };
}

/**
 * Gets the prompt and response from the DALL-E app.
 *
 * @returns {Object} - An object containing the prompt and response.
 */
function getDALLEPromptAndResponse() {
    const inputElement = document.querySelector('.input-box');
    const responseElement = document.querySelector('.response-box');

    return {
        prompt: inputElement ? inputElement.value : '',
        response: responseElement ? responseElement.textContent : ''
    };
}

/**
 * Gets the prompt and response from the Leonardo.AI app.
 *
 * @returns {Object} - An object containing the prompt and response.
 */
function getLeonardoAIPromptAndResponse() {
    const inputElement = document.querySelector('.input-box');
    const responseElement = document.querySelector('.response-box');

    return {
        prompt: inputElement ? inputElement.value : '',
        response: responseElement ? responseElement.textContent : ''
    };
}

/**
 * Gets the prompt and response from the AI App.
 *
 * @returns {Object} - An object containing the prompt and response.
 */
function getPromptAndResponse() {
    if (/^https:\/\/chat\.openai\.com\//.test(window.location.href)) {
        return getChatGPTPromptAndResponse();
    } else if (/^https:\/\/labs\.openai\.com\//.test(window.location.href)) {
        return getDALLEPromptAndResponse();
    } else if (/^https:\/\/app\.leonardo\.ai\//.test(window.location.href)) {
        return getLeonardoAIPromptAndResponse();
    }
}

// Update the event listener for the prompt collector button
button.addEventListener('click', () => {
    const { prompt, response } = getPromptAndResponse();
    console.log('Prompt:', prompt);
    console.log('Response:', response);
    // TODO: Implement prompt collection logic here
});