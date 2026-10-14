/* Basic UI helpers: move the shared journal, switch the board tabs,
   and update visual feedback without storing a second copy of progress. */
function positionJournal(name) {
    let journal = document.getElementById('caseJournal');
    let target = document.getElementById('room-info-' + name);
    if (target) { target.appendChild(journal); journal.hidden = false; }
    else { journal.hidden = true; }
}
function showBoardTab(name) {
    document.getElementById('boardRecords').hidden = name !== 'records';
    document.getElementById('connectionsArea').hidden = name !== 'connections';
    document.getElementById('boardTab-records').className = name === 'records' ? 'active-tab' : '';
    document.getElementById('boardTab-connections').className = name === 'connections' ? 'active-tab' : '';
}
function guideFinancial() {
    if (!foundRefunds || !foundTicket || !hasReadTicketBack) goToScene('boxoffice');
    else { openPanel('evidence'); showBoardTab('connections'); selectConnection('financial'); }
}
function guideStaging() {
    if (!foundProps) goToScene('backstage');
    else if (!foundLightinglog) goToScene('control');
    else { openPanel('evidence'); showBoardTab('connections'); selectConnection('staging'); }
}
/* Show concrete next steps only until both mandatory connections exist.
   These messages guide the player without revealing puzzle answers. */
function updateStageReadiness() {
    let f = 'Ready: ticket reverse and refund ledger connected.';
    if (!foundRefunds) f = 'Find the Refund Register in Box Office.';
    else if (!foundTicket) f = 'Find the A12 ticket in Box Office.';
    else if (!hasReadTicketBack) f = 'Flip the A12 ticket to read its reverse.';
    else if (!connectedFinancial) f = 'Open Evidence Connections and compare the two records.';
    let s = 'Ready: prop inventory and lighting log connected.';
    if (!foundProps) s = 'Find the Prop Inventory in Backstage.';
    else if (!foundLightinglog) s = 'Find the Lighting Cue Log in Control Booth.';
    else if (!connectedStaging) s = 'Open Evidence Connections and compare the two records.';
    document.getElementById('readiness-financial').textContent = f;
    document.getElementById('readiness-staging').textContent = s;
    document.getElementById('stageReadiness').hidden = stageStarted;
    document.getElementById('stageActions').hidden = !stageStarted;
    document.getElementById('readiness-financial').parentElement.parentElement.className = connectedFinancial ? 'readiness-item ready' : 'readiness-item';
    document.getElementById('readiness-staging').parentElement.parentElement.className = connectedStaging ? 'readiness-item ready' : 'readiness-item';
}
/* Give an inspected hotspot a different appearance, and mark key finds
   on the original theatre map. All values come from the state variables. */
function updateVisualProgress() {
    document.getElementById('hotspot-entrance-0').classList.toggle('investigated',foundCancellation);
    document.getElementById('hotspot-boxoffice-0').classList.toggle('investigated',foundRefunds);
    document.getElementById('hotspot-boxoffice-1').classList.toggle('investigated',foundTicket);
    document.getElementById('hotspot-backstage-0').classList.toggle('investigated',foundEmployee);
    document.getElementById('hotspot-backstage-1').classList.toggle('investigated',foundProps);
    document.getElementById('hotspot-backstage-2').classList.toggle('investigated',foundNote);
    document.getElementById('hotspot-control-0').classList.toggle('investigated',foundLightinglog);
    markRoom('mapEntrance',foundCancellation);
    markRoom('mapBoxoffice',foundRefunds && foundTicket);
    markRoom('mapBackstage',foundProps);
    markRoom('mapControl',foundLightinglog);
    markRoom('mapStage',stageStep === 5);
    updateStageReadiness();
}
function markRoom(id,complete) {
    let pin = document.getElementById(id);
    pin.classList.toggle('map-key-found',complete);
}

/* Copy text from the visible page of the currently open document.
   querySelectorAll finds archive articles; the for loop checks each one.
   innerText preserves what the visitor can actually read, including line breaks. */
function refreshEvidenceTranscript() {
    let viewer = document.getElementById('evidenceViewer');
    let articles = viewer.querySelectorAll('article.document');
    for (let i = 0; i < articles.length; i++) {
        if (!articles[i].hidden) {
            let page = articles[i].querySelector('.document-page:not([hidden]) .paper-content');
            let transcript = articles[i].querySelector('.transcript-text');
            transcript.textContent = page ? page.innerText : '';
        }
    }
}
