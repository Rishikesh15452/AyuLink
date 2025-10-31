// Ayulink JavaScript Functions

// Check if user is logged in
window.addEventListener('load', function() {
  // Redirect to login page if not logged in
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'login.html';
  }
});

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    // Apply saved theme
    applySavedTheme();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize animations
    initAnimations();
    
    // Set up interactive elements
    setupInteractions();
    
    // Update real-time data
    updateHealthData();
    
    // Set up form submission
    setupFormSubmission();
    
    // Set up health metrics form
    setupHealthMetricsForm();
    
    // Load saved data
    loadSavedData();
    
    // Load user name
    loadUserName();
    
    // File upload functionality
    initFileUpload();
});

// Theme switching functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleTheme();
        });
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Apply new theme
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save preference to localStorage
    localStorage.setItem('themePreference', newTheme);
    
    // Update toggle icon
    updateThemeIcon(newTheme);
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem('themePreference') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            if (theme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }
}

function initAnimations() {
    // Add staggered animations to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.animationDelay = `${0.1 * index}s`;
    });
    
    // Add staggered animations to chart bars
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        bar.style.animationDelay = `${1.7 + (0.1 * index)}s`;
    });
    
    // Add floating effect to cards on hover
    const cards = document.querySelectorAll('.stat-card, .section, .goal-item, .health-form-section, .health-data-section');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function setupInteractions() {
    // Set up navigation links
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Add ripple effect
            createRippleEffect(e, this);
        });
    });
    
    // Set up goal item interactions
    const goalItems = document.querySelectorAll('.goal-item');
    goalItems.forEach(item => {
        item.addEventListener('click', function() {
            const status = this.querySelector('.goal-status');
            if (status.classList.contains('pending')) {
                status.classList.remove('pending');
                status.classList.add('in-progress');
                status.innerHTML = '<span>1/2</span>';
                
                // Add celebration effect
                createCelebration(this);
            } else if (status.classList.contains('in-progress')) {
                status.classList.remove('in-progress');
                status.classList.add('completed');
                status.innerHTML = '<i class="fas fa-check"></i>';
                
                // Add celebration effect
                createCelebration(this);
            }
        });
    });
}

function updateHealthData() {
    // Simulate real-time updates
    setInterval(() => {
        // Randomly update heart rate
        const heartRateElement = document.querySelector('.heart .value');
        if (heartRateElement) {
            const currentRate = parseInt(heartRateElement.textContent);
            const newRate = currentRate + Math.floor(Math.random() * 3) - 1;
            if (newRate >= 60 && newRate <= 90) {
                heartRateElement.textContent = newRate;
            }
        }
        
        // Randomly update step count
        const stepsElement = document.querySelector('.steps .value');
        if (stepsElement) {
            const currentSteps = parseInt(stepsElement.textContent.replace(',', ''));
            const newSteps = currentSteps + Math.floor(Math.random() * 10);
            if (newSteps <= 10000) {
                stepsElement.textContent = newSteps.toLocaleString();
                updateProgressBar('.steps-progress', newSteps / 10000);
            }
        }
    }, 5000);
}

function updateProgressBar(selector, percentage) {
    const progressBar = document.querySelector(selector);
    if (progressBar) {
        progressBar.style.transform = `scaleX(${percentage})`;
    }
}

function createRippleEffect(event, element) {
    // Create ripple effect on click
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    // Position ripple
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function createCelebration(element) {
    // Create confetti effect
    const confettiCount = 30;
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.backgroundColor = getRandomColor();
        
        element.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 2000);
    }
}

function getRandomColor() {
    const colors = ['#4361ee', '#4cc9f0', '#f72585', '#7209b7', '#3a0ca3', '#4ade80', '#facc15'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Form submission handling
function setupFormSubmission() {
    const form = document.getElementById('healthForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const healthData = {};
            
            for (let [key, value] of formData.entries()) {
                healthData[key] = value;
            }
            
            // Save user name to localStorage if provided
            if (healthData.name) {
                localStorage.setItem('userName', healthData.name);
            }
            
            // Save health data to localStorage
            saveHealthData(healthData);
            
            // Show success message
            showNotification('Health data saved successfully!', 'success');
            
            // Reset form but keep the name field
            const nameValue = healthData.name || '';
            form.reset();
            if (nameValue) {
                document.getElementById('name').value = nameValue;
            }
            
            // Update displayed data
            displayHealthData();
        });
    }
}

