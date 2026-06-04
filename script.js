document.addEventListener('DOMContentLoaded', function() {
    // 1. Grab all the input and output elements from the HTML
    const loanAmountInput = document.getElementById('loanAmount');
    const interestRateInput = document.getElementById('interestRate');
    const drawTermInput = document.getElementById('drawTerm');
    const repayTermInput = document.getElementById('repayTerm');

    const drawPaymentOutput = document.getElementById('drawPayment');
    const repayPaymentOutput = document.getElementById('repayPayment');

    // 2. The Core Calculation Function
    function calculateHELOC() {
        // Convert input values to numbers
        const principal = parseFloat(loanAmountInput.value) || 0;
        const annualRate = parseFloat(interestRateInput.value) || 0;
        const repayYears = parseInt(repayTermInput.value) || 0;

        // If inputs are empty or zero, reset display and stop running
        if (principal <= 0 || annualRate <= 0) {
            drawPaymentOutput.textContent = "$0.00";
            repayPaymentOutput.textContent = "$0.00";
            return;
        }

        // --- PHASE A: DRAW PERIOD (Interest-Only Payment) ---
        // Formula: (Balance * Annual Rate) / 12 months
        const monthlyRate = (annualRate / 100) / 12;
        const drawPeriodPayment = principal * monthlyRate;

        // --- PHASE B: REPAYMENT PERIOD (Principal + Interest) ---
        // Standard Amortization Formula: P * [i(1+i)^n] / [(1+i)^n - 1]
        const totalRepayMonths = repayYears * 12;
        let repaymentPayment = 0;

        if (monthlyRate === 0) {
            repaymentPayment = principal / totalRepayMonths;
        } else {
            repaymentPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalRepayMonths)) / 
                (Math.pow(1 + monthlyRate, totalRepayMonths) - 1);
        }

        // 3. Update the HTML display with beautifully formatted currency ($)
        drawPaymentOutput.textContent = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(drawPeriodPayment);

        repayPaymentOutput.textContent = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(repaymentPayment);
    }

    // 4. Event Listeners: Recalculate instantly whenever the user changes any input
    loanAmountInput.addEventListener('input', calculateHELOC);
    interestRateInput.addEventListener('input', calculateHELOC);
    drawTermInput.addEventListener('input', calculateHELOC);
    repayTermInput.addEventListener('input', calculateHELOC);

    // Run once on page load to set initial numbers ($50k at 7.5%)
    calculateHELOC();
});