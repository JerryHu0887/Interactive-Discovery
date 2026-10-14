/* Three archive connection puzzles. Two are essential; the A12 cue link is optional. */
let selectedConnection = '';
function selectConnection(name) {
    selectedConnection = name;
    let title = document.getElementById('connectionTitle');
    let question = document.getElementById('connectionQuestion');
    let feedback = document.getElementById('connectionFeedback');
    let choices = document.getElementById('connectionAnswers');
    choices.hidden = true;
    feedback.innerHTML = '';
    if (name === 'financial') {
        title.innerHTML = 'Connection 1 · Paper Ticket + Refund Ledger';
        if (!foundRefunds || !foundTicket || !hasReadTicketBack) {
            question.innerHTML = 'Requires the refund register AND both sides of the A12 ticket. Find them in the Box Office.';
            return;
        }
        question.innerHTML = 'How can paid admissions be zero while a punched ticket survives?';
        document.getElementById('connectionAnswerA').innerHTML = 'One of these records must be forged.';
        document.getElementById('connectionAnswerB').innerHTML = 'A complimentary internal admission need not appear in paid sales.';
        document.getElementById('connectionAnswerC').innerHTML = 'The public refunds must have been cancelled.';
    } else if (name === 'staging') {
        title.innerHTML = 'Connection 2 · Props + Lighting Cues';
        if (!foundProps || !foundLightinglog) {
            question.innerHTML = 'Requires the prop inventory (Backstage) and lighting log (Control Booth).';
            return;
        }
        question.innerHTML = 'What can these records demonstrate together?';
        document.getElementById('connectionAnswerA').innerHTML = 'The cancelled public show definitely happened.';
        document.getElementById('connectionAnswerB').innerHTML = 'The records prove this was only a maintenance test.';
        document.getElementById('connectionAnswerC').innerHTML = 'A prepared timed sequence took place, but its purpose is still uncertain.';
    } else if (name === 'seat') {
        title.innerHTML = 'Optional Connection · A12 Note + Lighting Log';
        if (!foundNote || !foundLightinglog) {
            question.innerHTML = 'Requires the preparation note (Backstage) and lighting log (Control Booth).';
            return;
        }
        question.innerHTML = 'A12 was kept available, then received an audience spotlight. What can we infer?';
        document.getElementById('connectionAnswerA').innerHTML = 'A12 was deliberately part of the plan, but we still do not know who sat there.';
        document.getElementById('connectionAnswerB').innerHTML = 'This proves Jonah Bell was sitting in A12.';
        document.getElementById('connectionAnswerC').innerHTML = 'The cancelled public performance definitely went ahead.';
    } else return;
    choices.hidden = false;
    feedback.innerHTML = 'Choose the interpretation best supported by BOTH records.';
}

/* Correct answers set one boolean; incorrect answers give a clue
   without resetting any previously collected evidence. */
function answerConnection(answer) {
    if (document.getElementById('connectionAnswers').hidden) return;
    let correct = false;
    if (selectedConnection === 'financial' && answer === 'b') { connectedFinancial = true; correct = true; }
    else if (selectedConnection === 'staging' && answer === 'c') { connectedStaging = true; correct = true; }
    else if (selectedConnection === 'seat' && answer === 'a') { connectedSeat = true; correct = true; }
    let feedback = document.getElementById('connectionFeedback');
    if (correct) {
        feedback.innerHTML = 'CONNECTION ESTABLISHED — Well supported. This inference is now recorded.';
        document.getElementById('connectionAnswers').hidden = true;
        updateConnections();
        updateRoomClues();
        updateVisualProgress();
    } else if (selectedConnection === 'financial') {
        feedback.innerHTML = 'Not yet. The ticket reverse specifies whether this admission was SOLD.';
    } else if (selectedConnection === 'staging') {
        feedback.innerHTML = 'Not yet. These records prove activity, but do they identify its purpose?';
    } else {
        feedback.innerHTML = 'Not yet. The note and cue concern a seat, but never identify its occupant.';
    }
}

/* The first two connections count toward the required 2/2.
   The optional seat connection is displayed but never required. */
function updateConnections() {
    let total = 0;
    if (connectedFinancial) total++;
    if (connectedStaging) total++;
    document.getElementById('connectionProgress').innerHTML = total + ' / 2 essential connections established' + (connectedSeat ? ' · Optional A12 clue connected' : '');
    document.getElementById('financialCheck').innerHTML = connectedFinancial ? '✓' : '';
    document.getElementById('stagingCheck').innerHTML = connectedStaging ? '✓' : '';
    document.getElementById('seatCheck').innerHTML = connectedSeat ? '✓' : '';
    document.getElementById('connectFinancial').className = connectedFinancial ? 'connection-done' : '';
    document.getElementById('connectStaging').className = connectedStaging ? 'connection-done' : '';
    document.getElementById('connectSeat').className = connectedSeat ? 'connection-done' : '';
}

function resetConnections() {
    selectedConnection = '';
    document.getElementById('connectionAnswers').hidden = true;
    document.getElementById('connectionTitle').innerHTML = 'Choose two related records';
    document.getElementById('connectionQuestion').innerHTML = 'Compare their meaning. The first two connections are required; the third is optional.';
    document.getElementById('connectionFeedback').innerHTML = 'Select a pair above to begin.';
    updateConnections();
}