function saveHealthData(data) {
    // Get existing data
    let healthRecords = JSON.parse(localStorage.getItem('healthRecords')) || [];
    
    // Add timestamp
    data.timestamp = new Date().toISOString();
    data.id = Date.now();
    
    // Add to records
    healthRecords.push(data);
    
    // Keep only last 30 records
    if (healthRecords.length > 30) {
        healthRecords = healthRecords.slice(-30);
    }
    
    // Save to localStorage
    localStorage.setItem('healthRecords', JSON.stringify(healthRecords));
}

function loadSavedData() {
    displayHealthData();
}

function displayHealthData() {
    const healthRecords = JSON.parse(localStorage.getItem('healthRecords')) || [];
    
    // Create health data section if it doesn't exist
    let dataSection = document.querySelector('.health-data-section');
    if (!dataSection) {
        const formSection = document.querySelector('.health-form-section');
        if (formSection) {
            dataSection = document.createElement('div');
            dataSection.className = 'health-data-section animate-section';
            dataSection.innerHTML = `
                <h3><i class="fas fa-database"></i> Your Health Data</h3>
                <div class="health-data-grid" id="healthDataGrid"></div>
            `;
            formSection.after(dataSection);
        }
    }
    
    const dataGrid = document.getElementById('healthDataGrid');
    if (dataGrid && healthRecords.length > 0) {
        // Get the most recent record
        const latestRecord = healthRecords[healthRecords.length - 1];
        
        // Display key metrics
        dataGrid.innerHTML = `
            <div class="data-card">
                <h4><i class="fas fa-weight"></i> Body Metrics</h4>
                <div class="data-list">
                    <div class="data-item">
                        <span class="data-label">Weight:</span>
                        <span class="data-value">${latestRecord.weight || 'N/A'} kg</span>
                    </div>
                    <div class="data-item">
                        <span class="data-label">Height:</span>
                        <span class="data-value">${latestRecord.height || 'N/A'} cm</span>
                    </div>
                    <div class="data-item">
                        <span class="data-label">BMI:</span>
                        <span class="data-value">${calculateBMI(latestRecord.weight, latestRecord.height)}</span>
                    </div>
                </div>
            </div>
            
            <div class="data-card">
                <h4><i class="fas fa-heartbeat"></i> Vital Signs</h4>
                <div class="data-list">
                    <div class="data-item">
                        <span class="data-label">Blood Pressure:</span>
                        <span class="data-value">${latestRecord.bloodPressure || 'N/A'}</span>
                    </div>
                    <div class="data-item">
                        <span class="data-label">Heart Rate:</span>
                        <span class="data-value">${latestRecord.heartRate || 'N/A'} bpm</span>
                    </div>
                </div>
            </div>
            
            <div class="data-card">
                <h4><i class="fas fa-bed"></i> Daily Habits</h4>
                <div class="data-list">
                    <div class="data-item">
                        <span class="data-label">Sleep:</span>
                        <span class="data-value">${latestRecord.sleepHours || 'N/A'} hours</span>
                    </div>
                    <div class="data-item">
                        <span class="data-label">Water Intake:</span>
                        <span class="data-value">${latestRecord.waterIntake || 'N/A'} glasses</span>
                    </div>
                    <div class="data-item">
                        <span class="data-label">Exercise:</span>
                        <span class="data-value">${latestRecord.exercise || 'N/A'} minutes</span>
                    </div>
                </div>
            </div>
        `;
        
        // Add symptoms if they exist
        if (latestRecord.symptoms) {
            const symptomsCard = document.createElement('div');
            symptomsCard.className = 'data-card';
            symptomsCard.innerHTML = `
                <h4><i class="fas fa-stethoscope"></i> Symptoms & Notes</h4>
                <div class="symptoms-list">
                    <div class="symptom-item">
                        <i class="fas fa-comment-medical"></i>
                        <span>${latestRecord.symptoms}</span>
                    </div>
                </div>
            `;
            dataGrid.appendChild(symptomsCard);
        }
        
        // Add medication if they exist
        if (latestRecord.medication) {
            const medicationCard = document.createElement('div');
            medicationCard.className = 'data-card';
            medicationCard.innerHTML = `
                <h4><i class="fas fa-pills"></i> Medications</h4>
                <div class="symptoms-list">
                    <div class="symptom-item">
                        <i class="fas fa-capsules"></i>
                        <span>${latestRecord.medication}</span>
                    </div>
                </div>
            `;
            dataGrid.appendChild(medicationCard);
        }
    }
}

