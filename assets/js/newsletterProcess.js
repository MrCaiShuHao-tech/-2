
(function ($) {
    // Start of use strict
    'use strict';
    document.getElementById('subscriptionForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const form = this;
        const email = document.getElementById('email').value;
        const subscribeBtn = document.getElementById('subscribeBtn');
        const btnText = subscribeBtn.querySelector('.btn-text');
        const loading = document.getElementById('loading');
        const successAlert = document.getElementById('successAlert');
        const errorAlert = document.getElementById('errorAlert');

        // Hide previous alerts
        successAlert.style.display = 'none';
        errorAlert.style.display = 'none';

        // Show loading state
        subscribeBtn.disabled = true;
        btnText.style.display = 'none';
        loading.style.display = 'flex';

        // Create FormData
        const formData = new FormData();
        formData.append('email', email);
        formData.append('subscribe', '1');

        // Send AJAX request
        fetch('subscribe.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                // Reset button state
                subscribeBtn.disabled = false;
                btnText.style.display = 'inline';
                loading.style.display = 'none';

                if (data.success) {
                    successAlert.textContent = data.message;
                    successAlert.style.display = 'block';
                    form.reset();

                    // Add celebration animation
                    subscribeBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                    setTimeout(() => {
                        subscribeBtn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                    }, 2000);
                } else {
                    errorAlert.textContent = data.message;
                    errorAlert.style.display = 'block';
                }

                // Auto-hide alerts after 5 seconds
                setTimeout(() => {
                    successAlert.style.display = 'none';
                    errorAlert.style.display = 'none';
                }, 5000);
            })
            .catch(error => {
                // Reset button state
                subscribeBtn.disabled = false;
                btnText.style.display = 'inline';
                loading.style.display = 'none';

                errorAlert.textContent = 'Something went wrong. Please try again.';
                errorAlert.style.display = 'block';

                setTimeout(() => {
                    errorAlert.style.display = 'none';
                }, 5000);
            });
    });

    // Add input animation
    document.getElementById('email').addEventListener('focus', function () {
        this.parentElement.style.transform = 'scale(1.02)';
    });

    document.getElementById('email').addEventListener('blur', function () {
        this.parentElement.style.transform = 'scale(1)';
    });

})(jQuery);

