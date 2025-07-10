let transactionDetails = JSON.parse(localStorage.getItem('transactionDetails')) || [];

document.getElementById('transactionForm').addEventListener('submit', addTransaction);

window.addEventListener('DOMContentLoaded', () => {
    refreshTransactionList();
    updateSummary();
});
const incomeCategories = ["💰Awards","🎟️Coupons","🧧Grants","🎫Lottery","💱Refunds","🏢Rental","💵Salary"];
const expenseCategories = ["🌷Beauty","🧾Bills","🚗Car","👕clothing","📚Education","🔌Electronics","📺Entertainment","🍜Food","🏥Health","h🏠Home","✅Insurance","🛒Shopping","🏦Tax","✈️Travel","🎲Others"];

document.getElementById("type").addEventListener("change", function () {
  const selectedType = this.value;
  const categorySelect = document.getElementById("Category");

  categorySelect.innerHTML = `<option value="" disabled selected hidden>Please select Category</option>`;

  const categories = selectedType === "Income" ? incomeCategories : expenseCategories;

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
});

function addTransaction(event) {
    event.preventDefault();

    const transactionAmount = document.querySelector('#amount').value;
    const transactionType = document.querySelector('#type').value;
    const transactionCategory = document.querySelector('#Category').value;
    const transactionDate = document.querySelector('#date').value;

    if (transactionAmount !== "") {
        const transaction = {
            Amount: parseFloat(transactionAmount),
            Type: transactionType,
            Category: transactionCategory,
            Date: transactionDate
        };

        transactionDetails.push(transaction);
        localStorage.setItem('transactionDetails', JSON.stringify(transactionDetails));

        refreshTransactionList();
        updateSummary();
        document.querySelector('#transactionForm').reset();
    }
}

function refreshTransactionList() {
    const list = document.getElementById('transactionList');
    list.innerHTML = '';

    transactionDetails.forEach((transaction, index) => {
        addToHTML(transaction, index);
    });
}

function addToHTML(transaction, index) {
    const list = document.getElementById('transactionList');

    const li = document.createElement('li');

    li.innerHTML = `
      <span class="itemType">${transaction.Type}</span>
      <span class="itemAmount">₹${transaction.Amount}</span>
      <span class="itemDate">${transaction.Date}</span>
      <span class="itemCategory">${transaction.Category}</span>
      <button class="delete" onclick="deletetransaction(${index})">🗑️</button>
    `;

    list.appendChild(li);
}

function updateSummary() {
    let income = 0;
    let expense = 0;

    transactionDetails.forEach(txn => {
        if (txn.Type === "Income") income += txn.Amount;
        else if (txn.Type === "Expense") expense += txn.Amount;
    });

    document.getElementById('income').textContent = income;
    document.getElementById('expense').textContent = expense;
}

function deletetransaction(index) {
    transactionDetails.splice(index, 1);
    localStorage.setItem('transactionDetails', JSON.stringify(transactionDetails));
    refreshTransactionList();
    updateSummary();
}