function calculateBMI(weight, height) {
    if (!weight || !height) return 'N/A';
    
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '1000',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        transform: 'translateX(150%)',
        transition: 'transform 0.3s ease'
    });
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #f87171, #ef4444)';
    }
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="spinner">
            <div class="heart-loader"></div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Hide loader after a delay
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1000);
});

// Add logout functionality
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear login status
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            localStorage.removeItem('userName');
            
            // Clear user-specific health metrics
            const currentUser = localStorage.getItem('username') || 'defaultUser';
            localStorage.removeItem(`healthMetrics_${currentUser}`);
            
            // Redirect to login page
            window.location.href = 'login.html';
        });
    }
    
    // File upload functionality
    initFileUpload();
});

// File upload functionality
function initFileUpload() {
    const dropArea = document.getElementById('dropArea');
    
    // If there's no drop area, we're not on a page with file upload
    if (!dropArea) return;
    
    const fileInput = document.getElementById('fileInput');
    const browseBtn = document.getElementById('browseBtn');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileList = document.getElementById('fileList');
    let files = [];
    
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });
    
    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });
    
    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false);
    
    // Handle file selection via button
    browseBtn.addEventListener('click', () => {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', handleFiles);
    
    // Upload button click
    uploadBtn.addEventListener('click', uploadFiles);
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    function highlight() {
        dropArea.classList.add('highlight');
    }
    
    function unhighlight() {
        dropArea.classList.remove('highlight');
    }
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const droppedFiles = dt.files;
        handleFiles({target: {files: droppedFiles}});
    }
    
    function handleFiles(e) {
        const selectedFiles = e.target.files;
        files = [...files, ...selectedFiles];
        updateFileList();
    }
    
    function updateFileList() {
        fileList.innerHTML = '';
        
        if (files.length > 0) {
            uploadBtn.style.display = 'block';
            
            files.forEach((file, index) => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                fileItem.innerHTML = `
                    <span class="file-name">${file.name}</span>
                    <span class="file-size">(${formatFileSize(file.size)})</span>
                    <i class="fas fa-times remove-file" data-index="${index}"></i>
                `;
                fileList.appendChild(fileItem);
            });
            
            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-file').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    files.splice(index, 1);
                    updateFileList();
                });
            });
        } else {
            uploadBtn.style.display = 'none';
        }
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    function uploadFiles() {
        if (files.length === 0) return;
        
        // In a real application, you would send the files to a server here
        // For this example, we'll simulate OCR processing
        simulateOCRProcessing(files);
        
        // Clear the file list
        files = [];
        updateFileList();
    }
}

