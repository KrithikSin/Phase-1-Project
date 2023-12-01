document.addEventListener('DOMContentLoaded', () => {
    console.log('we are connected!!!');
    fetchData();
});

function fetchData() {
    fetch('http://localhost:3000/expenses')
        .then((resp) => resp.json())
        .then((expenses) => expenses.forEach((expense) => updateExpenseList()));
}

function updateExpenselist() {}
