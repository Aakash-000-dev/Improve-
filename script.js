"use strict";

// =====================================================
// ROUTINE TRACKER
// script.js
// Part 1
// Global Variables, DOM References & Utilities
// =====================================================

// ---------------------------
// Current Date
// ---------------------------

const today = new Date();

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDate = formatDate(today);

// ---------------------------
// Daily Data
// ---------------------------

let objectives = [];
let checkpoints = [];
let savedDates = [];

// ---------------------------
// DOM Elements
// ---------------------------

const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");

const objectivesList =
    document.getElementById("objectivesList");

const checkpointsList =
    document.getElementById("checkpointsList");

const notes =
    document.getElementById("notes");

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");

const charCount =
    document.getElementById("charCount");

const todayDate =
    document.getElementById("todayDate");

const appVersion =
    document.getElementById("appVersion");
    
const openSidebar =
    document.getElementById("openSidebar");

const planPage = 
    document.getElementById("planPlan");



// ---------------------------
// Safety Check
// ---------------------------

const requiredElements = [
    calendar,
    monthYear,
    objectivesList,
    checkpointsList,
    notes,
    progressBar,
    progressText,
    charCount,
    todayDate
];

if (requiredElements.includes(null)) {

    console.error(
        "One or more required HTML elements are missing."
    );

}

// ---------------------------
// Utility Functions
// ---------------------------


// Convert Date -> YYYY-MM-DD

