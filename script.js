const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const mainImage = document.getElementById('mainImage');
const mainTitle = document.getElementById('mainTitle');
const subTitle = document.getElementById('subTitle');
const buttonsContainer = document.querySelector('.buttons');

let noClickCount = 0;
let yesScale = 1;
let imageScale = 1;
const messages = [
    "Taknakk sayang majukk lagii 😤",
    "Betull kee sayanggg?",
    "Betul suree ke nii??",
    "Sayangg plishhh...",
    "Kalauu betull, babyy sedihh laa cenii...",
    "Babyy jadii sedihh angatt angatt nii...",
    "Haa okayylaa babyy tak tanyaa dahh...",
    "Takdelaa, sayangg jangan majukk dahh okayy! ❤️"
];

// Logic for the 'No' button moving
function moveNoButton() {
    // Get window dimensions with safe padding
    const padding = 20;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    // Random position within safe bounds (with margin)
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    // Move button to body to avoid transform context issues
    if (noBtn.parentNode !== document.body) {
        document.body.appendChild(noBtn);
    }

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // Make Yes button bigger
    yesScale += 0.5;
    yesBtn.style.transform = `scale(${yesScale})`;

    // Make Sad Gif bigger
    imageScale += 0.2;
    mainImage.style.transform = `scale(${imageScale})`;

    // Change text of No button randomly
    noClickCount++;
    if (noClickCount < messages.length) {
        noBtn.textContent = messages[noClickCount];
    } else {
        noBtn.textContent = messages[messages.length - 1];
    }
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent clicking on mobile immediate tap
    moveNoButton();
});
noBtn.addEventListener('click', moveNoButton);

// Logic for 'Yes' button
yesBtn.addEventListener('click', () => {
    // Change content
    mainImage.src = 'assets/happydudububu.gif';
    mainImage.style.transform = 'scale(1)'; // Reset size
    mainTitle.textContent = "YAY! Babyyy sayangg sayangg sangatt sangattt! ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️";
    subTitle.textContent = "Thank you sayanggg maafkan babyyy!";

    // Hide buttons
    buttonsContainer.style.display = 'none';
    noBtn.style.display = 'none';

    // Launch confetti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Continuous confetti for a few seconds
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // multiple sprays
        confetti({
            particleCount,
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            origin: { x: Math.random(), y: Math.random() - 0.2 }
        });
    }, 250);
});
