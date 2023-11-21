document.addEventListener('DOMContentLoaded', function () {
    const commandLine = document.getElementById('command-line');
    const inventoryCommandLine = document.getElementById('inventory-command-line');
    const consoleDisplay = document.getElementById('console-display');
    const inventoryDisplay = document.getElementById('inventory-display');
    const inventoryTerminal = document.getElementById('inventory-terminal');
    let isMenuConfirmationPending = false;

    commandLine.addEventListener('keydown', handleCommand);
    inventoryCommandLine.addEventListener('keydown', handleInventoryCommand);

    // Display the initial welcome message
    showStartScreen();

    // Automatically focus on the command line when the page loads
    commandLine.focus();

    // Use keydown event for processing commands
    document.addEventListener('keydown', function (event) {
        if (!isInventoryTerminalOpen) {
            // Process commands when Enter key is pressed
            if (event.key === 'Enter') {
                handleCommandEnter();
            }
        } else {
            // Process inventory commands when Enter key is pressed
            if (event.key === 'Enter') {
                handleInventoryCommandEnter();
            }
        }
    });

    function handleCommand(event) {
        if (event.key === 'Enter') {
            const command = commandLine.value.toLowerCase();
            commandLine.value = ''; // Clear the input after processing

            if (isMenuConfirmationPending) {
                // Check for confirmation after the user has typed 'menu'
                handleMenuConfirmation(command);
                return;
            }

            switch (command) {
                case 'start':
                    startGame();
                    break;
                case 'options':
                    showOptionsScreen();
                    break;
                case 'menu':
                    askForMenuConfirmation();
                    break;
                case 'inventory':
                    openInventoryTerminal();
                    break;
                default:
                    displayMessage(`Unknown command: ${command}`);
            }
        }
    }

    function handleInventoryCommand(event) {
        if (event.key === 'Enter') {
            const command = inventoryCommandLine.value.toLowerCase();
            inventoryCommandLine.value = ''; // Clear the input after processing

            switch (command) {
                case 'exit':
                    closeInventoryTerminal();
                    break;
                case 'select item':
                    // Placeholder for item selection logic
                    displayInventoryMessage('You selected an item. Type "use" or "drop".');
                    break;
                default:
                    displayInventoryMessage(`Unknown command: ${command}`);
            }
        }
    }

    function openInventoryTerminal() {
        isInventoryTerminalOpen = true;
        
        // Clear the content of the inventory display
        inventoryDisplay.innerHTML = '';
    
        inventoryTerminal.style.display = 'block';
        displayInventoryMessage('Welcome to your inventory!');
        // Placeholder for displaying inventory items
    }

    function closeInventoryTerminal() {
        isInventoryTerminalOpen = false;
        inventoryTerminal.style.display = 'none';
        // Optionally, clear the content of the inventory display
        inventoryDisplay.innerHTML = '';
    }

    function displayMessage(message) {
        consoleDisplay.innerHTML += `<p>${message}</p>`;
    }

    function displayInventoryMessage(message) {
        inventoryDisplay.innerHTML += `<p>${message}</p>`;
    }

    function showStartScreen() {
        consoleDisplay.innerHTML = `
            <p>Welcome to cRPG!</p>
            <p>Type 'start' to begin your journey.</p>
            <p>Type 'options' to adjust your settings.</p>
        `;
    }

    function startGame() {
        // Clear the main menu text
        consoleDisplay.innerHTML = '';
    
        // Display the "preparing game" text or other relevant information
        displayMessage('Preparing game...');
    
        // Add additional logic as needed for your game's initialization
    }

    function showOptionsScreen() {
        // Placeholder for options screen logic
        displayMessage('Options: Option 1, Option 2, Option 3');
    }

    function askForMenuConfirmation() {
        isMenuConfirmationPending = true;
        displayMessage('Are you sure you want to go back to the menu? Type "yes" to confirm or "cancel" to cancel.');
    }

    function handleMenuConfirmation(command) {
        if (command === 'yes') {
            // Implement the logic to go back to the menu
            showStartScreen();
            displayMessage('You are now back at the menu.');
        } else if (command === 'cancel') {
            displayMessage('Menu navigation canceled.');
        } else {
            displayMessage('Invalid command. Type "yes" to confirm or "cancel" to cancel.');
            return; // Don't reset isMenuConfirmationPending if the command is invalid
        }
    
        isMenuConfirmationPending = false;
    }
});
