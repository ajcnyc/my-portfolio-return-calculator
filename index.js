
function addRow() {
    let purchaseTable = document.getElementById("purchaseTable");
    let row = purchaseTable.insertRow(-1);

    let dateCell = row.insertCell(0);
    let sharesCell = row.insertCell(1);
    let priceCell = row.insertCell(2);

    let dateInput = document.createElement("input");
    dateInput.setAttribute("type", "date");
    dateCell.appendChild(dateInput);

    let sharesInput = document.createElement("input");
    sharesInput.setAttribute("type", "number");
    sharesCell.appendChild(sharesInput);

    let priceInput = document.createElement("input");
    priceInput.setAttribute("type", "number");
    priceInput.setAttribute("min", "0");
    priceInput.setAttribute("step", "any");
    priceCell.appendChild(priceInput);
}

function displayCalculation() {
    let totalReturn = calculate();
    document.getElementById("result").innerHTML = formatAsPercent(totalReturn);
}

function formatAsPercent(num){
    let formatted = (num * 100) + "%";
    return formatted;
}

function calculate() {
    let totalReturn = 0;
    let totalShares = parseInt(countTotalShares());

    let endDate = document.getElementById("endDate").value;
    let endPrice = document.getElementById("endPrice").value;

    let purchaseTable = document.getElementById("purchaseTable");
    for (let i = 1; i < purchaseTable.rows.length; i++) {
        let row = purchaseTable.rows[i];
        let startDate = row.cells[0].childNodes[0].value;
        let shares = parseInt(row.cells[1].childNodes[0].value);
        let startPrice = row.cells[2].childNodes[0].value;

        let positionReturn = calculatePositionReturn(startDate, endDate, startPrice, endPrice);
        let shareFraction = shares / totalShares;
        console.log("shares: " + shares);
        console.log("shareFraction: " + shareFraction);
        let weightedReturn = shareFraction * positionReturn;
        totalReturn = totalReturn + weightedReturn;
    }

    return totalReturn;
}

function countTotalShares() {
    let totalShares = 0;

    let purchaseTable = document.getElementById("purchaseTable");
    for (let i = 1; i < purchaseTable.rows.length; i++) {
        let row = purchaseTable.rows[i];
        console.log("row: " + row);
        let shares = parseInt(row.cells[1].childNodes[0].value);
        console.log("shares: " + shares);
        totalShares = totalShares + shares;
    }
    console.log("totalShares: " + totalShares);
    return totalShares;
}

function calculatePositionReturn(startDate, endDate, startPrice, endPrice) {
    console.log("startDate: " + startDate);
    let numYears = calculateNumYears(startDate, endDate);
    console.log("parseFloat(parseFloat(endPrice/startPrice)^parseFloat(1/numYears)): "+parseFloat(parseFloat(endPrice/startPrice)^parseFloat(1/numYears)));
    let cagr = parseFloat(Math.pow(parseFloat(endPrice/startPrice),parseFloat(1/numYears))) -1;
    return cagr;
}

function calculateNumYears(startDate, endDate) {
    let timeDifference = new Date(endDate).getTime() - new Date(startDate).getTime();
    let dayDifference = timeDifference / (1000 * 3600 * 24);
    console.log("dayDifference: "+dayDifference);
    let numYears = dayDifference / 365;
    console.log("numYears: "+numYears);
    return numYears;
}