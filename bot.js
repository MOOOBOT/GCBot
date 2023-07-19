
// Setup code

const MESSAGE_DELAY = 1000;
const observer = new MutationObserver(onNewMessage);
let HTMLPolicy;

if (window.trustedTypes) {
	HTMLPolicy = trustedTypes.createPolicy("HTMLPolicy", {
		createHTML: (string) => string,
	});
}

var currentSender = null;

function findButtonAndTextBox() {
	window.bot_sendbutton = document.getElementById("bot_sendbutton");
	window.bot_textbox = document.getElementById("bot_textbox");
	window.bot_messages = document.getElementById("bot_messages");

	if (!window.bot_sendbutton || !window.bot_textbox  || !window.bot_messages) return true;

	return false;
}

function addMessageListener() {
	observer.observe(window.bot_messages, { childList: true });
}

function simulateClick(element) {
	element.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: window }));
	element.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, cancelable: true, view: window }))
}

function sendMessage(messagebody) {
	if (window.trustedTypes) {
		window.bot_textbox.innerHTML = HTMLPolicy.createHTML(messagebody);
	} else {
		window.bot_textbox.innerHTML = messagebody;
	}

	setTimeout(function() {
		window.bot_textbox.focus();
		simulateClick(window.bot_sendbutton);
	}, MESSAGE_DELAY);
}

function readMessage() {
	var result;
	result = window.bot_messages.children[window.bot_messages.children.length - 1].innerText.replaceAll("New", "").replaceAll("Now", "").replaceAll("\nEdited\n", "").split(",\n")[2];
	if (result) {
		currentSender = window.bot_messages.children[window.bot_messages.children.length - 1].innerText.replaceAll("New", "").replaceAll("Now", "").replaceAll("\nEdited\n", "").split(",\n")[0].replaceAll("\n", "");
		return result.replaceAll("\n", "");
	}
	
	result = window.bot_messages.children[window.bot_messages.children.length - 1].innerText.replaceAll("New", "").replaceAll("Now", "").replaceAll("\nEdited\n", "").split(",\n")[0];
	if (result) return result.replaceAll("\n", "");
	
	return false;
}

// Main code

function onNewMessage() {
	// Run on new message
	console.log("Message gotten.");
	if (Array.from(readMessage())[0] != "M") {
		sendMessage("MOoOOoooOoOoOo");
	}
}

function main() {
	// Run on start
	console.log("Bot Started.");
	sendMessage("I am CowBot and I moo a lot");
}

function startBot() {
	if (findButtonAndTextBox()) throw Error("Required elements not found.");
	addMessageListener();
	main();
}

function stopBot() {
	observer.disconnect();
}