// Simulate OCR processing and display results
function simulateOCRProcessing(files) {
    // Show the OCR results section
    const ocrSection = document.getElementById('ocrResultsSection');
    if (ocrSection) {
        ocrSection.style.display = 'block';
        
        // Scroll to the OCR section
        ocrSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Simulate processing delay
    setTimeout(() => {
        // First try to connect to the actual OCR backend service
        // If that fails, fall back to mock processing
        connectToOCRService(files)
            .catch(() => {
                // Generate mock OCR results
                const mockResults = generateMockOCRResults(files);
                displayOCRResults(mockResults);
            });
    }, 1500);
}

// Connect to the OCR backend service
async function connectToOCRService(files) {
    try {
        // In a real implementation, you would send the files to the backend service
        // For now, we'll just fetch mock results from our simple server
        
        const response = await fetch('http://localhost:8000/results');
        if (!response.ok) {
            throw new Error('Failed to connect to OCR service');
        }
        
        const data = await response.json();
        console.log('OCR Service Response:', data);
        
        // Format the response to match our expected structure
        const results = [{
            fileName: data.filename,
            keyValuePairs: data.ocr_result.key_value_pairs,
            fullText: data.ocr_result.ocr_text
        }];
        
        displayOCRResults(results);
        showNotification('Successfully processed files with OCR service', 'success');
        
        return Promise.resolve();
    } catch (error) {
        console.error('Error connecting to OCR service:', error);
        showNotification('Failed to connect to OCR service, using mock data', 'error');
        throw error; // Re-throw to trigger fallback
    }
}

// Generate mock OCR results for demonstration
function generateMockOCRResults(files) {
    const results = [];
    
    files.forEach((file, index) => {
        // Create mock key-value pairs based on file type
        const keyValuePairs = [];
        const fileType = file.name.split('.').pop().toLowerCase();
        
        if (fileType === 'pdf') {
            keyValuePairs.push(
                { key: "Document Type", value: "Medical Report" },
                { key: "Patient Name", value: "John Doe" },
                { key: "Date", value: "2023-10-15" },
                { key: "Doctor", value: "Dr. Smith" },
                { key: "Diagnosis", value: "Routine Checkup" },
                { key: "Prescription", value: "Vitamin D 1000 IU daily" }
            );
        } else if (fileType === 'jpg' || fileType === 'jpeg') {
            keyValuePairs.push(
                { key: "Image Type", value: "Lab Results" },
                { key: "Test Name", value: "Blood Panel" },
                { key: "Glucose", value: "95 mg/dL" },
                { key: "Cholesterol", value: "180 mg/dL" },
                { key: "HDL", value: "55 mg/dL" },
                { key: "LDL", value: "110 mg/dL" }
            );
        } else {
            keyValuePairs.push(
                { key: "File Type", value: file.type },
                { key: "File Size", value: formatFileSize(file.size) },
                { key: "Upload Date", value: new Date().toLocaleDateString() },
                { key: "Status", value: "Processed" }
            );
        }
        
        results.push({
            fileName: file.name,
            fileType: fileType,
            keyValuePairs: keyValuePairs,
            fullText: `This is a simulated OCR result for ${file.name}.\n\n` +
                     keyValuePairs.map(pair => `${pair.key}: ${pair.value}`).join('\n') +
                     `\n\nAdditional text content would appear here in a real OCR implementation.`
        });
    });
    
    return results;
}

// Display OCR results in the dashboard
function displayOCRResults(results) {
    const summaryContainer = document.getElementById('ocrSummary');
    const fullTextContainer = document.getElementById('ocrFullText');
    
    if (!summaryContainer || !fullTextContainer) return;
    
    if (results.length === 0) {
        summaryContainer.innerHTML = '<div class="no-results">No results to display</div>';
        fullTextContainer.innerHTML = '<div class="no-results">No text extracted</div>';
        return;
    }
    
    // Display results for the first file (in a real app, you might show all)
    const result = results[0];
    
    // Display key-value pairs with animation
    if (result.keyValuePairs && result.keyValuePairs.length > 0) {
        let summaryHTML = '';
        result.keyValuePairs.forEach((pair, index) => {
            summaryHTML += `
                <div class="key-value-pair" style="animation: fadeInUp 0.3s ease forwards; animation-delay: ${index * 0.1}s; opacity: 0;">
                    <span class="key">${pair.key}:</span>
                    <span class="value">${pair.value}</span>
                </div>
            `;
        });
        summaryContainer.innerHTML = summaryHTML;
    } else {
        summaryContainer.innerHTML = '<div class="no-results">No key-value pairs extracted</div>';
    }
    
    // Display full text with animation
    if (result.fullText) {
        fullTextContainer.textContent = result.fullText;
        fullTextContainer.style.opacity = '0';
        fullTextContainer.style.transform = 'translateY(20px)';
        fullTextContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Trigger animation after a short delay
        setTimeout(() => {
            fullTextContainer.style.opacity = '1';
            fullTextContainer.style.transform = 'translateY(0)';
        }, 300);
    } else {
        fullTextContainer.innerHTML = '<div class="no-results">No text extracted</div>';
    }
    
    // Generate and display health advice
    displayHealthAdvice(result.keyValuePairs);
    
    // Show success notification
    showNotification(`Successfully processed ${results.length} file(s) with OCR`, 'success');
}

// Generate and display health advice based on key-value pairs
function displayHealthAdvice(keyValuePairs) {
    // Create health advice section if it doesn't exist
    let adviceSection = document.getElementById('healthAdviceSection');
    if (!adviceSection) {
        const ocrSection = document.getElementById('ocrResultsSection');
        if (ocrSection) {
            adviceSection = document.createElement('div');
            adviceSection.id = 'healthAdviceSection';
            adviceSection.className = 'health-form-section animate-section';
            adviceSection.innerHTML = `
                <h3><i class="fas fa-user-md"></i> Health Advice</h3>
                <div id="adviceContent" class="advice-content"></div>
            `;
            ocrSection.appendChild(adviceSection);
        }
    }
    
    if (adviceSection) {
        const adviceContent = document.getElementById('adviceContent');
        const advice = generateHealthAdvice(keyValuePairs);
        adviceContent.innerHTML = advice;
        
        // Add animation to advice items
        setTimeout(() => {
            const adviceItems = adviceContent.querySelectorAll('.advice-item');
            adviceItems.forEach((item, index) => {
                item.style.animation = `fadeInUp 0.4s ease forwards`;
                item.style.animationDelay = `${index * 0.2}s`;
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
            });
        }, 100);
    }
}

// Generate health advice based on medical data
function generateHealthAdvice(keyValuePairs) {
    if (!keyValuePairs || keyValuePairs.length === 0) {
        return '<p class="no-advice">No health advice available based on the extracted data.</p>';
    }
    
    let advice = '<div class="advice-list">';
    const data = {};
    
    // Convert key-value pairs to an object for easier access
    keyValuePairs.forEach(pair => {
        data[pair.key.toLowerCase()] = pair.value.toLowerCase();
    });
    
    // Blood pressure advice
    if (data['blood pressure'] || data['bp']) {
        const bp = data['blood pressure'] || data['bp'];
        advice += generateBloodPressureAdvice(bp);
    }
    
    // Heart rate advice
    if (data['heart rate'] || data['pulse']) {
        const hr = data['heart rate'] || data['pulse'];
        advice += generateHeartRateAdvice(hr);
    }
    
    // Glucose advice
    if (data['glucose'] || data['blood sugar']) {
        const glucose = data['glucose'] || data['blood sugar'];
        advice += generateGlucoseAdvice(glucose);
    }
    
    // Cholesterol advice
    if (data['cholesterol']) {
        const cholesterol = data['cholesterol'];
        advice += generateCholesterolAdvice(cholesterol);
    }
    
    // General wellness advice
    advice += generateGeneralWellnessAdvice();
    
    // Prescription advice
    if (data['prescription'] || data['medication']) {
        advice += generatePrescriptionAdvice();
    }
    
    advice += '</div>';
    return advice;
}

function generateBloodPressureAdvice(bp) {
    let advice = '';
    
    // Try to extract numbers from BP reading
    const numbers = bp.match(/\d+/g);
    if (numbers && numbers.length >= 2) {
        const systolic = parseInt(numbers[0]);
        const diastolic = parseInt(numbers[1]);
        
        if (systolic > 140 || diastolic > 90) {
            advice += `
                <div class="advice-item high-bp">
                    <h4><i class="fas fa-heartbeat"></i> Blood Pressure Concern</h4>
                    <p>Your blood pressure reading (${bp}) is higher than the normal range. Consider:</p>
                    <ul>
                        <li>Reducing sodium intake</li>
                        <li>Exercising regularly</li>
                        <li>Managing stress levels</li>
                        <li>Consulting with your healthcare provider</li>
                    </ul>
                </div>
            `;
        } else if (systolic < 90 || diastolic < 60) {
            advice += `
                <div class="advice-item low-bp">
                    <h4><i class="fas fa-heartbeat"></i> Low Blood Pressure</h4>
                    <p>Your blood pressure reading (${bp}) is lower than the normal range. Consider:</p>
                    <ul>
                        <li>Staying hydrated</li>
                        <li>Standing up slowly from seated positions</li>
                        <li>Eating small, frequent meals</li>
                        <li>Consulting with your healthcare provider</li>
                    </ul>
                </div>
            `;
        } else {
            advice += `
                <div class="advice-item normal-bp">
                    <h4><i class="fas fa-heartbeat"></i> Blood Pressure</h4>
                    <p>Your blood pressure reading (${bp}) is within the normal range. Keep up the good work!</p>
                </div>
            `;
        }
    } else {
        advice += `
            <div class="advice-item">
                <h4><i class="fas fa-heartbeat"></i> Blood Pressure</h4>
                <p>Maintain a healthy diet and regular exercise to support healthy blood pressure levels.</p>
            </div>
        `;
    }
    
    return advice;
}

function generateHeartRateAdvice(hr) {
    let advice = '';
    
    // Try to extract heart rate number
    const hrNumber = hr.match(/\d+/);
    if (hrNumber) {
        const heartRate = parseInt(hrNumber[0]);
        
        if (heartRate > 100) {
            advice += `
                <div class="advice-item high-hr">
                    <h4><i class="fas fa-heart"></i> Heart Rate</h4>
                    <p>Your heart rate (${heartRate} bpm) is elevated. Consider:</p>
                    <ul>
                        <li>Practicing deep breathing exercises</li>
                        <li>Reducing caffeine intake</li>
                        <li>Getting adequate rest</li>
                        <li>Consulting with your healthcare provider if this persists</li>
                    </ul>
                </div>
            `;
        } else if (heartRate < 60) {
            advice += `
                <div class="advice-item low-hr">
                    <h4><i class="fas fa-heart"></i> Heart Rate</h4>
                    <p>Your heart rate (${heartRate} bpm) is lower than normal. If you're not an athlete, consider:</p>
                    <ul>
                        <li>Checking with your doctor</li>
                        <li>Avoiding sudden position changes</li>
                        <li>Staying hydrated</li>
                    </ul>
                </div>
            `;
        } else {
            advice += `
                <div class="advice-item normal-hr">
                    <h4><i class="fas fa-heart"></i> Heart Rate</h4>
                    <p>Your heart rate (${heartRate} bpm) is in the normal range. Good job maintaining cardiovascular health!</p>
                </div>
            `;
        }
    }
    
    return advice;
}

function generateGlucoseAdvice(glucose) {
    let advice = '';
    
    // Try to extract glucose number
    const glucoseNumber = glucose.match(/\d+/);
    if (glucoseNumber) {
        const glucoseLevel = parseInt(glucoseNumber[0]);
        
        if (glucoseLevel > 140) {
            advice += `
                <div class="advice-item high-glucose">
                    <h4><i class="fas fa-tint"></i> Blood Sugar</h4>
                    <p>Your blood sugar level (${glucoseLevel}) is elevated. Consider:</p>
                    <ul>
                        <li>Reducing sugar and refined carbohydrate intake</li>
                        <li>Increasing fiber-rich foods</li>
                        <li>Regular physical activity</li>
                        <li>Consulting with your healthcare provider</li>
                    </ul>
                </div>
            `;
        } else if (glucoseLevel < 70) {
            advice += `
                <div class="advice-item low-glucose">
                    <h4><i class="fas fa-tint"></i> Blood Sugar</h4>
                    <p>Your blood sugar level (${glucoseLevel}) is low. Consider:</p>
                    <ul>
                        <li>Eating a small snack with complex carbohydrates</li>
                        <li>Avoiding skipping meals</li>
                        <li>Monitoring your levels regularly</li>
                    </ul>
                </div>
            `;
        } else {
            advice += `
                <div class="advice-item normal-glucose">
                    <h4><i class="fas fa-tint"></i> Blood Sugar</h4>
                    <p>Your blood sugar level (${glucoseLevel}) is in a healthy range. Maintain your balanced diet!</p>
                </div>
            `;
        }
    }
    
    return advice;
}

function generateCholesterolAdvice(cholesterol) {
    let advice = '';
    
    // Try to extract cholesterol number
    const cholesterolNumber = cholesterol.match(/\d+/);
    if (cholesterolNumber) {
        const cholesterolLevel = parseInt(cholesterolNumber[0]);
        
        if (cholesterolLevel > 200) {
            advice += `
                <div class="advice-item high-chol">
                    <h4><i class="fas fa-heart"></i> Cholesterol</h4>
                    <p>Your cholesterol level (${cholesterolLevel} mg/dL) is elevated. Consider:</p>
                    <ul>
                        <li>Reducing saturated and trans fats</li>
                        <li>Incorporating more omega-3 fatty acids</li>
                        <li>Regular exercise</li>
                        <li>Consulting with your healthcare provider</li>
                    </ul>
                </div>
            `;
        } else {
            advice += `
                <div class="advice-item normal-chol">
                    <h4><i class="fas fa-heart"></i> Cholesterol</h4>
                    <p>Your cholesterol level (${cholesterolLevel} mg/dL) is in a healthy range. Keep maintaining your heart-healthy habits!</p>
                </div>
            `;
        }
    }
    
    return advice;
}

function generateGeneralWellnessAdvice() {
    return `
        <div class="advice-item general">
            <h4><i class="fas fa-star-of-life"></i> General Wellness Tips</h4>
            <ul>
                <li>Stay hydrated by drinking at least 8 glasses of water daily</li>
                <li>Get 7-9 hours of quality sleep each night</li>
                <li>Incorporate a variety of fruits and vegetables into your diet</li>
                <li>Engage in at least 150 minutes of moderate exercise per week</li>
                <li>Practice stress management techniques like meditation or deep breathing</li>
                <li>Schedule regular check-ups with your healthcare provider</li>
            </ul>
        </div>
    `;
}

function generatePrescriptionAdvice() {
    return `
        <div class="advice-item prescription">
            <h4><i class="fas fa-pills"></i> Medication Reminder</h4>
            <p>Always follow your healthcare provider's instructions when taking prescribed medications:</p>
            <ul>
                <li>Take medications at the same time each day</li>
                <li>Never skip doses unless instructed by your doctor</li>
                <li>Store medications properly as directed</li>
                <li>Keep a record of any side effects to discuss with your doctor</li>
                <li>Refill prescriptions before they run out</li>
            </ul>
        </div>
    `;
}

// Load user name from localStorage and update welcome message
function loadUserName() {
    const savedName = localStorage.getItem('userName') || localStorage.getItem('username');
    if (savedName) {
        const welcomeElement = document.querySelector('.dashboard-header h2');
        if (welcomeElement) {
            welcomeElement.textContent = `Welcome back, ${savedName}!`;
        }
    }
}

// Update the displayHealthData function to also update the user name
const originalDisplayHealthData = displayHealthData;
displayHealthData = function() {
    // Call the original function
    originalDisplayHealthData();
    
    // Also update the user name
    loadUserName();
};

// Set up health metrics form submission
function setupHealthMetricsForm() {
    const form = document.getElementById('healthMetricsForm');
    if (form) {
        // Load saved metrics for current user
        loadHealthMetrics();
        
        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const heartBpm = document.getElementById('heartBpm').value;
            const steps = document.getElementById('steps').value;
            const sleepHours = document.getElementById('sleepHours').value;
            const waterGlasses = document.getElementById('waterGlasses').value;
            
            // Save data to localStorage
            saveHealthMetrics({heartBpm, steps, sleepHours, waterGlasses});
            
            // Show success message
            showNotification('Health metrics saved successfully!', 'success');
            
            // Update the stats cards with new values
            updateStatsWithMetrics({heartBpm, steps, sleepHours, waterGlasses});
        });
    }
}

