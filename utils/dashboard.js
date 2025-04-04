function generateSection(title, routes) {
    const rows = routes.map(([method, route, desc]) => {
        const id = `route-${route.replace(/[/:]/g, "-")}`;
        return `
            <tr>
                <td>${method}</td>
                <td>
                    <span class="copy-wrapper">
                        <code id="${id}">${route}</code>
                        <i class="fa-regular fa-copy copy-icon" onclick="copyDynamicText('${route}', this)"></i>
                        <span class="tooltip">Copy</span>
                    </span>
                </td>
                <td>${desc}</td>
            </tr>`;
    }).join("");

    return `
        <div class="section">
            <h2>${title}</h2>
            <table class="route-table">
                <tr>
                    <th>Method</th>
                    <th>Route</th>
                    <th>Description</th>
                </tr>
                ${rows}
            </table>
        </div>`;
}

const baseUrl = "https://subscription-tracker-6dlo.onrender.com/api/v1";

const dashboard = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Subscription Tracker API</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f9f9f9;
            padding: 20px;
        }
        header {
            text-align: center;
            margin-bottom: 30px;
        }
        h1 {
            color: #2b6cb0;
        }
        .section {
            margin-bottom: 30px;
        }
        .route-table {
            width: 100%;
            border-collapse: collapse;
        }
        .route-table th, .route-table td {
            padding: 10px;
            border: 1px solid #ccc;
        }
        .route-table th {
            background-color: #e2e8f0;
        }
        code {
            background-color: #edf2f7;
            padding: 2px 5px;
            border-radius: 4px;
        }
        .copy-icon {
            margin-left: 8px;
            color: #888;
            cursor: pointer;
        }
        .copy-icon:hover {
            color: #2b6cb0;
        }
        .copy-wrapper {
            position: relative;
            display: inline-block;
        }
        .tooltip {
            visibility: hidden;
            background-color: #a2d2ff;
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 4px 8px;
            position: absolute;
            bottom: 120%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.75em;
            opacity: 0;
            transition: opacity 0.2s;
            pointer-events: none;
        }
        .copy-wrapper.show-tooltip .tooltip {
            visibility: visible;
            opacity: 1;
        }
    </style>
</head>
<body>
    <header>
        <h1>Subscription Tracker API</h1>
        <p><strong>Base URL:</strong>
            <span class="copy-wrapper">
                <code id="base-url">${baseUrl}</code>
                <i class="fa-regular fa-copy copy-icon" onclick="copyText('base-url', this)"></i>
                <span class="tooltip">Copy</span>
            </span>
        </p>
    </header>

    ${generateSection("🔐 Auth Routes", [
    ["POST", "/auth/sign-up", "Create a new user"],
    ["POST", "/auth/sign-in", "Log in and receive auth token"],
    ["POST", "/auth/sign-out", "Log out user"]
])}

    ${generateSection("👤 User Routes", [
    ["GET", "/users/", "Get all users"],
    ["GET", "/users/:id", "Get a single user (authorized)"],
    ["POST", "/users/", "Create a new user"],
    ["PUT", "/users/:id", "Update user info"],
    ["DELETE", "/users/:id", "Delete a user"]
])}

    ${generateSection("💳 Subscription Routes", [
    ["GET", "/subscriptions/", "Get all subscriptions"],
    ["GET", "/subscriptions/:id", "Get subscription details"],
    ["POST", "/subscriptions/", "Create a new subscription (authorized)"],
    ["PUT", "/subscriptions/:id", "Update a subscription"],
    ["DELETE", "/subscriptions/:id", "Delete a subscription"],
    ["PUT", "/subscriptions/:id/cancle", "Cancel a subscription"],
    ["GET", "/subscriptions/user/:id", "Get subscriptions of a user (authorized)"],
    ["GET", "/subscriptions/upcomming-renewals", "Get upcoming renewal reminders"]
])}

    ${generateSection("🔁 Workflow Routes", [
    ["POST", "/workflows/subscription/reminder", "Send renewal reminders"]
])}

    <footer style="text-align: center; font-size: 0.9em; margin-top: 40px;">
        <p>Made with ❤️ by Shubham Gaikwad | <a href="https://github.com/Shubham112004/subscription-tracker" target="_blank">GitHub</a></p>
    </footer>

    <script>
        function copyText(id, icon) {
            const text = document.getElementById(id).textContent;
            navigator.clipboard.writeText(text).then(() => {
                showTooltip(icon);
            });
        }

        function copyDynamicText(text, icon) {
            navigator.clipboard.writeText(text).then(() => {
                showTooltip(icon);
            });
        }

        function showTooltip(icon) {
            const wrapper = icon.parentElement;
            const tooltip = wrapper.querySelector('.tooltip');
            tooltip.textContent = 'Copied!';
            wrapper.classList.add('show-tooltip');

            setTimeout(() => {
                tooltip.textContent = 'Copy';
                wrapper.classList.remove('show-tooltip');
            }, 1000);
        }
    </script>
</body>
</html>
`;

export { dashboard };
