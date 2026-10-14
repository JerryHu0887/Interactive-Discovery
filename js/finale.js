/* A dedicated visual climax prevents players from accidentally scrolling past it. */
function showFinalBow() {
    if (!hasReadProgramme || hasSeenFinalBow && reportComplete) return;
    document.getElementById('evidenceViewer').hidden = true;
    document.getElementById('seatViewer').hidden = true;
    closePanel();
    document.getElementById('finalBowOverlay').hidden = false;
}

function acknowledgeFinalBow() {
    if (!hasReadProgramme) return;
    hasSeenFinalBow = true;
    document.getElementById('finalBowOverlay').hidden = true;
    updateEvidenceBoard();
    updateRoomClues();
    updateVisualProgress();
    goToScene('final');
}

/* Mark exploration on the original floorplan using DOM class names. */
function updateMapProgress() {
    document.getElementById('mapEntrance').className = 'map-pin map-entrance' + (visitedEntrance ? ' map-visited' : '');
    document.getElementById('mapBoxoffice').className = 'map-pin map-boxoffice' + (visitedBoxoffice ? ' map-visited' : '');
    document.getElementById('mapBackstage').className = 'map-pin map-backstage' + (visitedBackstage ? ' map-visited' : '');
    document.getElementById('mapControl').className = 'map-pin map-control' + (visitedControl ? ' map-visited' : '');
    document.getElementById('mapStage').className = 'map-pin map-stage' + (visitedStage ? ' map-visited' : '');
    document.getElementById('mapFinalButton').className = 'map-pin map-archive' + (visitedFinal ? ' map-visited' : '');
    updateVisualProgress();
}
