/* Control Booth: the record must be inspected before its cues can be previewed. */
function previewCue(time) {
    let text = document.getElementById('cuePreviewText');
    if (!foundLightinglog) {
        text.innerHTML = 'Inspect the physical lighting log first. It is on this desk.';
        return;
    }
    if (time === '7:56') text.innerHTML = '7:56 PM — A routine technical check on the stage.';
    else if (time === '8:03') text.innerHTML = '8:03 PM — Opening wash: warm light on stage.';
    else if (time === '8:09') text.innerHTML = '8:09 PM — A special cue aimed away from the stage, toward A12.';
    else if (time === '8:17') text.innerHTML = '8:17 PM — Final blackout. The log does not say why.';
}

/* Both essential evidence comparisons must be solved before reconstruction.
   The optional third comparison does not block progress. */
function startReconstruction() {
    let status = document.getElementById('stageStatus');
    if (stageStarted) {
        status.innerHTML = 'Reconstruction in progress. Match the next action to the records.';
        return;
    }
    if (!connectedFinancial || !connectedStaging) {
        let missing = 'Open Evidence → Evidence Connections. Still needed:';
        if (!connectedFinancial) missing += ' Ticket + Refund Ledger;';
        if (!connectedStaging) missing += ' Props + Lighting;';
        status.innerHTML = missing + ' Use the guidance below to go directly to missing records or a comparison.';
        updateStageReadiness();
        return;
    }
    stageStarted = true;
    updateStageReadiness();
    document.getElementById('stageStart').disabled = true;
    status.innerHTML = 'Archive evidence established. Begin with the first item on the prop inventory.';
}

/* Scrambled buttons make the player use the archived sequence.
   An incorrect action only updates feedback: it NEVER increases stageStep. */
function stageAction(action) {
    let image = document.getElementById('stageImage');
    let status = document.getElementById('stageStatus');
    if (!stageStarted) {
        status.innerHTML = 'First establish both essential Evidence Connections on the Investigation Board.';
        return;
    }
    if (stageStep === 5) {
        status.innerHTML = 'Reconstruction complete. Inspect Seat A12 below.';
        return;
    }
    let caption = '';
    if (action === 'stool' && stageStep === 0) {
        stageStep = 1;
        image.src = 'images/stage-state1-stool.webp';
        image.alt = 'A wooden stool is on the otherwise empty stage';
        caption = 'A plain stool, not a full public production. Which second prop was prepared?';
    } else if (action === 'lamp' && stageStep === 1) {
        stageStep = 2;
        image.src = 'images/stage-state2-props.webp';
        image.alt = 'Stool and freestanding brass work lamp placed on the stage';
        caption = 'Two modest objects. Consult the log: which cue follows the technical check?';
    } else if (action === 'opening' && stageStep === 2) {
        stageStep = 3;
        image.src = 'images/stage-state3-opening.webp';
        image.alt = 'The stage illuminated by a warm amber opening wash';
        caption = '8:03 PM — The stage was lit. Where was the next cue directed?';
        document.getElementById('stageArt').className = 'scene-art stage-art stage-amber';
    } else if (action === 'a12' && stageStep === 3) {
        stageStep = 4;
        image.src = 'images/Spotlight Auditorium.webp';
        image.alt = 'The light moves to the central auditorium seat A12';
        caption = '8:09 PM — An audience seat, not a performer, was illuminated. What ends the sequence?';
        document.getElementById('stageArt').className = 'scene-art stage-art stage-audience';
    } else if (action === 'blackout' && stageStep === 4) {
        stageStep = 5;
        image.src = 'images/ending-last-light.webp';
        image.alt = 'The auditorium in darkness after the final blackout';
        caption = '8:17 PM — Final blackout. The stage tells you WHERE, but not WHY. Inspect A12.';
        document.getElementById('stageArt').className = 'scene-art stage-art stage-blackout';
        document.getElementById('inspectSeatButton').hidden = false;
    } else {
        if (stageStep === 0 || stageStep === 1) caption = 'That prop does not come next. Check the order of items on the backstage prop inventory.';
        else if (stageStep === 2) caption = 'That cue is too late. Find the first lighting cue after 7:56 in the log.';
        else if (stageStep === 3) caption = 'Not yet. The next recorded cue changes focus away from the stage.';
        else caption = 'One final cue remains after the A12 spotlight. Check the last line of the log.';
        status.innerHTML = 'NOT A MATCH — ' + caption;
        return;
    }
    document.getElementById('stage-' + action).className = 'stage-done';
    status.innerHTML = 'RECONSTRUCTION ' + stageStep + '/5 — ' + caption;
    updateRoomClues();
    updateVisualProgress();
}

/* Bring back house lights and reveal the object at A12. */
function inspectSeat() {
    if (stageStep !== 5) return;
    document.getElementById('stageImage').src = 'images/Auditorium Base.webp';
    document.getElementById('stageImage').alt = 'House lights return to the empty auditorium';
    document.getElementById('stageArt').className = 'scene-art stage-art';
    document.getElementById('stageStatus').innerHTML = 'House work lights return. Something was left at A12.';
    closePanel();
    document.getElementById('seatViewer').hidden = false;
}

function closeSeat() {
    document.getElementById('seatViewer').hidden = true;
}
