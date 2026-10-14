/* The Hint panel follows what the player has already discovered.
   Three levels move from a subtle clue to an exact next step. */
let hintLevel = 0;
let hintTopic = '';

function currentHintTopic() {
    if (stageStep === 5 && !hasReadProgramme) return 'programme';
    if (hasReadProgramme && !hasSeenFinalBow) return 'farewell';
    if (hasSeenFinalBow) return 'report';
    if (stageStarted) return 'stage';
    if (!connectedFinancial) return 'financial';
    if (!connectedStaging) return 'staging';
    return 'beginStage';
}

function prepareHint() {
    let topic = currentHintTopic();
    if (topic !== hintTopic) {
        hintTopic = topic;
        hintLevel = 0;
    }
    document.getElementById('hintCount').innerHTML = 'Hint ' + hintLevel + ' of 3';
    document.getElementById('hintText').innerHTML = hintLevel === 0 ? 'Click Reveal Next Hint when you need guidance.' : hintMessage(topic, hintLevel);
    let label = 'final archive';
    if (topic === 'financial') label = 'follow the ticket';
    else if (topic === 'staging') label = 'explain stage activity';
    else if (topic === 'beginStage' || topic === 'stage') label = 'reconstruct the stage';
    else if (topic === 'programme') label = 'investigate A12';
    else if (topic === 'farewell') label = 'view the farewell';
    document.getElementById('hintTopicLabel').innerHTML = 'Current objective: ' + label;
}

function revealHint() {
    if (hintLevel < 3) hintLevel++;
    document.getElementById('hintText').innerHTML = hintMessage(hintTopic, hintLevel);
    document.getElementById('hintCount').innerHTML = 'Hint ' + hintLevel + ' of 3';
}

function hintMessage(topic, level) {
    if (topic === 'financial') {
        if (level === 1) return 'A ticket and a refund account may seem inconsistent. Can they both be true?';
        if (level === 2) return 'Compare the box office ledger and the back of Seat A12 ticket.';
        return 'Visit Box Office. Read the Refund Register, flip the A12 Ticket, then open Evidence → Ticket ↔ Refund Ledger and choose an explanation.';
    }
    if (topic === 'staging') {
        if (level === 1) return 'Someone prepared an arrangement; look for a timed record of it.';
        if (level === 2) return 'Backstage has a prop list. Control Booth has a lighting cue sheet.';
        return 'Inspect Prop Inventory and Lighting Cue Log, then on Evidence Board select Props ↔ Lighting and explain what BOTH establish.';
    }
    /* Basic if/else keeps each hint level easy to read. */
    if (topic === 'beginStage') {
        if (level === 1) return 'Your two essential connections are confirmed.';
        else if (level === 2) return 'There is a room where you can apply both records.';
        else return 'Open Theatre Map → Main Stage → Check Evidence & Begin.';
    }
    if (topic === 'stage') {
        if (level === 1) return 'Each prop and light cue has its own place in the documented sequence.';
        if (level === 2) return 'Use the prop list first, then the cue log in time order after 7:56.';
        if (stageStep === 0) return 'Choose Wooden stool.';
        if (stageStep === 1) return 'Choose Freestanding work lamp.';
        if (stageStep === 2) return 'Choose Opening wash · 8:03.';
        if (stageStep === 3) return 'Choose Audience special · 8:09.';
        return 'Choose Final blackout · 8:17.';
    }
    if (topic === 'programme') {
        if (level === 1) return 'The lighting sequence points away from the stage.';
        else if (level === 2) return 'Something remains in the audience at A12.';
        else return 'On Main Stage select Inspect Seat A12, then Inspect Programme and turn to its inner pages.';
    }
    if (topic === 'farewell') {
        if (level === 1) return 'The programme explains who the event honoured.';
        else if (level === 2) return 'The farewell reconstruction appears when you close the programme.';
        else return 'Close the programme viewer and click Continue to the Final Report after viewing The Final Bow.';
    }
    if (level === 1) return 'Your job is to distinguish official public records from internal events.';
    else if (level === 2) return 'The programme explains the purpose of the unlisted activity.';
    else return 'Go to Final Archive on the Theatre Map and answer both report questions.';
}

function resetHints() {
    hintTopic = '';
    hintLevel = 0;
    prepareHint();
}
