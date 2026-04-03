(function ($) {
    // Start of use strict
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('subscriptionForm');
        const emailInput = document.getElementById('email');
        const subscribeBtn = document.getElementById('subscribeBtn');
        const btnText = document.getElementById('btnText');
        const successAlert = document.getElementById('successAlert');
        const errorAlert = document.getElementById('errorAlert');

        // Hide alerts function
        function hideAlerts() {
            successAlert.style.display = 'none';
            errorAlert.style.display = 'none';
        }

        // Show success message
        function showSuccess(message) {
            hideAlerts();
            successAlert.innerHTML = message;
            successAlert.style.display = 'block';
            successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Show error message
        function showError(message) {
            hideAlerts();
            errorAlert.innerHTML = message;
            errorAlert.style.display = 'block';
            errorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Enhanced email validation
        function isValidEmail(email) {
            // More comprehensive email regex
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            return emailRegex.test(email) && email.length <= 254;
        }

        // Additional validation for common email mistakes
        function validateEmailFormat(email) {
            // Check for common issues
            if (email.includes('..')) return false; // Double dots
            if (email.startsWith('.') || email.endsWith('.')) return false; // Starts/ends with dot
            if (email.includes('@.') || email.includes('.@')) return false; // Dot next to @
            if ((email.match(/@/g) || []).length !== 1) return false; // Multiple @ symbols
            if (email.includes(' ')) return false; // Contains spaces

            const parts = email.split('@');
            if (parts.length !== 2) return false;

            const [localPart, domainPart] = parts;

            // Local part validation
            if (localPart.length === 0 || localPart.length > 64) return false;
            if (localPart.startsWith('.') || localPart.endsWith('.')) return false;

            // Domain part validation
            if (domainPart.length === 0 || domainPart.length > 253) return false;
            if (domainPart.startsWith('-') || domainPart.endsWith('-')) return false;
            if (!domainPart.includes('.')) return false; // Must have at least one dot

            const domainParts = domainPart.split('.');
            for (let part of domainParts) {
                if (part.length === 0 || part.length > 63) return false;
                if (part.startsWith('-') || part.endsWith('-')) return false;
            }

            return true;
        }

        // Handle form submission
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            hideAlerts();

            const email = emailInput.value.trim();

            // Validate email step by step
            if (!email) {
                showError('Please enter your email address!');
                emailInput.focus();
                return;
            }

            // Check basic format first
            if (!validateEmailFormat(email)) {
                showError('❌ ' + email + ' is not a valid email address!');
                emailInput.focus();
                emailInput.select();
                return;
            }

            // Check with regex
            if (!isValidEmail(email)) {
                showError('❌ ' + email + ' is not a valid email address!');
                emailInput.focus();
                emailInput.select();
                return;
            }

            // Show loading state
            subscribeBtn.disabled = true;
            btnText.innerHTML = '<span class="sub_loading"></span>Subscribing...';

            // Prepare form data
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
                    if (data.success) {
                        showSuccess(data.message);
                        emailInput.value = ''; // Clear the input
                    } else {
                        showError(data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    showError('Something went wrong. Please try again later.');
                })
                .finally(() => {
                    // Reset button state
                    subscribeBtn.disabled = false;
                    btnText.innerHTML = 'Subscribe Now';
                });
        });

        // Hide alerts when user starts typing and provide real-time validation
        emailInput.addEventListener('input', function () {
            hideAlerts();

            const email = this.value.trim();

            // Real-time validation feedback
            if (email.length > 0) {
                // Remove invalid styling first
                this.style.borderColor = '#ddd';
                this.style.backgroundColor = '';

                // Check for obvious issues
                if (email.includes(' ')) {
                    this.style.borderColor = '#dc3545';
                    this.style.backgroundColor = '#fff5f5';
                    this.style.color = '#fff5f5';
                    showError('❌ Email addresses cannot contain spaces!');
                    return;
                }

                if (email.includes('..')) {
                    this.style.borderColor = '#dc3545';
                    this.style.backgroundColor = '#fff5f5';
                    showError('❌ Email addresses cannot contain consecutive dots!');
                    return;
                }

                const atCount = (email.match(/@/g) || []).length;
                if (atCount > 1) {
                    this.style.borderColor = '#dc3545';
                    this.style.backgroundColor = '#fff5f5';
                    showError('❌ Email addresses can only contain one @ symbol!');
                    return;
                }

                if (email.includes('@') && !email.includes('.', email.indexOf('@'))) {
                    this.style.borderColor = '#dc3545';
                    this.style.backgroundColor = '#fff5f5';
                    showError('❌ Domain must contain at least one dot after @!');
                    return;
                }

                // If email looks complete, validate it
                if (email.includes('@') && email.includes('.') && email.length > 5) {
                    if (isValidEmail(email) && validateEmailFormat(email)) {
                        this.style.borderColor = '#28a745';
                        this.style.backgroundColor = '#f8fff9';
                    } else {
                        this.style.borderColor = '#dc3545';
                        this.style.backgroundColor = '#fff5f5';
                    }
                }
            }
        });

        // Additional validation on blur (when user leaves the field)
        emailInput.addEventListener('blur', function () {
            const email = this.value.trim();

            if (email.length > 0) {
                if (!isValidEmail(email) || !validateEmailFormat(email)) {
                    this.style.borderColor = '#dc3545';
                    this.style.backgroundColor = '#fff5f5';
                    showError('❌ ' + email + ' is not a valid email address!');
                } else {
                    this.style.borderColor = '#28a745';
                    this.style.backgroundColor = '#f8fff9';
                    hideAlerts();
                }
            }
        });
    });

})(jQuery);
