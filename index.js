document.addEventListener('DOMContentLoaded', () => {
    const balanceDisplay = document.getElementById('balance-display');
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    function fetchData() {
        fetch('http://localhost:3000/expenses')
            .then((resp) => resp.json())
            .then((expenses) =>
                expenses.forEach((expense) => updateExpenseList(expense))
            );
    }
    function updateExpenseList(expense) {
        expense.
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';
        expenseItem.innerHTML = `
        <p>Description: ${expense.description}</p>
        <p>Amount: ${expense.amount}</p>
        <p>Category: ${expense.category}</p>
        `;

        expenseList.appendChild(expenseItem);
    }

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                description: expenseForm.querySelector('#expense-description')
                    .value,
                amount: expenseForm.querySelector('#expense-amount').value,
                category: expenseForm.querySelector('#expense-category').value,
            })
                .then((resp) => resp.json())
                .then(newExpense => updateExpenseList(newExpense)),
        });
    });
});
