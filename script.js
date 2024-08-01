///this is for the reminder/notes section 
class Reminder {
	constructor(title, description) {
		this.title = title;
		this.description = description;
	}
}

// UI CLASS
class UI {
	addReminderToList(reminder) {
		const table = document.querySelector(".table");
		const tableList = document.createElement("ul");
		tableList.setAttribute("class", "table-list");
		tableList.innerHTML = `
      <li>${reminder.title}</li>
      <li>${reminder.description}</li>
      <li class="icon-list">
         <i class="fa fa-check"></i>
      </li>
     `;

		table.appendChild(tableList);
	}

	clearFields() {
		document.querySelector("#title").value = "";
		document.querySelector("#description").value = "";
	}
}

// LOCAL STORAGE CLASS
class LocalStorage {
	static getDataFromLS() {
		let reminderList;
		if (localStorage.getItem("reminderList") === null) {
			reminderList = [];
		} else {
			reminderList = JSON.parse(localStorage.getItem("reminderList"));
		}

		return reminderList;
	}

	static addReminderListToLS(reminder) {
		const reminders = LocalStorage.getDataFromLS();

		reminders.push(reminder);
		localStorage.setItem("reminderList", JSON.stringify(reminders));
	}

	static addRemindersFromLS() {
		const addReminders = LocalStorage.getDataFromLS();
		addReminders.forEach((addReminder) => {
			const ui = new UI();
			ui.addReminderToList(addReminder);
		});
	}
	// the way reminders get removed
	static deleteReminderFromLS(title) {
		const reminders = LocalStorage.getDataFromLS();

		reminders.forEach((reminder, index) => {
			if (reminder.title === title) {
				reminders.splice(index, 1);
			}
		});

		localStorage.setItem("reminderList", JSON.stringify(reminders));
	}
}

// FORM EVENT LISTENER
const form = document.getElementById("mainForm");

form.addEventListener("submit", function (e) {
	e.preventDefault();

	let [title, description] = [
		document.querySelector("#title").value,
		document.querySelector("#description").value,
	];

	// Instantiate Reminder Class
	const reminder = new Reminder(title, description);

	// Instantiate UI Class
	const ui = new UI();

	ui.addReminderToList(reminder);
	ui.clearFields();
	LocalStorage.addReminderListToLS(reminder);
});

// STATUS EVENT LISTENER
const table = document.querySelector(".table");
table.addEventListener("click", function (e) {
	const target = e.target;
	const title =
		target.parentElement.previousElementSibling.previousElementSibling
			.textContent;
	if (target.className === "fa fa-check") {
		target.parentElement.style.backgroundColor = "#3b3939";
		setTimeout(() => {
			const targetBody = target.parentElement.parentElement;
			targetBody.remove();
		}, 700);
	}
	LocalStorage.deleteReminderFromLS(title);
});

// REFRESH PAGE EVENT
document.addEventListener("DOMContentLoaded", LocalStorage.addRemindersFromLS);

///this is for the calander 

// Define an array to store events
let events = [];

// letiables to store event input fields and reminder list
let eventDateInput =
	document.getElementById("eventDate");
let eventTitleInput =
	document.getElementById("eventTitle");
let eventDescriptionInput =
	document.getElementById("eventDescription");
let eventList =
	document.getElementById("eventList");

// Counter to generate unique event IDs
let eventIdCounter = 1;

// Function to add events
function addEvent() {
	let date = eventDateInput.value;
	let title = eventTitleInput.value;
	let description = eventDescriptionInput.value;

	if (date && title) {
		// Create a unique event ID
		let eventId = eventIdCounter++;

		events.push(
			{
				id: eventId, date: date,
				title: title,
				description: description
			}
		);
		showCalendar(currentMonth, currentYear);
		eventDateInput.value = "";
		eventTitleInput.value = "";
		eventDescriptionInput.value = "";
		displayEvents();
	}
}

// Function to delete an event by ID
function deleteEvent(eventId) {
	// Find the index of the event with the given ID
	let eventIndex =
		events.findIndex((event) =>
			event.id === eventId);

	if (eventIndex !== -1) {
		// Remove the event from the events array
		events.splice(eventIndex, 1);
		showCalendar(currentMonth, currentYear);
		displayEvents();
	}
}

// Function to display reminders
function displayEvents() {
	eventList.innerHTML = "";
	for (let i = 0; i < events.length; i++) {
		let event = events[i];
		let eventDate = new Date(event.date);
		if (eventDate.getMonth() ===
			currentMonth &&
			eventDate.getFullYear() ===
			currentYear) {
			let listItem = document.createElement("li");
			listItem.innerHTML =
				`<strong>${event.title}</strong> - 
			${event.description} on 
			${eventDate.toLocaleDateString()}`;

			// Add a delete button for each event item
			let deleteButton =
				document.createElement("button");
			deleteButton.className = "delete-event";
			deleteButton.textContent = "Delete";
			deleteButton.onclick = function () {
				deleteEvent(event.id);
			};

			listItem.appendChild(deleteButton);
			eventList.appendChild(listItem);
		}
	}
}

