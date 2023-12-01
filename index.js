document.addEventListener('DOMContentLoaded', () => {
    const balanceDisplay = document.getElementById('balance-display');
    const expenseForm = document.getElementById('expense-form');
    const expenseDescriptionInput = document.getElementById(
        'expense-description'
    );
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseCategoryInput = document.getElementById('expense-category');
    const expenseList = document.getElementById('expense-list');

    function fetchData() {
        fetch('http://localhost:3000/expenses')
            .then((resp) => resp.json())
            .then((expenses) =>
                expenses.forEach((expense) => updateExpenseList(expense))
            );
    }
    function updateExpenseList(expense) {
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';
        expenseItem.innerHTML = `
        <p>Description: ${expense.description}</p>
        <p>Amount: ${expense.amount}</p>
        <p>Category: ${expense.category}</p>
        `;

        expenseList.appendChild(expenseItem);
    }
});
