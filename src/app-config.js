let backendHostUrl;
const hostname = window && window.location && window.location.hostname;
if (hostname === "localhost") {
backendHostUrl = "http://localhost";
}
export const API_BASE_URL = `${backendHostUrl}`;