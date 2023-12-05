document.addEventListener('DOMContentLoaded', () => {
    // retrieve HTML elements
    const balanceDisplay = document.getElementById('balance-display');
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    function fetchData() {
        fetch('http://localhost:3000/expenses')
            .then((resp) => resp.json())
            .then((expenses) => {
                expenseList.innerHTML = ''; // reset expenseList so no duplicates happen everytime fetchData is called
                expenses.forEach((expense) => updateExpenseList(expense)); // forEach to render each expense onto the dom
                updateBalanceDisplay(expenses); // update the balance on the DOM
            });
    }

    function updateExpenseList(expense) {
        const expenseItem = document.createElement('div'); // create a div for each expense item
        expenseItem.className = 'expense-item';
        // each expense item will display each value that is put into the input field in the form
        expenseItem.innerHTML = `
        <p>Description: ${expense.description}</p>
        <p>Amount: ${expense.amount}</p>
        <p>Category: ${expense.category}</p>
        <button id="delete-btn" data-id="${expense.id}">Delete</button>
        `;
        expenseList.appendChild(expenseItem); // append each expense item onto the expense list on the DOM

        const deleteBtn = expenseItem.querySelector('#delete-btn'); // dynamically create a delete button in JS file
        deleteBtn.addEventListener('click', () => handleDelete(expense)); // delete button will delete the expense item from the server
    }

    function handleDelete(expense) {
        // DELETE method is used by providing the expense items id to the fetch request
        fetch(`http://localhost:3000/expenses/${expense.id}`, {
            method: `DELETE`,
        }).then(() => fetchData()); // call fetchData after deletion to present the new data onto the DOM
    }

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault(); // prevent default behaviour of the submit event, refreshes the page
        // retrieve all 3 input elements from the HTML
        const description = expenseForm.querySelector(
            '#expense-description'
        ).value;
        const amount = expenseForm.querySelector('#expense-amount').value;
        const category = expenseForm.querySelector('#expense-category').value;
        if (description && !isNaN(amount) && category)
            //  check if all 3 input fields have value, if so then launch post request
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
                .then((newExpense) => {
                    fetchData();
                    expenseForm.reset();
                }); // after new expense item is posted, call fetch data to append it onto the DOM and reset the form input fields
    });

    function updateBalanceDisplay(expenses) {
        const total = expenses.reduce(
            (total, expense) => total + parseFloat(expense.amount),
            0
        ); // reduce method takes all the amount values of every expense item and sums them into one number, the total
        const fixedTotal = total.toFixed(2); // the toFixed method allows the number to have 2 decimal places to represent money value
        balanceDisplay.innerHTML = `Balance: $${fixedTotal}`; // update the balance on the DOM dynamically to show new total
    }
});
