document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('countdown');
    const urlParams = new URLSearchParams(window.location.search);

    // Handle color parameter
    const colorParam = urlParams.get('color');
    if (colorParam) {
        // Basic validation for color name
        if (/^[a-zA-Z]+$/.test(colorParam) || /^#([0-9a-fA-F]{3}){1,2}$/.test(colorParam)) {
            countdownElement.style.color = colorParam;
        }
    }

    function getStartTime() {
        const startTimeParam = urlParams.get('startTime'); // e.g., "08:30"

        if (startTimeParam) {
            const parts = startTimeParam.split(':');
            if (parts.length === 2) {
                const hours = parseInt(parts[0], 10);
                const minutes = parseInt(parts[1], 10);

                if (!isNaN(hours) && !isNaN(minutes)) {
                    return { hours, minutes };
                }
            }
        }
        // Default start time if parameter is not provided or invalid
        return { hours: 7, minutes: 0 };
    }

    function updateCountdown() {
        const now = new Date();
        const { hours, minutes: startMinutes } = getStartTime();

        // The anchor time for the countdown intervals.
        const anchorTime = new Date(now);
        anchorTime.setHours(hours, startMinutes, 0, 0);

        const intervalMilliseconds = 45 * 60 * 1000; // 45 minutes in milliseconds

        const nowMillis = now.getTime();
        const anchorMillis = anchorTime.getTime();

        // Calculate the difference in milliseconds from the anchor.
        const millisSinceAnchor = nowMillis - anchorMillis;

        // Calculate how many milliseconds we are into the current 45-minute interval.
        // Using a true mathematical modulo to handle negative numbers correctly (for times before the anchor).
        const millisIntoInterval = ((millisSinceAnchor % intervalMilliseconds) + intervalMilliseconds) % intervalMilliseconds;

        // Calculate the milliseconds remaining in the current interval.
        const millisRemaining = intervalMilliseconds - millisIntoInterval;

        // Convert remaining milliseconds to minutes for display.
        const totalSeconds = Math.floor(millisRemaining / 1000);
        const minutes = Math.floor(totalSeconds / 60);

        // Update the display to show only the minutes.
        countdownElement.textContent = String(minutes);
    }

    // Run the update function every second.
    setInterval(updateCountdown, 1000);

    // Call it once immediately on load.
    updateCountdown();
});