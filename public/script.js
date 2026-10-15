const readingUrl = document.getElementById('urlHere')
const checkingEntered = document.getElementById('submittingTheUrl')
const noDefault = document.getElementById('formUrl')
const result = document.getElementById('takeTheShortenedUrl')

noDefault.addEventListener("submit", async (e) => {
    e.preventDefault(); // stops the browser's default form submission
    console.log('Form submitted!');

    const enteredUrl = readingUrl.value; //retrieves the URL the user entered

    //await waits for the server's response.
    //response holds the HTTP response returned by Express.

    const response = await fetch('/shorten', {
        method: 'POST', //tells the method
        headers: {
            'Content-Type': 'application/json'//tells the server what format to expect
        },
        body: JSON.stringify({ url: enteredUrl }) //turns in to a json text
    });
    console.log('Sending request:', enteredUrl);

    const data = await response.json();

    console.log('Received data:', data);
    console.log('Result element:', result);

    result.textContent = data.shortUrl;

    console.log('Displayed URL:', result.textContent);
});

