const API_URL = "http://127.0.0.1:5000";

window.onload = loadRoutes;

async function loadRoutes() {
    try {
        const response = await fetch(`${API_URL}/routes`);
        const data = await response.json();

        const routeSelect = document.getElementById("routeSelect");

        routeSelect.innerHTML =
            '<option value="">Select Route</option>';

        data.routes.forEach(route => {

            routeSelect.innerHTML += `
                <option value="${route.route_id}">
                    ${route.route_id} :
                    ${route.source} → ${route.destination}
                </option>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}

async function loadBuses() {

    const routeId =
        document.getElementById("routeSelect").value;

    if (!routeId) {
        alert("Please select a route");
        return;
    }

    try {

        const response =
            await fetch(`${API_URL}/buses/${routeId}`);

        const data = await response.json();

        const busList =
            document.getElementById("busList");

        busList.innerHTML = "";

        if (data.buses.length === 0) {
            busList.innerHTML =
                "<p>No buses available.</p>";
            return;
        }

        for (const bus of data.buses) {

            const etaResponse =
                await fetch(`${API_URL}/eta/${bus.bus_id}`);

            const etaData =
                await etaResponse.json();

            busList.innerHTML += `
                <div class="bus-card">
                    <h3>${bus.bus_id}</h3>
                    <p>Route: ${bus.route_id}</p>
                    <p><strong>ETA:</strong>
                    ${etaData.eta_minutes} minutes</p>
                </div>
            `;
        }

    } catch (error) {
        console.error(error);
    }
}