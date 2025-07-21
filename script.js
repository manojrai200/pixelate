const table = document.querySelector("table");
const colorSelect = document.querySelector("#color-select");

let chosenColor = colorSelect.value;
let isMouseDown = false;

colorSelect.addEventListener("change", (e) => {
  chosenColor = e.target.value;
});

// Add a row with current column count
function makeRow(colCount = getColCount()) {
  const row = document.createElement("tr");
  for (let i = 0; i < colCount; i++) {
    const td = document.createElement("td");
    row.appendChild(td);
  }
  table.appendChild(row);
}

// Get current column count from first row
function getColCount() {
  const firstRow = table.querySelector("tr");
  return firstRow ? firstRow.children.length : 0;
}

// Handle coloring logic
function colorize(event) {
  const target = event.target;
  if (target.tagName !== "TD") return;
  target.className = target.className === chosenColor ? "" : chosenColor;
}

// Mouse events for painting
table.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  colorize(e);
});
table.addEventListener("mouseup", () => isMouseDown = false);
table.addEventListener("mouseover", (e) => {
  if (isMouseDown) colorize(e);
});

// Button actions
document.querySelector("#add-row").addEventListener("click", () => makeRow());
document.querySelector("#remove-row").addEventListener("click", () => {
  const rows = table.querySelectorAll("tr");
  if (rows.length > 0) table.removeChild(rows[rows.length - 1]);
});

document.querySelector("#add-col").addEventListener("click", () => {
  table.querySelectorAll("tr").forEach(row => {
    const td = document.createElement("td");
    row.appendChild(td);
  });
});

document.querySelector("#remove-col").addEventListener("click", () => {
  table.querySelectorAll("tr").forEach(row => {
    if (row.children.length > 0) row.removeChild(row.lastChild);
  });
});

document.querySelector("#set-cols").addEventListener("click", () => {
  const colCount = parseInt(document.querySelector("#col-count").value);
  table.querySelectorAll("tr").forEach(row => {
    const currentCols = row.children.length;
    if (currentCols < colCount) {
      for (let i = currentCols; i < colCount; i++) {
        const td = document.createElement("td");
        row.appendChild(td);
      }
    } else if (currentCols > colCount) {
      for (let i = currentCols - 1; i >= colCount; i--) {
        row.removeChild(row.children[i]);
      }
    }
  });
});

document.querySelector("#fill-all").addEventListener("click", () => {
  table.querySelectorAll("td").forEach(td => td.className = chosenColor);
});

document.querySelector("#fill-empty").addEventListener("click", () => {
  table.querySelectorAll("td").forEach(td => {
    if (td.className === "") td.className = chosenColor;
  });
});

document.querySelector("#clear").addEventListener("click", () => {
  table.querySelectorAll("td").forEach(td => td.className = "");
});

// Init with 1 row
makeRow(20);