function saveHealthMetrics(data) {
    // Get current user identifier
    const currentUser = localStorage.getItem('username') || 'defaultUser';
    
    // Save to localStorage with user-specific key
    localStorage.setItem(`healthMetrics_${currentUser}`, JSON.stringify(data));
    
    // Also save to general health records for consistency
    let healthRecords = JSON.parse(localStorage.getItem('healthRecords')) || [];
    
    // Add timestamp
    data.timestamp = new Date().toISOString();
    data.id = Date.now();
    
    // Add to records
    healthRecords.push(data);
    
    // Keep only last 30 records
    if (healthRecords.length > 30) {
        healthRecords = healthRecords.slice(-30);
    }
    
    // Save to localStorage
    localStorage.setItem('healthRecords', JSON.stringify(healthRecords));
}

function loadHealthMetrics() {
    // Get current user identifier
    const currentUser = localStorage.getItem('username') || 'defaultUser';
    
    // Load from localStorage with user-specific key
    const savedMetrics = localStorage.getItem(`healthMetrics_${currentUser}`);
    
    if (savedMetrics) {
        const metrics = JSON.parse(savedMetrics);
        
        // Populate form fields
        if (metrics.heartBpm) document.getElementById('heartBpm').value = metrics.heartBpm;
        if (metrics.steps) document.getElementById('steps').value = metrics.steps;
        if (metrics.sleepHours) document.getElementById('sleepHours').value = metrics.sleepHours;
        if (metrics.waterGlasses) document.getElementById('waterGlasses').value = metrics.waterGlasses;
        
        // Update stats cards with loaded values
        updateStatsWithMetrics(metrics);
    }
    // If no saved metrics, form will remain empty for new user
}

