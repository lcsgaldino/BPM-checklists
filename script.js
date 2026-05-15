// Tab switching functionality
function openTab(evt, tabName) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }

    // Remove active class from all tab buttons
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }

    // Show the selected tab and mark button as active
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// Generate validation text
function generateValidationText() {
    // Get all form values
    const annuities = document.querySelector('input[name="annuities"]:checked');
    const preferredVAD = document.querySelector('input[name="preferredVAD"]:checked');
    const bpa = document.querySelector('input[name="bpa"]:checked');
    const eligiblePN = document.querySelector('input[name="eligiblePN"]:checked');
    const resellerID = document.querySelector('input[name="resellerID"]:checked');
    const materialGroup = document.querySelector('input[name="materialGroup"]:checked');
    const bpEU = document.querySelector('input[name="bpEU"]:checked');
    const payment = document.querySelector('input[name="payment"]:checked');
    const filesAttached = document.querySelector('input[name="filesAttachedTab1"]:checked');
    
    // Get all checked program types
    const programTypes = document.querySelectorAll('input[name="programType"]:checked');
    const programTypeValues = Array.from(programTypes).map(pt => pt.value);

    // Validate that all required fields are filled
    if (!annuities || !preferredVAD || !bpa || !eligiblePN ||
        !resellerID || !materialGroup || !bpEU || !payment || !filesAttached || programTypeValues.length === 0) {
        alert('Please complete all fields before generating validation text.');
        return;
    }

    // Determine eligibility based on the example criteria
    // For eligible: annuities type is variable (NGE or GE), preferredVAD=yes, bpa=yes,
    // eligiblePN=yes, resellerID=yes, materialGroup=yes, bpEU=no, payment=no, filesAttached=yes
    // Program type is also variable (any combination is acceptable)
    const isEligible =
        (annuities.value === 'NGE' || annuities.value === 'GE') &&
        preferredVAD.value === 'yes' &&
        bpa.value === 'yes' &&
        eligiblePN.value === 'yes' &&
        resellerID.value === 'yes' &&
        materialGroup.value === 'yes' &&
        bpEU.value === 'no' &&
        payment.value === 'no' &&
        filesAttached.value === 'yes';

    // Build the validation text
    let validationHTML = '<h3>Validation Summary</h3>';
    
    // Annuities type
    validationHTML += `<p><strong>SaaS & SL Annuities ${annuities.value}</strong></p>`;
    
    // Preferred VAD
    validationHTML += `<p><strong>Preferred VAD:</strong> ${preferredVAD.value === 'yes' ? 'Yes ✅' : 'No ❌'}</p>`;
    
    // BPA
    validationHTML += `<p><strong>BPA:</strong> ${bpa.value === 'yes' ? 'Yes ✅' : 'No ❌'}</p>`;
    
    // Deal Registration
    validationHTML += `<p><strong>Deal Registration:</strong> Not applicable</p>`;
    
    // Program type (variable - can be any combination)
    validationHTML += `<p><strong>Program type:</strong> ${programTypeValues.join(', ')} ✅</p>`;
    
    // Eligible PN
    validationHTML += `<p><strong>Eligible PN: validation according to the report:</strong> ${eligiblePN.value === 'yes' ? 'Yes ✅' : 'No ❌'}</p>`;
    
    // Reseller ID
    validationHTML += `<p><strong>Reseller ID order = Reseller ID BP Capabilities (exception GBM):</strong> ${resellerID.value === 'yes' ? 'Yes ✅' : 'No ❌'}</p>`;
    
    // Material group
    validationHTML += `<p><strong>Material group approved in BP Capabilities:</strong> ${materialGroup.value === 'yes' ? 'Yes ✅' : 'No ❌'}</p>`;
    
    // BP=EU (special logic)
    const bpEUText = bpEU.value === 'no' ? 'Eligible ✅' : 'Not eligible ❌';
    validationHTML += `<p><strong>BP=EU:</strong> ${bpEU.value === 'yes' ? 'Yes' : 'No'} (${bpEUText})</p>`;
    
    // Payment
    validationHTML += `<p><strong>Any Payment – no payment in DSW SAP neither DMT:</strong> ${payment.value === 'no' ? 'No ✅' : 'Yes ❌'}</p>`;
    
    // Files Attached
    const filesStatus = filesAttached.value === 'yes' ? '✅' : '❌';
    validationHTML += `<p><strong>The approved files was attached:</strong> ${filesAttached.value === 'yes' ? 'Yes' : 'No'} ${filesStatus}</p>`;
    
    // Final decision
    const finalDecision = isEligible
        ? 'Eligible to proceed to peer review ✅'
        : 'Not Eligible ❌';
    
    validationHTML += `<p class="final-decision"><strong>Final decision validation:</strong> ${finalDecision}</p>`;

    // Display the result
    const resultDiv = document.getElementById('validationResult');
    resultDiv.innerHTML = validationHTML;
    resultDiv.className = 'validation-result show ' + (isEligible ? 'eligible' : 'not-eligible');
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Generate validation text for Tab 2 (S&S Argentina)
function generateTab2ValidationText() {
    // Get all form values
    const bidType = document.querySelector('input[name="bidType"]:checked');
    const pnValidations = document.querySelectorAll('input[name="pnValidation"]:checked');
    const bprRequired = document.querySelector('input[name="bprRequired"]:checked');
    const onTimeCriteria = document.querySelector('input[name="onTimeCriteria"]:checked');
    const outYearCriteria = document.querySelector('input[name="outYearCriteria"]:checked');
    const staPercentages = document.querySelector('input[name="staPercentages"]:checked');
    const claimForms = document.querySelector('input[name="claimForms"]:checked');
    const calculationFile = document.querySelector('input[name="calculationFile"]:checked');
    const filesAttached = document.querySelector('input[name="filesAttachedTab2"]:checked');

    // Get all checked PN validation values
    const pnValidationValues = Array.from(pnValidations).map(pn => pn.value);

    // Validate that all required fields are filled
    if (!bidType || pnValidationValues.length === 0 || !bprRequired || !onTimeCriteria ||
        !outYearCriteria || !staPercentages || !claimForms || !calculationFile || !filesAttached) {
        alert('Please complete all fields before generating validation text.');
        return;
    }

    // Check if "none" is selected in PN validation
    const hasNone = pnValidationValues.includes('none');
    const pnValidationEligible = !hasNone;

    // Build the validation text
    let validationHTML = '<h3>Validation Summary</h3>';
    
    // BID Type
    validationHTML += `<p><strong>${bidType.value}</strong></p>`;
    
    // PN Validation with special handling for "none"
    const pnStatus = hasNone ? 'Review the PN validation ⚠️' : '✅';
    validationHTML += `<p><strong>PN totally validated for:</strong> ${pnValidationValues.join(', ')} ${hasNone ? '(' + pnStatus + ')' : pnStatus}</p>`;
    
    // BPR Required
    let bprStatus, bprText;
    if (bprRequired.value === 'yes') {
        bprStatus = 'Eligible ✅';
        bprText = 'Yes';
    } else if (bprRequired.value === 'notApplicable') {
        bprStatus = 'Eligible ✅';
        bprText = 'Not applicable';
    } else {
        bprStatus = 'Not eligible ❌';
        bprText = 'No';
    }
    validationHTML += `<p><strong>If needed, the BPR required was attended?</strong> ${bprText} (${bprStatus})</p>`;
    
    // On-time criteria
    const onTimeStatus = onTimeCriteria.value === 'yes' ? 'Eligible ✅' : 'Review On time criteria ⚠️';
    validationHTML += `<p><strong>The on-time criteria was validated?</strong> ${onTimeCriteria.value === 'yes' ? 'Yes' : 'No'} (${onTimeStatus})</p>`;
    
    // Out year criteria
    let outYearStatus, outYearText;
    if (outYearCriteria.value === 'yes') {
        outYearStatus = 'Eligible ✅';
        outYearText = 'Yes';
    } else if (outYearCriteria.value === 'notApplicable') {
        outYearStatus = 'Eligible ✅';
        outYearText = 'Not applicable';
    } else {
        outYearStatus = 'Review Out year criteria ⚠️';
        outYearText = 'No';
    }
    validationHTML += `<p><strong>If applicable, did you consider the Out year criteria?</strong> ${outYearText} (${outYearStatus})</p>`;
    
    // STA percentages
    const staStatus = staPercentages.value === 'yes' ? 'Eligible ✅' : 'Review STA criteria ⚠️';
    validationHTML += `<p><strong>The percentages for non-STA and STA was consider?</strong> ${staPercentages.value === 'yes' ? 'Yes' : 'No'} (${staStatus})</p>`;
    
    // Claim forms
    const claimStatus = claimForms.value === 'yes' ? 'Eligible ✅' : 'Review check list ⚠️';
    validationHTML += `<p><strong>All the claim forms check list was performed?</strong> ${claimForms.value === 'yes' ? 'Yes' : 'No'} (${claimStatus})</p>`;
    
    // Calculation file
    const calcStatus = calculationFile.value === 'yes' ? 'Eligible ✅' : 'Review calculation file ⚠️';
    validationHTML += `<p><strong>The calculation file was completed filled?</strong> ${calculationFile.value === 'yes' ? 'Yes' : 'No'} (${calcStatus})</p>`;
    
    // Files Attached
    let filesStatus, filesText;
    if (filesAttached.value === 'yes') {
        filesStatus = 'Eligible ✅';
        filesText = 'Yes';
    } else if (filesAttached.value === 'notApplicable') {
        filesStatus = 'Eligible ✅';
        filesText = 'Not applicable';
    } else {
        filesStatus = 'Not eligible ❌';
        filesText = 'No';
    }
    validationHTML += `<p><strong>The approved files was attached:</strong> ${filesText} (${filesStatus})</p>`;
    
    // Determine overall eligibility
    // Debug: log values
    console.log('BPR Required:', bprRequired.value);
    console.log('Out Year Criteria:', outYearCriteria.value);
    
    const bprEligible = (bprRequired.value === 'yes' || bprRequired.value === 'notApplicable');
    const outYearEligible = (outYearCriteria.value === 'yes' || outYearCriteria.value === 'notApplicable');
    const filesEligible = (filesAttached.value === 'yes' || filesAttached.value === 'notApplicable');
    
    const isEligible =
        pnValidationEligible &&
        bprEligible &&
        onTimeCriteria.value === 'yes' &&
        outYearEligible &&
        staPercentages.value === 'yes' &&
        claimForms.value === 'yes' &&
        calculationFile.value === 'yes' &&
        filesEligible;
    
    console.log('Is Eligible:', isEligible);
    
    // Final decision
    const finalDecision = isEligible
        ? 'Eligible to proceed ✅'
        : 'Review required - Not all criteria met ⚠️';
    
    validationHTML += `<p class="final-decision"><strong>Final decision validation:</strong> ${finalDecision}</p>`;

    // Display the result
    const resultDiv = document.getElementById('validationResultTab2');
    resultDiv.innerHTML = validationHTML;
    resultDiv.className = 'validation-result show ' + (isEligible ? 'eligible' : 'not-eligible');
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Generate validation text for Tab 3 (Quarterly SW VAD rebates)
function generateTab3ValidationText() {
    // Get all form values
    const rebateType = document.querySelector('input[name="rebateType"]:checked');
    const distributorValidated = document.querySelector('input[name="distributorValidated"]:checked');
    const programs = document.querySelectorAll('input[name="programs"]:checked');
    const amountsValidated = document.querySelector('input[name="amountsValidated"]:checked');
    const additionalApproval = document.querySelector('input[name="additionalApproval"]:checked');
    const filesAttached = document.querySelector('input[name="filesAttached"]:checked');

    // Get all checked program values
    const programValues = Array.from(programs).map(p => p.value);

    // Validate that all required fields are filled
    if (!rebateType || !distributorValidated || programValues.length === 0 ||
        !amountsValidated || !additionalApproval || !filesAttached) {
        alert('Please complete all fields before generating validation text.');
        return;
    }

    // Determine eligibility
    // All fields must be "yes" except additionalApproval which can be yes or no
    const isEligible =
        distributorValidated.value === 'yes' &&
        amountsValidated.value === 'yes' &&
        filesAttached.value === 'yes';

    // Build the validation text
    let validationHTML = '<h3>Validation Summary</h3>';
    
    // Rebate Type
    validationHTML += `<p><strong>Rebate Type:</strong> ${rebateType.value}</p>`;
    
    // Distributor Validated
    const distributorStatus = distributorValidated.value === 'yes' ? '✅' : '❌';
    validationHTML += `<p><strong>The indicate distributor was validated according to masterlist:</strong> ${distributorValidated.value === 'yes' ? 'Yes' : 'No'} ${distributorStatus}</p>`;
    
    // Programs involved
    validationHTML += `<p><strong>Programs involved in this claim:</strong> ${programValues.join(', ')} ✅</p>`;
    
    // Amounts Validated
    const amountsStatus = amountsValidated.value === 'yes' ? '✅' : '❌';
    validationHTML += `<p><strong>The amounts was validated according to masterlist:</strong> ${amountsValidated.value === 'yes' ? 'Yes' : 'No'} ${amountsStatus}</p>`;
    
    // Additional Approval
    const approvalText = additionalApproval.value === 'yes'
        ? 'Yes - Additional approval required for amounts higher than 25K'
        : 'No - Amount is within standard approval limits';
    const approvalStatus = additionalApproval.value === 'yes' ? '⚠️' : '✅';
    validationHTML += `<p><strong>Additional approval needed:</strong> ${approvalText} ${approvalStatus}</p>`;
    
    // Files Attached
    const filesStatus = filesAttached.value === 'yes' ? '✅' : '❌';
    validationHTML += `<p><strong>The approved files was attached:</strong> ${filesAttached.value === 'yes' ? 'Yes' : 'No'} ${filesStatus}</p>`;
    
    // Final decision
    let finalDecision;
    if (isEligible) {
        if (additionalApproval.value === 'yes') {
            finalDecision = 'Eligible - Requires additional approval for amounts higher than 25K ⚠️';
        } else {
            finalDecision = 'Eligible to proceed ✅';
        }
    } else {
        finalDecision = 'Not Eligible - Review required ❌';
    }
    
    validationHTML += `<p class="final-decision"><strong>Final decision validation:</strong> ${finalDecision}</p>`;

    // Display the result
    const resultDiv = document.getElementById('validationResultTab3');
    resultDiv.innerHTML = validationHTML;
    resultDiv.className = 'validation-result show ' + (isEligible ? 'eligible' : 'not-eligible');
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Renewal Checklist Tool loaded successfully');
});

// Made with Bob
