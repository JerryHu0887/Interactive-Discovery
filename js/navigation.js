/* Begin the case after the cinematic title card. */
function beginInvestigation() {
    document.getElementById('startScreen').hidden = true;
    document.getElementById('siteHeader').hidden = false;
    document.getElementById('game').hidden = false;
    updateMapProgress();
    positionJournal('entrance');
    window.scrollTo(0, 0);
}

/* Show one of the three global panels: map, evidence, or help. */
function openPanel(name) {
    closePanel();
    if (name === 'map' || name === 'evidence' || name === 'help' || name === 'hint') {
        document.getElementById('panel-' + name).hidden = false;
        if (name === 'evidence') { updateEvidenceBoard(); updateConnections(); showBoardTab('records'); }
        if (name === 'hint') prepareHint();
        if (name === 'map') updateMapProgress();
    }
}

/* Hide the global panel without changing investigation progress. */
function closePanel() {
    document.getElementById('panel-map').hidden = true;
    document.getElementById('panel-evidence').hidden = true;
    document.getElementById('panel-help').hidden = true;
    document.getElementById('panel-hint').hidden = true;
}

/* Swap scenes in the same HTML page; no page reload is needed. */
function goToScene(name) {
    if (name !== 'entrance' && name !== 'boxoffice' &&
        name !== 'backstage' && name !== 'control' &&
        name !== 'stage' && name !== 'final') return;

    /* The last scene stays locked until the programme is read. */
    if (name === 'final' && (stageStep !== 5 || !hasReadProgramme || !hasSeenFinalBow)) return;
    if (!hasSeenFinalBow && !document.getElementById('finalBowOverlay').hidden) return;

    document.getElementById('scene-' + currentScene).hidden = true;
    document.getElementById('scene-' + currentScene).className = 'scene';
    document.getElementById('scene-' + name).hidden = false;
    document.getElementById('scene-' + name).className = 'scene active';
    currentScene = name;
    if (name === 'entrance') visitedEntrance = true;
    if (name === 'boxoffice') visitedBoxoffice = true;
    if (name === 'backstage') visitedBackstage = true;
    if (name === 'control') visitedControl = true;
    if (name === 'stage') visitedStage = true;
    if (name === 'final') visitedFinal = true;
    /* updateMapProgress also refreshes room markers and stage readiness. */
    updateMapProgress();
    positionJournal(name);

    closePanel();
    document.getElementById('evidenceViewer').hidden = true;
    document.getElementById('seatViewer').hidden = true;
    window.scrollTo(0, 0);
}

/* Restore the interface as well as the saved JavaScript variables. */
function restartInvestigation() {
    if (!confirm('Restart the investigation? Your evidence will be cleared.')) return;
    closePanel();
    resetGameState();

    /* Return to the entrance and hide all other scenes. */
    document.getElementById('scene-entrance').hidden = false;
    document.getElementById('scene-boxoffice').hidden = true;
    document.getElementById('scene-backstage').hidden = true;
    document.getElementById('scene-control').hidden = true;
    document.getElementById('scene-stage').hidden = true;
    document.getElementById('scene-final').hidden = true;
    document.getElementById('scene-entrance').className = 'scene active';
    document.getElementById('scene-boxoffice').className = 'scene';
    document.getElementById('scene-backstage').className = 'scene';
    document.getElementById('scene-control').className = 'scene';
    document.getElementById('scene-stage').className = 'scene';
    document.getElementById('scene-final').className = 'scene';

    /* Close evidence and return both documents to their front covers. */
    document.getElementById('evidenceViewer').hidden = true;
    document.getElementById('seatViewer').hidden = true;
    document.getElementById('finalBowOverlay').hidden = true;
    document.getElementById('ticketFront').hidden = false;
    document.getElementById('ticketBack').hidden = true;
    document.getElementById('programmeCover').hidden = false;
    document.getElementById('programmeInside').hidden = true;

    /* Reset the lighting preview and stage reconstruction. */
    document.getElementById('cuePreviewText').innerHTML =
        'Select a cue to see what it controlled.';
    document.getElementById('stageImage').src = 'images/main stage.webp';
    document.getElementById('stageImage').alt = 'The empty theatre stage before reconstruction';
    document.getElementById('stageStatus').innerHTML =
        'Establish the two key evidence connections on the Investigation Board to begin.';
    document.getElementById('stageStart').disabled = false;
    document.getElementById('stage-stool').className = '';
    document.getElementById('stage-lamp').className = '';
    document.getElementById('stage-opening').className = '';
    document.getElementById('stage-a12').className = '';
    document.getElementById('stage-blackout').className = '';
    document.getElementById('inspectSeatButton').hidden = true;
    document.getElementById('reconstructedFarewell').hidden = true;
    document.getElementById('stageArt').className = 'scene-art stage-art';
    document.querySelector('#doc-ticket .evidence-summary').hidden = true;
    document.querySelector('#doc-programme .evidence-summary').hidden = true;

    /* Reset the final report and scene descriptions. */
    document.getElementById('reportForm').parentElement.hidden = false;
    document.getElementById('reportForm').hidden = false;
    document.getElementById('finalEnding').hidden = true;
    document.getElementById('reportStep1').hidden = false;
    document.getElementById('reportStep2').hidden = true;
    document.getElementById('reportFeedback').innerHTML =
        'Use the evidence to complete both parts of the record.';
    document.getElementById('entranceStatus').innerHTML =
        'First task: Inspect the official notice, then explore the other rooms.';
    document.getElementById('caseJournalText').innerHTML =
        'Start with the official record, then investigate anything that does not fit. You may visit the rooms in any order.';
    document.getElementById('boxofficeStatus').innerHTML =
        'Look through the financial records and compare any physical tickets with the ledger.';
    document.getElementById('backstageStatus').innerHTML =
        'Look at the props, the service record and the unfinished preparation note.';

    updateEvidenceBoard();
    resetConnections();
    resetHints();
    updateMapProgress();
    showBoardTab('records');
    /* A new investigation always starts at the title card. */
    document.getElementById('siteHeader').hidden = true;
    document.getElementById('game').hidden = true;
    document.getElementById('startScreen').hidden = false;
    window.scrollTo(0, 0);
}