function formatDate(date) {

    const year = date.getFullYear();

    const month =
        String(date.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(date.getDate())
            .padStart(2, "0");

    return `${year}-${month}-${day}`;

}

// Returns true if date contains saved data

function isSavedDate(date) {

    return savedDates.includes(date);

}



function Today() {
    const today = newDate();

    const todayString = today.getFullYear()+ 
                    "-" + String(today.getMonth()+ 1).padStart+(2,"0")+"-"+
                    String(today.getDate()).padStart(2,"0");

    return dateString === todayString
}

const locked = selectedDate !== todayDate

function block(){
    blockOverlay.style.display ="block"

}

if(locked) {
    block
}

// Today's Date Header

todayDate.textContent =
    today.toLocaleDateString(
        "en-IN",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

// ---------------------------
// Error Logger
// ---------------------------

function logError(title, error) {

    console.error(title);

    console.error(error);

}

// ---------------------------
// Async Wrapper
// ---------------------------

async function safeExecute(callback) {

    try {

        await callback();

    }

    catch (error) {

        logError(
            "Application Error:",
            error
        );

    }

}

//startup







// =====================================================
// PART 2
// Calendar System
// =====================================================



// ---------------------------
// Render Calendar
// ---------------------------

function renderCalendar() {

    calendar.innerHTML = "";

    const firstDay =
        new Date(currentYear, currentMonth, 1).getDay();

    const daysInMonth =
        new Date(currentYear, currentMonth + 1, 0).getDate();

    monthYear.textContent =
        new Date(currentYear, currentMonth)
            .toLocaleString("default", {
                month: "long",
                year: "numeric"
            });

    // Empty cells before first day

    for (let i = 0; i < firstDay; i++) {

        const emptyCell =
            document.createElement("div");

        emptyCell.className = "empty";

        calendar.appendChild(emptyCell);

    }

    // Calendar Days

    for (let day = 1; day <= daysInMonth; day++) {

        const cell =
            document.createElement("div");

        cell.className = "day";

        cell.textContent = day;

        const dateString =
            formatDate(
                new Date(
                    currentYear,
                    currentMonth,
                    day
                )
            );

        // Today

        if (dateString === formatDate(today)) {

            cell.classList.add("today");

        }

        // Selected Date

        if (dateString === selectedDate) {

            cell.classList.add("selected");

        }

        // Saved Date

        if (isSavedDate(dateString)) {

            cell.classList.add("saved");

        }

        // Click Event

        cell.addEventListener(
            "click",
            async () => {

                selectedDate = dateString;

                await loadDay();

                renderCalendar();

            }
        );

        calendar.appendChild(cell);

    }

}

// ---------------------------
// Previous Month
// ---------------------------

function previousMonth() {

    currentMonth--;

    if (currentMonth < 0) {

        currentMonth = 11;

        currentYear--;

    }

    renderCalendar();

}

// ---------------------------
// Next Month
// ---------------------------

function nextMonth() {

    currentMonth++;

    if (currentMonth > 11) {

        currentMonth = 0;

        currentYear++;

    }

    renderCalendar();

}

// ---------------------------
// Go To Today
// ---------------------------

async function goToToday() {

    currentMonth = today.getMonth();

    currentYear = today.getFullYear();

    selectedDate = formatDate(today);

    await loadDay();

    renderCalendar();

}

// ---------------------------
// Calendar Events
// ---------------------------

const prevButton =
    document.getElementById("prevMonth");

const nextButton =
    document.getElementById("nextMonth");

if (prevButton) {

    prevButton.addEventListener(
        "click",
        previousMonth
    );

}

if (nextButton) {

    nextButton.addEventListener(
        "click",
        nextMonth
    );

}

// Double click month name
// instantly returns to today

if (monthYear) {

    monthYear.addEventListener(
        "dblclick",
        goToToday
    );

}


//sidebar open

//close sidebar

const pagebtn =
    document.getElementById("page1");

function Open() {
    mainPage.style.display = "none",
    about.style.display = "block",
    devpage.style.display = "none"
    

}

if (pagebtn) {
    pagebtn.addEventListener(
        "click",Open
    );
}

const closebtn =
    document.getElementById("close1");

function Close() {
    mainPage.style.display = "block",
    about.style.display = "none",
    devpage.style.display = "none"
    

}

if (closebtn) {
    closebtn.addEventListener(
        "click",Close
    );
}


const devbtn =
    document.getElementById("devbtn");

function dev() {
    mainPage.style.display = "none",
    devpage.style.display = "block",
    about.style.display = "none"
    

}

if (devbtn) {
    devbtn.addEventListener(
        "click",dev
    );
}

const cldevbtn =
    document.getElementById("cldevbtn");

function cldev() {
    mainPage.style.display = "block",
    devpage.style.display = "none",
    about.style.display = "none"
    

}

if (cldevbtn) {
    cldevbtn.addEventListener(
        "click",cldev
    );
}

//plan page


// // =====================================================
// PART 3
// Objectives Manager
// =====================================================

// Add Objective Button

const addObjectiveButton =
    document.getElementById("addObjective");

if (addObjectiveButton) {

    addObjectiveButton.addEventListener(
        "click",
        addObjective
    );

}

// ---------------------------
// Add Objective
// ---------------------------

async function addObjective() {

    const text = await showInputDialog("Add Objective");

    if (text === null) return;

    const value = text.trim();

    if (value === "") return;

    objectives.push({
        text: value,
        completed: false
    });

    renderObjectives();
    showInputDialog()
    updateProgress();

    await saveDay();

}
// =====================================
// Custom Input Dialog
// =====================================

function showInputDialog(title, defaultValue = "") {

    return new Promise((resolve) => {

        const modal = document.getElementById("inputModal");
        const input = document.getElementById("modalInput");
        const titleElement = document.getElementById("modalTitle");
        const saveBtn = document.getElementById("modalSave");
        const cancelBtn = document.getElementById("modalCancel");

        titleElement.textContent = title;
        input.value = defaultValue;

        modal.classList.add("show");

        input.focus();
        input.select();

        function close(value) {

            modal.classList.remove("show");

            saveBtn.removeEventListener("click", save);
            cancelBtn.removeEventListener("click", cancel);

            input.removeEventListener("keydown", keyHandler);

            resolve(value);

        }

        function save() {

            close(input.value.trim());

        }

        function cancel() {

            close(null);

        }

        function keyHandler(event) {

            if (event.key === "Enter") {

                save();

            }

            if (event.key === "Escape") {

                cancel();

            }

        }

        saveBtn.addEventListener("click", save);

        cancelBtn.addEventListener("click", cancel);

        input.addEventListener("keydown", keyHandler);

    });

}
// ---------------------------
// Render Objectives
// ---------------------------

function renderObjectives() {

    objectivesList.innerHTML = "";

    if (objectives.length === 0) {

        objectivesList.innerHTML = `
            <div class="emptyMessage">
                No objectives added.
            </div>
        `;

        return;

    }

    objectives.forEach(
        (objective, index) => {

            const row =
                document.createElement("div");

            row.className =
                "taskRow";

            // Checkbox

            const checkbox =
                document.createElement("input");

            checkbox.type = "checkbox";

            checkbox.checked =
                objective.completed;

            checkbox.style = "float: center";

            checkbox.addEventListener(
                "change",
                async () => {

                    objective.completed =
                        checkbox.checked;

                    updateProgress();

                    await saveDay();

                }
            );

            // Text

            const text =
                document.createElement("span");

            text.textContent =
                objective.text;

            if (objective.completed) {

                text.style.textDecoration =
                    "line-through";

                text.style.opacity =
                    "0.6";

            }

            // Edit Button

            const editBtn =
                document.createElement("button");

            editBtn.type = "button";

            editBtn.textContent = "✏";

            editBtn.title =
                "Edit";

            editBtn.addEventListener(
                "click",
                () => {

                    editObjective(index);

                }
            );

            // Delete Button

            const deleteBtn =
                document.createElement("button");

            deleteBtn.type = "button";

            deleteBtn.textContent = "🗑";

            deleteBtn.title =
                "Delete";

            deleteBtn.addEventListener(
                "click",
                async () => {

                    if (
                        !confirm(
                            "Delete this objective?"
                        )
                    ) return;

                    objectives.splice(
                        index,
                        1
                    );

                    renderObjectives();

                    updateProgress();

                    await saveDay();

                }
            );

            row.appendChild(
                checkbox
            );

            row.appendChild(
                text
            );

            row.appendChild(
                editBtn
            );

            row.appendChild(
                deleteBtn
            );

            objectivesList.appendChild(
                row
            );

        }
    );

}

// ---------------------------
// Edit Objective
// ---------------------------

async function editObjective(index) {

    const value = await showInputDialog(
    "Edit Objective",
    objectives[index].text
);

    if (value === null) return;

    const text =
        value.trim();

    if (text === "") return;

    objectives[index].text =
        text;

    renderObjectives();
    showInputDialog()
    updateProgress();

    await saveDay();

}
// =====================================================
// PART 4
// Checkpoints Manager
// =====================================================

// Add Checkpoint Button

const addCheckpointButton =
    document.getElementById("addCheckpoint");

if (addCheckpointButton) {

    addCheckpointButton.addEventListener(
        "click",
        addCheckpoint
    );

}

// ---------------------------
// Add Checkpoint
// ---------------------------

async function addCheckpoint() {

    const text = await showInputDialog("Add Checkpoint");

    if (text === null) return;

    const value =
        text.trim();

    if (value === "") return;

    checkpoints.push({

        text: value,

        completed: false

    });

    renderCheckpoints();
    showInputDialog()
    updateProgress();

    await saveDay();

}

// ---------------------------
// Render Checkpoints
// ---------------------------

function renderCheckpoints() {

    checkpointsList.innerHTML = "";

    if (checkpoints.length === 0) {

        checkpointsList.innerHTML = `

            <div class="emptyMessage">

                No checkpoints added.

            </div>

        `;

        return;

    }

    checkpoints.forEach(

        (checkpoint, index) => {

            const row =
                document.createElement("div");

            row.className =
                "taskRow";

            // Checkbox

            const checkbox =
                document.createElement("input");

            checkbox.type = "checkbox";

            checkbox.checked =
                checkpoint.completed;

            checkbox.addEventListener(

                "change",

                async () => {

                    checkpoint.completed =
                        checkbox.checked;

                    updateProgress();

                    await saveDay();

                }

            );

            // Text

            const text =
                document.createElement("span");

            text.textContent =
                checkpoint.text;

            if (checkpoint.completed) {

                text.style.textDecoration =
                    "line-through";

                text.style.opacity =
                    "0.6";

                text.style = "gap: 10px , color: grey , font-size:18px";

            }

            // Edit Button

            const editBtn =
                document.createElement("button");

            editBtn.type = "button";

            editBtn.textContent = "✏";

            editBtn.title = "Edit";

            editBtn.style = "gap: 12px";

            editBtn.addEventListener(

                "click",

                () => {

                    editCheckpoint(index);

                }

            );

            // Delete Button

            const deleteBtn =
                document.createElement("button");

            deleteBtn.type = "button";

            deleteBtn.textContent = "🗑";

            deleteBtn.title = "Delete";

            deleteBtn.addEventListener(

                "click",

                async () => {

                    if (
                        !confirm(
                            "Delete this checkpoint?"
                        )
                    ) return;

                    checkpoints.splice(
                        index,
                        1
                    );

                    renderCheckpoints();

                    updateProgress();

                    await saveDay();

                }

            );

            row.appendChild(
                checkbox
            );

            row.appendChild(
                text
            );

            row.appendChild(
                editBtn
            );

            row.appendChild(
                deleteBtn
            );

            checkpointsList.appendChild(
                row
            );

        }

    );

}

// ---------------------------
// Edit Checkpoint
// ---------------------------

async function editCheckpoint(index) {

   const value = await showInputDialog(
    "Edit Checkpoint",
    checkpoints[index].text
);

    if (value === null) return;

    const text =
        value.trim();

    if (text === "") return;

    checkpoints[index].text =
        text;

    renderCheckpoints();
    showInputDialog()
    updateProgress();

    await saveDay();

}
// =====================================================
// PART 5
// Database & Notes
// =====================================================

// ---------------------------
// Load Saved Dates
// ---------------------------

async function loadSavedDates() {

    try {

        const dates =
            await window.api.getSavedDates();

        if (Array.isArray(dates)) {

            savedDates = dates;

        }
        else {

            savedDates = [];

        }

    }
    catch (error) {

        console.error(error);

        savedDates = [];

    }

}

// ---------------------------
// Load Selected Day
// ---------------------------

async function loadDay() {

    try {

        const data =
            await window.api.loadDay(
                selectedDate
            );

        if (data) {

            objectives =
                Array.isArray(data.objectives) && data.objectives.length>0
                ?data.objectives:[
                    {
                        text:"No distraction",
                        completed:false,
                    },
                    {
                        text:"Don't postpone",
                        completed:false,
                    },
                    {
                        text:"Finish once started",
                        completed:false
                    },
                    {
                        text:"Be happy",
                        completed:false
                    }
                ];

            checkpoints =
                Array.isArray(data.checkpoints) && data.checkpoints.length>0
                ?data.checkpoints:[
                    {
                        text:"Wake up early",
                        completed:false,
                    },
                    {
                        text:"Workout",
                        completed:false,
                    },
                    {
                        text:"Study",
                        completed:false
                    },
                    {
                        text:"Learn something new",
                        completed:false
                    },
                    { 
                        text:"Sit in nature",
                        completed:false,
                    },
                    {
                        text:"Work",
                        completed:false,
                    },
                    {
                        text:"Read 10 pages of a book",
                        completed:false,
                    },
                    {
                        text:"Plan your day",
                        completed:false
                    }
                ];
            notes.value =
                data.notes || "";

        }
        else {

            objectives = [];

            checkpoints =[];

            notes.value = "";

        }

        renderObjectives();

        renderCheckpoints();

        updateProgress();

        updateCharacterCount();
        updatePageReadOnly();

    }
    catch (error) {

        console.error(error);

    }

}

// ---------------------------
// Save Current Day
// ---------------------------

async function saveDay() {

    try {

        const data = {

            objectives,

            checkpoints,

            notes: notes.value

        };

        await window.api.saveDay(

            selectedDate,

            data

        );

        await loadSavedDates();

        renderCalendar();

    }
    catch (error) {

        console.error(error);

    }

}

// ---------------------------
// Character Counter
// ---------------------------

function updateCharacterCount() {

    charCount.textContent =
        notes.value.length;

}

// ---------------------------
// Notes Auto Save
// ---------------------------

let notesTimer = null;

notes.addEventListener(

    "input",

    () => {

        updateCharacterCount();

        clearTimeout(
            notesTimer
        );

        notesTimer =
            setTimeout(

                async () => {

                    await saveDay();

                },

                500

            );

    }

);

// ---------------------------
// Ctrl + S
// ---------------------------

document.addEventListener(

    "keydown",

    async (event) => {

        if (

            event.ctrlKey &&

            event.key.toLowerCase() === "s"

        ) {

            event.preventDefault();

            await saveDay();

        }

    }

);

// ---------------------------
// Load Version
// ---------------------------

async function loadVersion() {

    if (

        !window.api ||

        !window.api.getVersion

    ) return;

    try {

        const version =
            await window.api.getVersion();

        appVersion.textContent =
            "Version " + version;

    }
    catch (error) {

        console.error(error);

    }

}


// =====================================================
// PART 6
// Progress, Initialization & Startup
// =====================================================

// ---------------------------
// Progress
// ---------------------------

function updateProgress() {

    const total =
        objectives.length +
        checkpoints.length;

    if (total === 0) {

        progressBar.value = 0;
        progressText.textContent = "0%";

        return;

    }

    let completed = 0;

    objectives.forEach(objective => {

        if (objective.completed) {

            completed++;

        }

    });

    checkpoints.forEach(checkpoint => {

        if (checkpoint.completed) {

            completed++;

        }

    });

    const percent =
        Math.round(
            (completed / total) * 100
        );

    progressBar.value = percent;

    progressText.textContent =
        percent + "%";

}

// ---------------------------
// Clear Current Day
// ---------------------------

async function clearCurrentDay() {

    if (
        !confirm(
            "Clear today's data?"
        )
    ) return;

    objectives = [];
    checkpoints = [];
    notes.value = "";

    renderObjectives();

    renderCheckpoints();

    updateCharacterCount();

    updateProgress();

    await saveDay();

}

// ---------------------------
// Refresh Screen
// ---------------------------

async function refreshScreen() {

    await loadSavedDates();

    await loadDay();

    renderCalendar();

}

// ---------------------------
// Escape Key
// ---------------------------

document.addEventListener(

    "keydown",

    async event => {

        if (event.key === "Escape") {

            await refreshScreen();

        }

    }

);

// ---------------------------
// Window Focus
// ---------------------------

window.addEventListener(

    "focus",

    async () => {

        await loadSavedDates();

        renderCalendar();



    }

);

// ---------------------------
// Startup
// ---------------------------

async function initializeApp() {

    try {

        await loadVersion();

        await loadSavedDates();

        await loadDay();

        renderCalendar();

        updateProgress();

        updateCharacterCount();

        updatePageReadOnly();

        console.log(
            "Improve started"
        );

    }
    catch (error) {

        console.error(
            "Initialization Error:",
            error
        );

    }

}

// ---------------------------
// Global Error Handler
// ---------------------------

window.addEventListener(

    "error",

    event => {

        console.error(
            "Unhandled Error:",
            event.error
        );

    }

);

window.addEventListener(

    "unhandledrejection",

    event => {

        console.error(
            "Promise Rejection:",
            event.reason
        );

    }

);

// ---------------------------
// Start Application
// ---------------------------

initializeApp();