function updateStatsWithMetrics(metrics) {
    // Update heart rate card
    if (metrics.heartBpm) {
        const heartValue = document.querySelector('.heart .value');
        if (heartValue) {
            heartValue.innerHTML = `${metrics.heartBpm} <span>bpm</span>`;
        }
    }
    
    // Update steps card
    if (metrics.steps) {
        const stepsValue = document.querySelector('.steps .value');
        if (stepsValue) {
            stepsValue.innerHTML = `${parseInt(metrics.steps).toLocaleString()} <span>/10,000</span>`;
            
            // Update progress bar
            const progress = Math.min(parseInt(metrics.steps) / 10000, 1);
            const progressBar = document.querySelector('.steps-progress');
            if (progressBar) {
                progressBar.style.transform = `scaleX(${progress})`;
            }
        }
    }
    
    // Update sleep card
    if (metrics.sleepHours) {
        const sleepValue = document.querySelector('.sleep .value');
        if (sleepValue) {
            sleepValue.innerHTML = `${metrics.sleepHours} <span>hrs</span>`;
            
            // Update progress bar (assuming 8 hours is the goal)
            const progress = Math.min(parseFloat(metrics.sleepHours) / 8, 1);
            const progressBar = document.querySelector('.sleep-progress');
            if (progressBar) {
                progressBar.style.transform = `scaleX(${progress})`;
            }
        }
    }
    
    // Update water card
    if (metrics.waterGlasses) {
        const waterValue = document.querySelector('.water .value');
        if (waterValue) {
            waterValue.innerHTML = `${metrics.waterGlasses} <span>/8 glasses</span>`;
            
            // Update progress bar (assuming 8 glasses is the goal)
            const progress = Math.min(parseInt(metrics.waterGlasses) / 8, 1);
            const progressBar = document.querySelector('.water-progress');
            if (progressBar) {
                progressBar.style.transform = `scaleX(${progress})`;
            }
        }
    }
}

