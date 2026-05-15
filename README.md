# Master BPM Process Check Lists for Approval and Validation

A desktop application for validating renewal checklists for SaaS/SL, S&S Argentina, and Quarterly SW VAD rebates.

## Features

### Tab 1: Renewal SaaS/SL – Check List
Complete validation checklist with the following criteria:
- SaaS & SL Annuities Type (NGE or GE) - **Variable**
- Preferred VAD (Yes/No)
- BPA (Yes/No)
- Deal Registration (Not applicable)
- Program type (PA, PAE/PAX, CSA - multiple selection) - **Variable**
- Eligible PN validation
- Reseller ID verification
- Material group approval
- BP=EU status
- Payment verification

**Eligibility Criteria:**
The system automatically determines eligibility based on:
- SaaS & SL Annuities: **NGE or GE** (either is acceptable) ✅
- Preferred VAD: Yes
- BPA: Yes
- Eligible PN: Yes
- Reseller ID match: Yes
- Material group approved: Yes
- BP=EU: No (shows as "Eligible")
- No payment in DSW SAP or DMT: No
- Program type: **Any combination** (PA, PAE/PAX, CSA) ✅

Any other combination results in "Not Eligible" status.

### Tab 2: Renewal S&S – Argentina – Check List
Complete validation checklist with the following criteria:
- BID Type (NGE BID or GE BID) - **Variable**
- PN totally validated for (multiple selection):
  - Renewal quotation (quote 27)
  - SA38
  - MIP (pre-sales)
  - None
- BPR required attendance (Yes/No)
- On-time criteria validation (Yes/No)
- Out year criteria consideration (Yes/No)
- STA and non-STA percentages consideration (Yes/No)
- Claim forms checklist completion (Yes/No)
- Calculation file completion (Yes/No)

**Eligibility Criteria:**
The system automatically determines eligibility based on:
- BPR required: Yes (shows "Eligible") / No (shows "Not eligible")
- On-time criteria: Yes (shows "Eligible") / No (shows "Review On time criteria")
- Out year criteria: Yes (shows "Eligible") / No (shows "Review Out year criteria")
- STA percentages: Yes (shows "Eligible") / No (shows "Review STA criteria")
- Claim forms: Yes (shows "Eligible") / No (shows "Review check list")
- Calculation file: Yes (shows "Eligible") / No (shows "Review calculation file")

All criteria must be "Yes" for overall eligibility.

### Tab 3: Quarterly SW VAD rebates – Check List
*Awaiting instructions*

### Tab 4: New License – Check List
*Awaiting instructions*

### Tab 5: Hardware – Check List
*Awaiting instructions*

### Tab 6: BPCM – Check List
*Awaiting instructions*

### Tab 7: Trade-in – Check List
*Awaiting instructions*

## Installation

### Option 1: Run as Web Application
Simply open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).

### Option 2: Build as Desktop Application (Electron)

#### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)

#### Steps

1. **Install dependencies:**
   ```bash
   cd renewal-checklist-app
   npm install
   ```

2. **Run in development mode:**
   ```bash
   npm start
   ```

3. **Build executable for Windows:**
   ```bash
   npm run build-win
   ```
   The executable will be created in the `dist` folder.

4. **Build for macOS:**
   ```bash
   npm run build-mac
   ```

5. **Build for Linux:**
   ```bash
   npm run build-linux
   ```

## Usage

1. **Select Tab:** Choose the appropriate checklist tab at the top
2. **Fill Form:** Complete all required fields by selecting the appropriate checkboxes
3. **Generate Validation:** Click the "Generate Text for Validation" button
4. **Review Results:** The validation summary will appear with eligibility status

### Validation Output Examples

#### Tab 1: Renewal SaaS/SL
```
Validation Summary

SaaS & SL Annuities NGE
Preferred VAD: Yes ✅
BPA: Yes ✅
Deal Registration: Not applicable
Program type: PA ✅
Eligible PN: validation according to the report: Yes ✅
Reseller ID order = Reseller ID BP Capabilities (exception GBM): Yes ✅
Material group approved in BP Capabilities: Yes ✅
BP=EU: No (Eligible ✅)
Any Payment – no payment in DSW SAP neither DMT: No ✅

Final decision validation: Eligible to proceed to peer review ✅
```

#### Tab 2: Renewal S&S – Argentina
```
Validation Summary

NGE BID
PN totally validated for: Renewal quotation (quote 27) ✅
If needed, the BPR required was attended? Yes (Eligible ✅)
The on-time criteria was validated? Yes (Eligible ✅)
If applicable, did you consider the Out year criteria? Yes (Eligible ✅)
The percentages for non-STA and STA was consider? Yes (Eligible ✅)
All the claim forms check list was performed? Yes (Eligible ✅)
The calculation file was completed filled? Yes (Eligible ✅)

Final decision validation: Eligible to proceed ✅
```

**Note:** If "none" is selected for PN validation, the system will show "Review the PN validation ⚠️" and the final decision will be "Review required".

## File Structure

```
renewal-checklist-app/
├── index.html          # Main HTML structure
├── styles.css          # Styling and layout
├── script.js           # Validation logic and interactivity
├── main.js             # Electron main process
├── package.json        # Node.js dependencies and build config
└── README.md           # This file
```

## Technical Details

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Desktop Framework:** Electron
- **Build Tool:** electron-builder
- **No external dependencies** for the web version

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Future Enhancements

- Complete remaining tabs (Tab 3-7) once requirements are provided:
  - Tab 3: Quarterly SW VAD rebates
  - Tab 4: New License
  - Tab 5: Hardware
  - Tab 6: BPCM
  - Tab 7: Trade-in
- Export validation results to PDF or copy to clipboard
- Save/Load checklist states
- Multi-language support (PT-BR, EN, ES)
- Validation history tracking
- Dark mode support

## License

MIT License

## Support

For issues or questions, please contact the development team.