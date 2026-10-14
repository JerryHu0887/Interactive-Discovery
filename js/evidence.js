/* Evidence viewer: simple DOM actions shared by all six scenes. */
/* Each record uses its matching HTML article and existing image. */
function inspectEvidence(name) {
    let documentPage = document.getElementById('doc-' + name);
    if (!documentPage) return;

    /* The programme can only be found after the stage reconstruction. */
    if (name === 'programme' && stageStep !== 5) return;

    closePanel();
    document.getElementById('seatViewer').hidden = true;

    /* Show only the document selected by the player.
       hidden is the same simple show/hide mechanism used for rooms. */
    document.getElementById('doc-cancellation').hidden = true;
    document.getElementById('doc-refunds').hidden = true;
    document.getElementById('doc-ticket').hidden = true;
    document.getElementById('doc-employee').hidden = true;
    document.getElementById('doc-props').hidden = true;
    document.getElementById('doc-note').hidden = true;
    document.getElementById('doc-lightinglog').hidden = true;
    document.getElementById('doc-programme').hidden = true;
    documentPage.hidden = false;

    /* Open two-sided documents on their front cover each time. */
    document.getElementById('ticketFront').hidden = false;
    document.getElementById('ticketBack').hidden = true;
    document.getElementById('programmeCover').hidden = false;
    document.getElementById('programmeInside').hidden = true;
    document.querySelector('#doc-ticket .evidence-summary').hidden = true;
    document.querySelector('#doc-programme .evidence-summary').hidden = true;

    /* Plain titles make it clear which archive record is open. */
    let title = 'Archive Evidence';
    if (name === 'cancellation') title = 'Cancellation Notice';
    else if (name === 'refunds') title = 'Refund Register';
    else if (name === 'ticket') title = 'Seat A12 Ticket';
    else if (name === 'employee') title = 'Employee Record';
    else if (name === 'props') title = 'Prop Inventory';
    else if (name === 'note') title = 'Preparation Note';
    else if (name === 'lightinglog') title = 'Lighting Cue Log';
    else if (name === 'programme') title = 'The Last Light Programme';
    document.getElementById('evidenceTitle').innerHTML = title;
    document.getElementById('evidenceViewer').hidden = false;

    /* The state file updates the count and unlocks this board card. */
    refreshEvidenceTranscript();
    markEvidence(name);
    updateRoomClues();
}

/* Close the archive record and return to the same room. */
function closeEvidence() {
    document.getElementById('evidenceViewer').hidden = true;
    if (hasReadProgramme && !hasSeenFinalBow) showFinalBow();
}

/* The reverse explains why the punched ticket was not sold. */
function flipTicket() {
    if (document.getElementById('doc-ticket').hidden) return;
    let back = document.getElementById('ticketBack');
    back.hidden = !back.hidden;
    document.getElementById('ticketFront').hidden = !back.hidden;
    document.querySelector('#doc-ticket .evidence-summary').hidden = back.hidden;
    refreshEvidenceTranscript();
    if (!back.hidden) {
        hasReadTicketBack = true;
        updateRoomClues();
        updateVisualProgress();
    }
}

/* Reading the inside, not just the cover, unlocks the final report.
   This also prepares the separate Final Bow reveal when the viewer closes. */
function flipProgramme() {
    if (document.getElementById('doc-programme').hidden || stageStep !== 5) return;
    let inside = document.getElementById('programmeInside');
    inside.hidden = !inside.hidden;
    document.getElementById('programmeCover').hidden = !inside.hidden;
    document.querySelector('#doc-programme .evidence-summary').hidden = inside.hidden;

    refreshEvidenceTranscript();
    if (!inside.hidden) {
        hasReadProgramme = true;
        document.getElementById('reconstructedFarewell').hidden = false;
        updateEvidenceBoard();
        updateRoomClues();
    }
}

/* Evidence-driven field notes: visits can happen in any order. */
function updateRoomClues() {
    let note = 'Several rooms are still unexplored. Begin with a document that has a date or seat number.';
    if (foundCancellation) {
        note = 'The public cancellation is confirmed. Other records might show whether the building was used privately.';
    }
    if (foundRefunds) {
        note = 'No paid admission survived the refunds. That confirms the public record, not every possible use of the theatre.';
    }
    if (foundTicket) {
        note = 'A punched ticket survives. Inspect its reverse, then compare it with the refund ledger.';
    }
    if (foundTicket && hasReadTicketBack && foundRefunds) {
        note = 'A complimentary seat and zero paid admissions can both be true. Who authorized the seat?';
    }
    if (foundEmployee && foundNote) {
        note = 'The staff file identifies who worked here, but the note names only a seat. They do not establish its occupant.';
    }
    if (foundNote && foundLightinglog) {
        note = 'A12 appears in both the preparation note and a timed lighting cue. Why was it singled out?';
    }
    if (foundProps && foundLightinglog) {
        note = 'The prop sheet and lighting log overlap. Compare them on the Investigation Board to test a connection.';
    }
    if (foundTicket && foundRefunds && foundLightinglog) {
        note = 'Multiple records overlap. Establish their connections on the Investigation Board before reconstruction.';
    }
    if (stageStep === 5) {
        note = 'The reconstructed sequence leads to Seat A12. Inspect what remains there before filing a report.';
    }
    if (foundProgramme && !hasReadProgramme) {
        note = 'A staff copy of The Last Light remains on A12. Open it to learn why it was made.';
    }
    if (hasReadProgramme) {
        note = 'The programme finally explains the purpose. Close it to view the artistic reconstruction of the farewell.';
    }
    if (connectedFinancial && !connectedStaging) note = 'The refund and ticket records now fit together. How do the prop sheet and lighting log relate?';
    if (connectedStaging && !connectedFinancial) note = 'A timed stage sequence is supported. Now explain the physical A12 ticket alongside the refund ledger.';
    if (connectedFinancial && connectedStaging && stageStep === 0) note = 'Two key connections are established. Return to the Main Stage and attempt a reconstruction.';
    if (hasSeenFinalBow) note = 'The final bow is understood. You can now complete the archive report.';
    document.getElementById('caseJournalText').innerHTML = note;
    let box = 'Look through the financial records and compare any physical tickets with the ledger.';
    if (foundRefunds) box = 'The paid ledger closes at zero. Is anything missing from the paper records?';
    if (foundTicket && !hasReadTicketBack) box = 'You found Seat A12. Inspect the back of the ticket before drawing a conclusion.';
    if (foundTicket && hasReadTicketBack && foundRefunds) box = 'The cancelled public show and complimentary ticket may describe two different things.';
    document.getElementById('boxofficeStatus').innerHTML = box;
    let backstage = 'Look at the props, the service record and the unfinished preparation note.';
    if (foundEmployee || foundNote || foundProps) backstage = 'Someone prepared the room, but their purpose is not yet established.';
    if (foundEmployee && foundNote) backstage = 'The staff record names a worker; the note names only Seat A12. Its intended occupant is still unknown.';
    document.getElementById('backstageStatus').innerHTML = backstage;
    if (foundCancellation) {
        document.getElementById('entranceStatus').innerHTML = 'The notice confirms the public cancellation. Investigate records that were never made public.';
    }
}
