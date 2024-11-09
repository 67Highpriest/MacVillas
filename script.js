document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const closeButton = document.querySelector('.close-menu-button');

    // Toggle the dropdown menu when the menu icon is clicked
    menuIcon.addEventListener('click', function () {
        dropdownMenu.classList.toggle('show'); // Show or hide the menu
    });

    // Close the dropdown menu when the close button is clicked
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            dropdownMenu.classList.remove('show'); // Ensure the menu is hidden
        });
    }
});

let lastScrollTop = 0;
const searchBar = document.querySelector('.search-bar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down - hide the search bar
        searchBar.style.top = '-60px'; // Adjust this value based on your search bar's height
    } else {
        // Scrolling up - show the search bar
        searchBar.style.top = '0';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});

// Slide functionality
let currentSlide = 0;
showSlide(currentSlide);

function changeSlide(n) {
    currentSlide += n;
    showSlide(currentSlide);
}

function showSlide(n) {
    const slides = document.querySelectorAll(".slide");
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    slides.forEach((slide, index) => {
        slide.style.display = (index === currentSlide) ? 'block' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const chatLink = document.getElementById('chatLink');
    const chatbot = document.getElementById('chatbot');
    const closeChatbot = document.getElementById('closeChatbot');
    const sendMsg = document.getElementById('sendMsg');
    const chatBody = document.getElementById('chatBody');
    const userInput = document.getElementById('userInput');

    // Show chatbot when chatLink is clicked
    chatLink.addEventListener('click', function(e) {
        e.preventDefault();
        chatbot.style.display = 'block';
    });

    // Close chatbot
    closeChatbot.addEventListener('click', function() {
        chatbot.style.display = 'none';
    });

    // Send message
    sendMsg.addEventListener('click', function() {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            appendMessage('You', userMessage);
            userInput.value = ''; 
            setTimeout(function() {
                appendMessage('Bot', generateResponse(userMessage));
            }, 1000); 
        }
    });

    // Append messages to chat body
    function appendMessage(sender, message) {
        const messageElem = document.createElement('div');
        messageElem.classList.add('chat-message');
        messageElem.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBody.appendChild(messageElem);
        chatBody.scrollTop = chatBody.scrollHeight; 
    }

    // Generate bot responses
    function generateResponse(userMessage) {
        if (userMessage.toLowerCase().includes('issue')) {
            return 'Please describe the issue you are facing.';
        } else if (userMessage.toLowerCase().includes('accommodation')) {
            return 'Could you please specify the accommodation you are requesting?';
        } else {
            return 'Thank you for your message. We will get back to you shortly.';
        }
    }
});

// Touch slider functionality
document.querySelectorAll('.slider').forEach((slider) => {
    const slides = slider.querySelector('.slides');
    const slideCount = slider.querySelectorAll('img').length;
    let isDragging = false, startPos = 0, currentTranslate = 0, prevTranslate = 0;
    let currentIndex = 0;

    slider.addEventListener('touchstart', touchStart);
    slider.addEventListener('touchend', touchEnd);
    slider.addEventListener('touchmove', touchMove);

    function touchStart(event) {
        isDragging = true;
        startPos = getPositionX(event);
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
            setSliderPosition();
        }
    }

    function touchEnd() {
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -50 && currentIndex < slideCount - 1) currentIndex += 1;
        if (movedBy > 50 && currentIndex > 0) currentIndex -= 1;

        setPositionByIndex();
    }

    function getPositionX(event) {
        return event.touches[0].clientX;
    }

    function setSliderPosition() {
        slides.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
        currentTranslate = currentIndex * -slider.clientWidth;
        prevTranslate = currentTranslate;
        slides.style.transform = `translateX(${currentTranslate}px)`;
    }
});