// Function to generate a range of 
// years for the year select input
function generate_year_range(start, end) {
	let years = "";
	for (let year = start; year <= end; year++) {
		years += "<option value='" +
			year + "'>" + year + "</option>";
	}
	return years;
}

// Initialize date-related letiables
today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");

createYear = generate_year_range(1970, 2050);

document.getElementById("year").innerHTML = createYear;

let calendar = document.getElementById("calendar");

let months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
let days = [
	"Sun", "Mon", "Tue", "Wed",
	"Thu", "Fri", "Sat"];

$dataHead = "<tr>";
for (dhead in days) {
	$dataHead += "<th data-days='" +
		days[dhead] + "'>" +
		days[dhead] + "</th>";
}
$dataHead += "</tr>";

document.getElementById("thead-month").innerHTML = $dataHead;

monthAndYear =
	document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

// Function to navigate to the next month
function next() {
	currentYear = currentMonth === 11 ?
		currentYear + 1 : currentYear;
	currentMonth = (currentMonth + 1) % 12;
	showCalendar(currentMonth, currentYear);
}

// Function to navigate to the previous month
function previous() {
	currentYear = currentMonth === 0 ?
		currentYear - 1 : currentYear;
	currentMonth = currentMonth === 0 ?
		11 : currentMonth - 1;
	showCalendar(currentMonth, currentYear);
}

// Function to jump to a specific month and year
function jump() {
	currentYear = parseInt(selectYear.value);
	currentMonth = parseInt(selectMonth.value);
	showCalendar(currentMonth, currentYear);
}

// Function to display the calendar
function showCalendar(month, year) {
	let firstDay = new Date(year, month, 1).getDay();
	tbl = document.getElementById("calendar-body");
	tbl.innerHTML = "";
	monthAndYear.innerHTML = months[month] + " " + year;
	selectYear.value = year;
	selectMonth.value = month;

	let date = 1;
	for (let i = 0; i < 6; i++) {
		let row = document.createElement("tr");
		for (let j = 0; j < 7; j++) {
			if (i === 0 && j < firstDay) {
				cell = document.createElement("td");
				cellText = document.createTextNode("");
				cell.appendChild(cellText);
				row.appendChild(cell);
			} else if (date > daysInMonth(month, year)) {
				break;
			} else {
				cell = document.createElement("td");
				cell.setAttribute("data-date", date);
				cell.setAttribute("data-month", month + 1);
				cell.setAttribute("data-year", year);
				cell.setAttribute("data-month_name", months[month]);
				cell.className = "date-picker";
				cell.innerHTML = "<span>" + date + "</span";

				if (
					date === today.getDate() &&
					year === today.getFullYear() &&
					month === today.getMonth()
				) {
					cell.className = "date-picker selected";
				}

				// Check if there are events on this date
				if (hasEventOnDate(date, month, year)) {
					cell.classList.add("event-marker");
					cell.appendChild(
						createEventTooltip(date, month, year)
				);
				}

				row.appendChild(cell);
				date++;
			}
		}
		tbl.appendChild(row);
	}

	displayEvents();
}

// Function to create an event tooltip
function createEventTooltip(date, month, year) {
	let tooltip = document.createElement("div");
	tooltip.className = "event-tooltip";
	let eventsOnDate = getEventsOnDate(date, month, year);
	for (let i = 0; i < eventsOnDate.length; i++) {
		let event = eventsOnDate[i];
		let eventDate = new Date(event.date);
		let eventText = `<strong>${event.title}</strong> - 
			${event.description} on 
			${eventDate.toLocaleDateString()}`;
		let eventElement = document.createElement("p");
		eventElement.innerHTML = eventText;
		tooltip.appendChild(eventElement);
	}
	return tooltip;
}

// Function to get events on a specific date
function getEventsOnDate(date, month, year) {
	return events.filter(function (event) {
		let eventDate = new Date(event.date);
		return (
			eventDate.getDate() === date &&
			eventDate.getMonth() === month &&
			eventDate.getFullYear() === year
		);
	});
}

// Function to check if there are events on a specific date
function hasEventOnDate(date, month, year) {
	return getEventsOnDate(date, month, year).length > 0;
}

// Function to get the number of days in a month
function daysInMonth(iMonth, iYear) {
	return 32 - new Date(iYear, iMonth, 32).getDate();
}

// Call the showCalendar function initially to display the calendar
showCalendar(currentMonth, currentYear);

//this is a Function to save note content to local storage
function saveNote() {
    const content = document.querySelector('.content').innerHTML;
    localStorage.setItem('noteContent', content);
}

// this is a function that loads the note content from local storage
function loadNotes() {
    const savedContent = localStorage.getItem('noteContent');
    if (savedContent) {
        document.querySelector('.content').innerHTML = savedContent;
    }
}

// Load the saved notes when the page loads
window.onload = loadNotes;
