const Database = require("better-sqlite3"); 
const path = require("path");
const fs = require("fs");
const { app } = require("electron");
// ========================== 
// Create data folder 
// ========================== 
const dataFolder = app.getPath("userData");
if (!fs.existsSync(dataFolder)) { 
fs.mkdirSync(dataFolder); 
} 
// ========================== 
// Open Database 
// ========================== 
const dbPath = path.join(
    app.getPath("userData"),
    "routine.db"
);

console.log("Database:", dbPath);
const db = new Database(dbPath); 
// Improve performance 
// db.pragma("journal_mode = WAL");
// ========================== 
// Create Tables 
// ========================== 
db.exec(`
CREATE TABLE IF NOT EXISTS daily_data (
    date TEXT PRIMARY KEY,
    objectives TEXT NOT NULL,
    checkpoints TEXT NOT NULL,
    notes TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`);
db.exec(`
CREATE TABLE IF NOT EXISTS plan(
    plan TEXT PRIMARY KEY CHECK (plan = 1),
    content TEXT DEFAULT '  '
)
`);



// ========================== 
// Save Day 
// ========================== 
 
function saveDay(date, data) { 
 
    try { 
 
        db.prepare(` 
        INSERT INTO daily_data 
 
        (date, objectives, checkpoints, notes) 
 
        VALUES 
 
        (?, ?, ?, ?) 
 
        ON CONFLICT(date) 
 
        DO UPDATE SET 
 
        objectives = excluded.objectives, 
 
        checkpoints = excluded.checkpoints, 
 
        notes = excluded.notes, 
 
        updated_at = CURRENT_TIMESTAMP 
 
        `).run( 
 
            date, 
 
            JSON.stringify(data.objectives || []), 
 
            JSON.stringify(data.checkpoints || []), 
 
            data.notes || "" 
 
        ); 
 
        return { 
            success: true 
        }; 
 
    } catch (err) { 
 
        return { 
 
            success: false, 
 
            error: err.message 
 
        }; 
 
    }
    
    const today = newDate().toISOString().split("T")[0];
    if (date !== today){return{
        success:false,
        message:"locked"}
    };
} 


// ==========================
// save plan
// ==========================

function savePlan(content) {
    const stmt = db.prepare(` 
        INSERT INTO plan (plan,content)
        VALUES(1, ?)
        ON CONFLICT(plan)
        DO UPDATE SET content = exclude.content
 
        `);

    stmt.run(content || "");
    return true;
}


//===========================
//load plan
//===========================

function loadPlan(content) {
    const row = db.prepare(` 
        SELECT content
        FROM plan
        WHERE plan = 1
        `).get();

    return row ? row.content : "";

}

// ========================== 
// Load Day 
// ========================== 
 
function loadDay(date) { 
 
    try { 
 
        const row = db.prepare( 
 
            "SELECT * FROM daily_data WHERE date=?" 
 
        ).get(date); 
 
        if (!row) { 
 
            return { 
 
                objectives: [], 
 
                checkpoints: [], 
 
                notes: "" 
 
            }; 
 
        } 
 
        return { 
 
            objectives: 
 
            JSON.parse(row.objectives), 
 
            checkpoints: 
 
            JSON.parse(row.checkpoints), 
 
            notes: 
 
            row.notes 
 
        }; 
 
    } catch { 
 
        return { 
 
            objectives: [], 
 
            checkpoints: [], 
 
            notes: "" 
 
        }; 
 
    } 
    const ediatable = isToday(selectedDate);

    
    document.querySelectorAll("edit-btn").forEach(
        btn => {btn.disabled = !ediatable;}
    );
    document.querySelectorAll("delete-btn").forEach(
        btn => {btn.disabled = !ediatable;}
    );
    document.querySelectorAll("add-btn").forEach(
        btn => {btn.disabled = !ediatable;}
    );
    document.querySelectorAll("objective-checkbox").forEach(
        btn => {btn.disabled = !ediatable;}
    );

    
} 
 
// ========================== 
// Delete Day 
// ========================== 
 
function deleteDay(date) { 
 
    db.prepare( 
 
        "DELETE FROM daily_data WHERE date=?" 
 
    ).run(date); 
 
    return true; 
 
} 
 
// ========================== 
// Saved Dates 
// ========================== 
 
function getSavedDates() { 
 
    return db.prepare( 
 
        "SELECT date FROM daily_data" 
 
    ).all(); 
 
} 





 
 
// ========================== 
// Export Database 
// ========================== 
 
function exportDatabase() { 
 
    return dbPath; 
 
} 
 
// ========================== 
// Import Database 
// ========================== 
 
function importDatabase() { 
 
    return true; 
 
} 
 
// ========================== 
// Module Exports 
// ========================== 
 
module.exports = { 
saveDay, 
loadDay, 
deleteDay, 
getSavedDates, 
exportDatabase, 
importDatabase 
}; 
