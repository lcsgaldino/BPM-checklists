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
    
    // Get all checked program types
    const programTypes = document.querySelectorAll('input[name="programType"]:checked');
    const programTypeValues = Array.from(programTypes).map(pt => pt.value);

    // Validate that all required fields are filled
    if (!annuities || !preferredVAD || !bpa || !eligiblePN || 
        !resellerID || !materialGroup || !bpEU || !payment || programTypeValues.length === 0) {
        alert('Please complete all fields before generating validation text.');
        return;
    }

    // Determine eligibility based on the example criteria
    // For eligible: annuities type is variable (NGE or GE), preferredVAD=yes, bpa=yes,
    // eligiblePN=yes, resellerID=yes, materialGroup=yes, bpEU=no, payment=no
    // Program type is also variable (any combination is acceptable)
    const isEligible =
        (annuities.value === 'NGE' || annuities.value === 'GE') &&
        preferredVAD.value === 'yes' &&
        bpa.value === 'yes' &&
        eligiblePN.value === 'yes' &&
        resellerID.value === 'yes' &&
        materialGroup.value === 'yes' &&
        bpEU.value === 'no' &&
        payment.value === 'no';

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

    // Get all checked PN validation values
    const pnValidationValues = Array.from(pnValidations).map(pn => pn.value);

    // Validate that all required fields are filled
    if (!bidType || pnValidationValues.length === 0 || !bprRequired || !onTimeCriteria ||
        !outYearCriteria || !staPercentages || !claimForms || !calculationFile) {
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
    const bprStatus = bprRequired.value === 'yes' ? 'Eligible ✅' : 'Not eligible ❌';
    validationHTML += `<p><strong>If needed, the BPR required was attended?</strong> ${bprRequired.value === 'yes' ? 'Yes' : 'No'} (${bprStatus})</p>`;
    
    // On-time criteria
    const onTimeStatus = onTimeCriteria.value === 'yes' ? 'Eligible ✅' : 'Review On time criteria ⚠️';
    validationHTML += `<p><strong>The on-time criteria was validated?</strong> ${onTimeCriteria.value === 'yes' ? 'Yes' : 'No'} (${onTimeStatus})</p>`;
    
    // Out year criteria
    const outYearStatus = outYearCriteria.value === 'yes' ? 'Eligible ✅' : 'Review Out year criteria ⚠️';
    validationHTML += `<p><strong>If applicable, did you consider the Out year criteria?</strong> ${outYearCriteria.value === 'yes' ? 'Yes' : 'No'} (${outYearStatus})</p>`;
    
    // STA percentages
    const staStatus = staPercentages.value === 'yes' ? 'Eligible ✅' : 'Review STA criteria ⚠️';
    validationHTML += `<p><strong>The percentages for non-STA and STA was consider?</strong> ${staPercentages.value === 'yes' ? 'Yes' : 'No'} (${staStatus})</p>`;
    
    // Claim forms
    const claimStatus = claimForms.value === 'yes' ? 'Eligible ✅' : 'Review check list ⚠️';
    validationHTML += `<p><strong>All the claim forms check list was performed?</strong> ${claimForms.value === 'yes' ? 'Yes' : 'No'} (${claimStatus})</p>`;
    
    // Calculation file
    const calcStatus = calculationFile.value === 'yes' ? 'Eligible ✅' : 'Review calculation file ⚠️';
    validationHTML += `<p><strong>The calculation file was completed filled?</strong> ${calculationFile.value === 'yes' ? 'Yes' : 'No'} (${calcStatus})</p>`;
    
    // Determine overall eligibility
    const isEligible =
        pnValidationEligible &&
        bprRequired.value === 'yes' &&
        onTimeCriteria.value === 'yes' &&
        outYearCriteria.value === 'yes' &&
        staPercentages.value === 'yes' &&
        claimForms.value === 'yes' &&
        calculationFile.value === 'yes';
    
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

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Renewal Checklist Tool loaded successfully');
});

// Made with Bob
