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
});

function updateExpenseList(expense) {
    expenseItem = document.createElement('div');
}
