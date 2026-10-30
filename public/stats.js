const statsOfLinks = document.getElementById('statsOfLink')
const code = document.getElementById('linkCode')
const originalUrl = document.getElementById('linkOriginal')
const clicks = document.getElementById('linkClicks')
const time = document.getElementById('linkTime')
const errorMessage = document.getElementById('errorMessage')

const params = new URLSearchParams(window.location.search);
const codeCheck = params.get('code');

if (!codeCheck) {
    errorMessage.textContent = 'Please enter a valid code!'
}
else {
    fetch(`/stats/${codeCheck}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("Please enter a valid code!");
                }
                else if (response.status === 500) {
                    throw new Error("Something went wrong while trying to fetch statistics data, Please try again!");
                }
                else {
                    throw new Error("Something went wrong. Please try again!");
                }
            }

            return response.json();
        })

        .then(data => {
            statsOfLinks.style.display = "flex"

            code.textContent = `Code: ${data.code}`;
            originalUrl.textContent = `Original Url: ${data.original_url}`;
            clicks.textContent = `Total clicks: ${data.clicks}`;
            time.textContent = `Creation time: ${data.created_at}`;
        })

        .catch(error => {
            statsOfLinks.style.display = "none"
            errorMessage.textContent = error.message;
        });
}