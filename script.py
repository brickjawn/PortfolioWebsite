# Let me create a comprehensive ROT13 implementation plan and sample code for Anthony's portfolio

rot13_implementation = """
# ROT13 Encoder/Decoder Implementation Plan for Anthony's Cybersecurity Portfolio

## Core Functionality
- Real-time encoding/decoding as user types
- Supports uppercase and lowercase letters
- Preserves numbers, symbols, and whitespace
- Copy to clipboard functionality
- Clear/reset buttons
- Character count display

## Technical Implementation
"""

# Create a sample JavaScript ROT13 function with enhanced features
javascript_code = """
class ROT13Tool {
    constructor() {
        this.initializeElements();
        this.bindEvents();
    }
    
    initializeElements() {
        this.inputField = document.getElementById('rot13-input');
        this.outputField = document.getElementById('rot13-output');
        this.charCount = document.getElementById('char-count');
        this.copyBtn = document.getElementById('copy-btn');
        this.clearBtn = document.getElementById('clear-btn');
        this.swapBtn = document.getElementById('swap-btn');
    }
    
    bindEvents() {
        this.inputField.addEventListener('input', () => this.encode());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.clearBtn.addEventListener('click', () => this.clearFields());
        this.swapBtn.addEventListener('click', () => this.swapFields());
    }
    
    rot13Transform(text) {
        return text.replace(/[A-Za-z]/g, (char) => {
            const start = char <= 'Z' ? 65 : 97; // ASCII 'A' or 'a'
            return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
        });
    }
    
    encode() {
        const inputText = this.inputField.value;
        const encodedText = this.rot13Transform(inputText);
        this.outputField.value = encodedText;
        this.updateCharCount(inputText.length);
    }
    
    updateCharCount(count) {
        this.charCount.textContent = `${count} characters`;
    }
    
    async copyToClipboard() {
        try {
            await navigator.clipboard.writeText(this.outputField.value);
            this.showNotification('Copied to clipboard!');
        } catch (err) {
            // Fallback for older browsers
            this.outputField.select();
            document.execCommand('copy');
            this.showNotification('Copied to clipboard!');
        }
    }
    
    clearFields() {
        this.inputField.value = '';
        this.outputField.value = '';
        this.updateCharCount(0);
    }
    
    swapFields() {
        const temp = this.inputField.value;
        this.inputField.value = this.outputField.value;
        this.outputField.value = temp;
        this.encode();
    }
    
    showNotification(message) {
        // Create floating notification
        const notification = document.createElement('div');
        notification.className = 'rot13-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ROT13Tool();
});
"""

# Create CSS styling for dark theme
css_styles = """
/* ROT13 Tool Styling - Dark Cybersecurity Theme */
.rot13-section {
    background: linear-gradient(135deg, #1b1b1b 0%, #242424 100%);
    border: 1px solid #333;
    border-radius: 12px;
    padding: 2rem;
    margin: 2rem 0;
    box-shadow: 0 8px 32px rgba(0, 212, 255, 0.1);
}

.rot13-header {
    text-align: center;
    margin-bottom: 2rem;
}

.rot13-title {
    color: #00d4ff;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
}

.rot13-subtitle {
    color: #e0e0e0;
    font-size: 1rem;
    opacity: 0.8;
}

.rot13-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 1.5rem;
}

.rot13-field {
    display: flex;
    flex-direction: column;
}

.rot13-label {
    color: #00ff88;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.rot13-textarea {
    background: #1a1a1a;
    border: 2px solid #333;
    border-radius: 8px;
    color: #e0e0e0;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    height: 150px;
    padding: 1rem;
    resize: vertical;
    transition: border-color 0.3s ease;
}

.rot13-textarea:focus {
    outline: none;
    border-color: #00d4ff;
    box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
}

.rot13-controls {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.rot13-btn {
    background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
    border: none;
    border-radius: 6px;
    color: #000;
    cursor: pointer;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.rot13-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 212, 255, 0.4);
}

.rot13-btn.secondary {
    background: linear-gradient(135deg, #333 0%, #444 100%);
    color: #e0e0e0;
}

.rot13-btn.secondary:hover {
    background: linear-gradient(135deg, #444 0%, #555 100%);
}

.rot13-stats {
    text-align: center;
    color: #999;
    font-size: 0.9rem;
}

.rot13-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #00ff88;
    color: #000;
    padding: 1rem 2rem;
    border-radius: 6px;
    font-weight: 600;
    z-index: 1000;
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .rot13-container {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .rot13-controls {
        flex-wrap: wrap;
    }
    
    .rot13-section {
        padding: 1rem;
        margin: 1rem 0;
    }
}

/* Terminal-style cursor effect */
.rot13-textarea::after {
    content: '_';
    color: #00d4ff;
    animation: blink 1s infinite;
}

@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}
"""

# Create HTML structure
html_structure = """
<!-- ROT13 Encoder/Decoder Section -->
<section class="rot13-section" id="rot13-tool">
    <div class="rot13-header">
        <h2 class="rot13-title">ROT13 Encoder/Decoder</h2>
        <p class="rot13-subtitle">
            Caesar cipher with 13-position alphabet rotation | Cybersecurity training tool
        </p>
    </div>
    
    <div class="rot13-container">
        <div class="rot13-field">
            <label class="rot13-label" for="rot13-input">Input Text</label>
            <textarea 
                id="rot13-input" 
                class="rot13-textarea"
                placeholder="Enter text to encode/decode..."
                autocomplete="off"
                spellcheck="false"
            ></textarea>
        </div>
        
        <div class="rot13-field">
            <label class="rot13-label" for="rot13-output">ROT13 Output</label>
            <textarea 
                id="rot13-output" 
                class="rot13-textarea"
                placeholder="Encoded/decoded text will appear here..."
                readonly
            ></textarea>
        </div>
    </div>
    
    <div class="rot13-controls">
        <button id="copy-btn" class="rot13-btn">
            📋 Copy Output
        </button>
        <button id="swap-btn" class="rot13-btn secondary">
            🔄 Swap Fields
        </button>
        <button id="clear-btn" class="rot13-btn secondary">
            🗑️ Clear All
        </button>
    </div>
    
    <div class="rot13-stats">
        <span id="char-count">0 characters</span>
        <span style="margin: 0 1rem;">•</span>
        <span>ROT13 is self-inverse: encoding twice returns original text</span>
    </div>
</section>
"""

print("ROT13 Implementation Plan:")
print("=" * 50)
print("\n1. JAVASCRIPT FUNCTIONALITY:")
print("- Real-time encoding/decoding")
print("- Copy to clipboard with fallback")
print("- Field swapping capability")
print("- Character counting")
print("- Notification system")

print("\n2. CSS DESIGN FEATURES:")
print("- Dark cybersecurity theme")
print("- Neon blue/cyan accents")
print("- Glassmorphism effects")
print("- Responsive grid layout")
print("- Terminal-style typography")

print("\n3. HTML STRUCTURE:")
print("- Semantic markup")
print("- Accessibility features")
print("- Professional labeling")
print("- Educational context")

print("\n4. INTEGRATION BENEFITS:")
print("- Demonstrates cryptography knowledge")
print("- Interactive portfolio element")
print("- Educational tool for visitors")
print("- Shows JavaScript proficiency")

print("\nImplementation ready for integration into Anthony's portfolio!")