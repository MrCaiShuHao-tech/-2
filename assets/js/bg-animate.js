(function ($) {
    'use strict';
    // Initialize
    document.addEventListener('DOMContentLoaded', function () {

        // Create animated background shapes
        const animatedBg = document.querySelector('.bg-animation-1');
        for (let i = 0; i < 10; i++) {
            const smallShape = document.createElement('div');
            smallShape.className = 'bg-shape circle';
            smallShape.style.width = Math.random() * 30 + 20 + 'px';
            smallShape.style.height = smallShape.style.width;
            smallShape.style.background = i % 2 === 0 ? 'var(--clr-bg-primary)' : (i % 3 === 0 ? 'var(--clr-bg-secondary)' : 'var(--clr-bg-optional)');
            smallShape.style.left = Math.random() * 100 + '%';
            smallShape.style.top = Math.random() * 100 + '%';
            smallShape.style.opacity = '0.05';
            smallShape.style.animation = `floating ${Math.random() * 10 + 15}s infinite ${Math.random() * 5}s`;
            animatedBg.appendChild(smallShape);
        }

    });

})(jQuery);