function clearUserHealthData() {
    // Clear user-specific health metrics
    const currentUser = localStorage.getItem('username') || 'defaultUser';
    localStorage.removeItem(`healthMetrics_${currentUser}`);
    
    // Reset form fields
    const form = document.getElementById('healthMetricsForm');
    if (form) {
        form.reset();
    }
    
    // Reset stats cards to default values
    resetStatsToDefault();
}

function resetStatsToDefault() {
    // Reset heart rate card
    const heartValue = document.querySelector('.heart .value');
    if (heartValue) {
        heartValue.innerHTML = '72 <span>bpm</span>';
    }
    
    // Reset steps card
    const stepsValue = document.querySelector('.steps .value');
    if (stepsValue) {
        stepsValue.innerHTML = '8,432 <span>/10,000</span>';
    }
    
    // Reset sleep card
    const sleepValue = document.querySelector('.sleep .value');
    if (sleepValue) {
        sleepValue.innerHTML = '7.2 <span>hrs</span>';
    }
    
    // Reset water card
    const waterValue = document.querySelector('.water .value');
    if (waterValue) {
        waterValue.innerHTML = '6 <span>/8 glasses</span>';
    }
    
    // Reset progress bars
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        if (bar.classList.contains('heart-progress')) {
            bar.style.transform = 'scaleX(0.72)'; // 72% for 72 bpm (assuming 100 bpm max)
        } else if (bar.classList.contains('steps-progress')) {
            bar.style.transform = 'scaleX(0.8432)'; // 84.32% for 8432 steps
        } else if (bar.classList.contains('sleep-progress')) {
            bar.style.transform = 'scaleX(0.9)'; // 90% for 7.2 hours (8 hours goal)
        } else if (bar.classList.contains('water-progress')) {
            bar.style.transform = 'scaleX(0.75)'; // 75% for 6 glasses (8 glasses goal)
        }
    });
}
