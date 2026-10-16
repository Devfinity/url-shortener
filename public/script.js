const readingUrl = document.getElementById('urlHere')
const noDefault = document.getElementById('formUrl')
const result = document.getElementById('takeTheShortenedUrl')
const copyingUrl = document.getElementById('copyingTheUrl')
const statusMessage = document.getElementById('statusMessage')

let shortenedUrl;

noDefault.addEventListener("submit", async (e) => {
    e.preventDefault(); // stops the browser's default form submission

    shortenedUrl = undefined;
    result.textContent = ''; //line 13 and 14 so when submit it clicked it remove the old link
    copyingUrl.style.display = "none";


    const enteredUrl = readingUrl.value; //retrieves the URL the user entered

    //await waits for the server's response.
    //response holds the HTTP response returned by Express.

    const showingError = document.createElement('p'); //"p" cause it is a message

    try { //if a error occurs in this code
        const response = await fetch('/shorten', {
            method: 'POST', //tells the method
            headers: {
                'Content-Type': 'application/json'//tells the server what format to expect
            },
            body: JSON.stringify({ url: enteredUrl }) //turns in to a json text
        });

        const data = await response.json(); //reads the response body and converts it into a JavaScript object

        if (!response.ok) {
            const error = new Error(data.message);
            error.name = 'ServerError';
            throw error;
        }

        shortenedUrl = data.shortUrl;

        const clickableLink = document.createElement('a'); //"a" cause it is a link

        clickableLink.href = data.shortUrl;
        clickableLink.textContent = data.shortUrl;

        result.appendChild(clickableLink); //sends a output through html
        copyingUrl.style.display = "flex";
    }
    catch (error) { //this executes
        if (error.name === 'ServerError') {
            showingError.textContent = error.message;
        }
        else {
            showingError.textContent = 'Unable to connect to the server. Please try again.'
        }
    }

    statusMessage.textContent = ''; //clears the old response
    statusMessage.append(showingError);
});

copyingUrl.addEventListener("click", async () => {
    const message = document.createElement('p');

    try {
        await navigator.clipboard.writeText(shortenedUrl); //copies to clipboard

        message.textContent = "Copied successfully!";
    }
    catch (error) {
        message.textContent = "Could not copy the url";
    }

    statusMessage.textContent = '';
    statusMessage.append(message);
});

