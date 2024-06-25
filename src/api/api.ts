import { ChatAppResponse, ChatAppResponseOrError, ChatAppRequest, Config } from "./models";
import { BACKEND_URI } from "./BACKEND_URI";

function getHeaders(): Record<string, string> {
    return {
        "Content-Type": "application/json"
    };
}

export async function chatApi(request: ChatAppRequest): Promise<ChatAppResponseOrError> {
    const body = JSON.stringify(request);
    try {
        const response = await fetch(`${BACKEND_URI}/ai`, {
            method: "POST",
            mode: "cors",
            headers: getHeaders(),
            body: body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ChatAppResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return { error: error.message };
    }
}

export function getCitationFilePath(citation: string): string {
    return `${BACKEND_URI}/content/${citation}`;
}

// Function to process the response
function processResponse(data: ChatAppResponseOrError) {
    if ('error' in data) {
        console.error('Error in response:', data.error);
        return;
    }

    if (data && data.answer) {
        const answer = typeof data.answer === 'string' ? data.answer.trim() : '';
        console.log('Processed Answer:', answer);
    } else {
        console.error('Invalid response format', data);
    }
}
