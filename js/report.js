/* Two-stage archive report: first establish the event, then its purpose. */
function submitReport(answer) {
    let feedback = document.getElementById('reportFeedback');
    if (stageStep !== 5 || !hasReadProgramme || reportComplete) {
        feedback.innerHTML = 'Finish the reconstruction and read the programme first.';
        return;
    }
    if (answer === 'public') {
        feedback.innerHTML = 'The public tickets were refunded. The original advertised show did not go ahead.';
    } else if (answer === 'none') {
        feedback.innerHTML = 'The lighting cues and physical ticket show that the theatre was not entirely unused.';
    } else if (answer === 'unlisted') {
        document.getElementById('reportStep1').hidden = true;
        document.getElementById('reportStep2').hidden = false;
        feedback.innerHTML = 'Good. Now identify what made this unlisted event significant.';
    }
}

/* Step 2 is supported only by the recovered programme, not by speculation. */
function submitPurpose(answer) {
    let feedback = document.getElementById('reportFeedback');
    if (stageStep !== 5 || !hasReadProgramme || reportComplete ||
        document.getElementById('reportStep2').hidden) return;
    if (answer === 'rehearsal') {
        feedback.innerHTML = 'The programme identifies a dedication, not a rehearsal.';
    } else if (answer === 'inspection') {
        feedback.innerHTML = 'The programme was made for a person, not a routine equipment test.';
    } else if (answer === 'tribute') {
        reportComplete = true;
        feedback.innerHTML = 'Confirmed: an unlisted farewell for Jonah Bell, with A12 reserved as the guest seat.';
        document.getElementById('reportForm').parentElement.hidden = true;
        document.getElementById('finalEnding').hidden = false;
        window.scrollTo(0, 0);
    }
}
