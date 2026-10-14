/* Shared investigation state for the six theatre scenes. */
/* Each flag becomes true when the player discovers one record. */
let foundCancellation = false;
let foundRefunds = false;
let foundTicket = false;
let foundEmployee = false;
let foundProps = false;
let foundNote = false;
let foundLightinglog = false;
let foundProgramme = false;
let hasReadTicketBack = false;

/* Scene, stage and ending progress. */
let currentScene = 'entrance';
let stageStarted = false;
let stageStep = 0;  // 0 = untouched; 5 = reconstruction complete.
let hasReadProgramme = false;
let reportComplete = false;
let connectedFinancial = false;
let connectedStaging = false;
let connectedSeat = false;
let hasSeenFinalBow = false;
let visitedEntrance = true;
let visitedBoxoffice = false;
let visitedBackstage = false;
let visitedControl = false;
let visitedStage = false;
let visitedFinal = false;

/* Called by evidence.js whenever a document is first inspected. */
function markEvidence(name) {
    if (name === 'cancellation') {
        foundCancellation = true;
    } else if (name === 'refunds') {
        foundRefunds = true;
    } else if (name === 'ticket') {
        foundTicket = true;
    } else if (name === 'employee') {
        foundEmployee = true;
    } else if (name === 'props') {
        foundProps = true;
    } else if (name === 'note') {
        foundNote = true;
    } else if (name === 'lightinglog') {
        foundLightinglog = true;
    } else if (name === 'programme') {
        foundProgramme = true;
    }
    updateEvidenceBoard();
    updateConnections();
    updateVisualProgress();
}

/* Update the number and availability of collected evidence. */
function updateEvidenceBoard() {
    let total = 0;
    if (foundCancellation) total++;
    if (foundRefunds) total++;
    if (foundTicket) total++;
    if (foundEmployee) total++;
    if (foundProps) total++;
    if (foundNote) total++;
    if (foundLightinglog) total++;
    if (foundProgramme) total++;

    document.getElementById('evidenceCount').innerHTML = total + '/8';
    document.getElementById('boardProgress').innerHTML = total + ' of 8 records discovered · Not all records are required';
    document.getElementById('board-cancellation').disabled = !foundCancellation;
    document.getElementById('board-refunds').disabled = !foundRefunds;
    document.getElementById('board-ticket').disabled = !foundTicket;
    document.getElementById('board-employee').disabled = !foundEmployee;
    document.getElementById('board-props').disabled = !foundProps;
    document.getElementById('board-note').disabled = !foundNote;
    document.getElementById('board-lightinglog').disabled = !foundLightinglog;
    document.getElementById('board-programme').disabled = !foundProgramme;

    /* Reading the programme after reconstructing the stage unlocks Scene 6. */
    let finalUnlocked = stageStep === 5 && hasReadProgramme && hasSeenFinalBow;
    document.getElementById('mapFinalButton').disabled = !finalUnlocked;
    if (finalUnlocked) {
        document.getElementById('mapFinalButton').innerHTML = '06 · Final Archive';
    } else {
        document.getElementById('mapFinalButton').innerHTML = '06 · Archive (Locked)';
    }
}

/* Restore variables without reloading the website. */
function resetGameState() {
    foundCancellation = false;
    foundRefunds = false;
    foundTicket = false;
    foundEmployee = false;
    foundProps = false;
    foundNote = false;
    foundLightinglog = false;
    foundProgramme = false;
    hasReadTicketBack = false;
    currentScene = 'entrance';
    stageStarted = false;
    stageStep = 0;
    hasReadProgramme = false;
    reportComplete = false;
    connectedFinancial = false;
    connectedStaging = false;
    connectedSeat = false;
    hasSeenFinalBow = false;
    visitedEntrance = true;
    visitedBoxoffice = false;
    visitedBackstage = false;
    visitedControl = false;
    visitedStage = false;
    visitedFinal = false;
}

/* Set the board to its correct starting appearance. */
updateEvidenceBoard();
