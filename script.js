// --- WIRE & SCROLL LOGIC ---

function updateWire() {
    const wireSvg = document.querySelector('.wire-svg');
    const wireContainer = document.querySelector('.wire-container');

    // 1. Resize SVG to fit the ENTIRE scrolled page height
    const fullHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight
    );

    wireContainer.style.height = fullHeight + 'px';
    wireSvg.style.height = fullHeight + 'px';

    // 2. Redraw the path so it ends exactly at the USB dock
    // Note: The USB dock is at the bottom center.
    // SVG Coordinate logic: Start Top-Right (95% width), Curve to Bottom-Center (50% width)
    const pathElement = document.getElementById('wire-path');
    const glowElement = document.getElementById('electric-glow');

    // Calculate bottom center point
    const endX = 50; // 50% width
    const endY = fullHeight; // Bottom pixel

    // Create a smooth SVG curve
    // M = Move to (95% Width, 0 Height)
    // Q = Quadratic Bezier Curve (Control Point, End Point)
    // We use multiple curves to make it "wiggle" down the page
    const newPath = `
        M 95 0 
        C 95 ${fullHeight * 0.2}, 90 ${fullHeight * 0.1}, 85 ${fullHeight * 0.3}
        C 80 ${fullHeight * 0.5}, 60 ${fullHeight * 0.7}, 50 ${fullHeight}
    `;

    // Apply the new path data to both the black wire and the glow
    // (Note: This simple logic assumes a relative viewBox 0 0 100 height)
    // For simplicity in this demo, we use the vector-effect in HTML,
    // but the scroll glow logic is handled below.
}

// Handle Electricity Flow
window.addEventListener('scroll', () => {
    const electricGlow = document.getElementById('electric-glow');
    const wirePath = document.getElementById('wire-path');

    if(!electricGlow || !wirePath) return;

    // Calculate Scroll %
    const scrollTop = window.scrollY;
    const winHeight = window.innerHeight;
    const docHeight = document.body.scrollHeight;

    const totalDocScroll = docHeight - winHeight;
    const scrollPercent = scrollTop / totalDocScroll;

    // Get length of the wire
    const pathLength = wirePath.getTotalLength();

    // Draw the electricity based on scroll percent
    const drawLength = pathLength * scrollPercent;

    // Apply stroke dash
    electricGlow.style.strokeDasharray = `${drawLength}, ${pathLength}`;
});

// Init
window.addEventListener('load', updateWire);
window.addEventListener('resize', updateWire);