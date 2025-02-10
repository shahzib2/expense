document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expenseForm');
    const expenseTable = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
    const totalAmount = document.getElementById('totalAmount');

    let expenses = [];

    // Load expenses from localStorage
    if (localStorage.getItem('expenses')) {
        expenses = JSON.parse(localStorage.getItem('expenses'));
        renderExpenses();
    }

    // Add Expense
    expenseForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;
        const date = document.getElementById('date').value;

        if (amount && category && date) {
            const expense = { amount, category, date };
            expenses.push(expense);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
            expenseForm.reset();
        }
    });

    // Render Expenses
    function renderExpenses() {
        expenseTable.innerHTML = '';
        let total = 0;

        expenses.forEach((expense, index) => {
            const row = expenseTable.insertRow();
            row.innerHTML = `
                <td>${expense.amount}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
            `;
            total += expense.amount;
        });

        totalAmount.textContent = total.toFixed(2);
    }
});