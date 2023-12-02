document.addEventListener('DOMContentLoaded', () => {
    const balanceDisplay = document.getElementById('balance-display');
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    function fetchData() {
        fetch('http://localhost:3000/expenses')
            .then((resp) => resp.json())
            .then((expenses) => {
                expenseList.innerHTML = '';
                expenses.forEach((expense) => updateExpenseList(expense));
                updateBalanceDisplay(expenses);
            });
    }
    function updateExpenseList(expense) {
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';
        expenseItem.innerHTML = `
        <p>Description: ${expense.description}</p>
        <p>Amount: ${expense.amount}</p>
        <p>Category: ${expense.category}</p>
        <button id="delete-btn" data-id="${expense.id}">Delete</button>
        `;
        expenseList.appendChild(expenseItem);

        const deleteBtn = expenseItem.querySelector('#delete-btn');
        deleteBtn.addEventListener('click', () => handleDelete(expense));
    }
    function handleDelete(expense) {
        fetch(`http://localhost:3000/expenses/${expense.id}`, {
            method: `DELETE`,
        }).then(() => fetchData());
    }
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = expenseForm.querySelector(
            '#expense-description'
        ).value;
        const amount = expenseForm.querySelector('#expense-amount').value;
        const category = expenseForm.querySelector('#expense-category').value;
        if (description && !isNaN(amount) && category)
            fetch('http://localhost:3000/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    description: description,
                    amount: amount,
                    category: category,
                }),
            })
                .then((resp) => resp.json())
                .then((newExpense) => fetchData());
    });

    function updateBalanceDisplay(expenses) {
        const total = expenses.reduce(
            (total, expense) => total + parseFloat(expense.amount),
            0
        );
        const fixedTotal = total.toFixed(2);
        balanceDisplay.innerHTML = `Balance: ${fixedTotal}`;
    }
});
