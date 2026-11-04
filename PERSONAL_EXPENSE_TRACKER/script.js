// DOM Elements

let expenseChart;
let monthlyChart;
const transactionForm = document.getElementById("transaction-form");

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");

const submitBtn = document.getElementById("submit-btn");

const totalIncome = document.getElementById("total-income");
const totalExpenses = document.getElementById("total-expenses");
const balance = document.getElementById("balance");

const transactionList = document.getElementById("transaction-list");
const emptyMessage = document.getElementById("empty-message");

const filterCategory = document.getElementById("filter-category");


// Variables

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

let editingTransactionId = null;


// Set Today's Date

function setTodayDate() {

    const today = new Date();

    const formattedDate =
        today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");

    dateInput.value = formattedDate;
}

setTodayDate();


// Save Transactions in Local Storage

function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}


// Format Currency

function formatCurrency(amount) {

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2
    }).format(amount);

}


// Calculate Financial Summary

function updateSummary() 
{

    let income = 0;
    let expenses = 0;

    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {

            income += Number(transaction.amount);

        } else {

            expenses += Number(transaction.amount);

        }

    });

    totalIncome.textContent = formatCurrency(income);

    totalExpenses.textContent = formatCurrency(expenses);

    balance.textContent = formatCurrency(income - expenses);

    updateFinancialInsights(income, expenses);
    updateExpenseChart();
    updateMonthlyChart();
}


// Display Transactions

function displayTransactions() 
{

    transactionList.innerHTML = "";

    const selectedCategory = filterCategory.value;

    let filteredTransactions = transactions;

    if (selectedCategory !== "All") {

        filteredTransactions = transactions.filter(function(transaction) {

            return transaction.category === selectedCategory;

        });

    }

    // Sort by newest date first

    filteredTransactions.sort(function(a, b) {

        return b.date.localeCompare(a.date);

    });

    if (filteredTransactions.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }

    filteredTransactions.forEach(function(transaction) {

        const row = document.createElement("tr");

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = transaction.description;

        const categoryCell = document.createElement("td");
        categoryCell.textContent = transaction.category;

        const dateCell = document.createElement("td");

        const parts = transaction.date.split("-");

        dateCell.textContent =
            `${parts[2]}-${parts[1]}-${parts[0]}`;

        const typeCell = document.createElement("td");

        typeCell.textContent =
            transaction.type.charAt(0).toUpperCase() +
            transaction.type.slice(1);

        const amountCell = document.createElement("td");

        amountCell.textContent =
            formatCurrency(Number(transaction.amount));

        const actionsCell = document.createElement("td");

        // Edit Button

        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.className = "edit-btn";

        editButton.dataset.id = transaction.id;

        // Delete Button

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-btn";

        deleteButton.dataset.id = transaction.id;

        actionsCell.appendChild(editButton);

        actionsCell.appendChild(deleteButton);

        row.appendChild(descriptionCell);
        row.appendChild(categoryCell);
        row.appendChild(dateCell);
        row.appendChild(typeCell);
        row.appendChild(amountCell);
        row.appendChild(actionsCell);

        transactionList.appendChild(row);

    });

}


// Add or Update Transaction

transactionForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const description = descriptionInput.value.trim();

    const amount = Number(amountInput.value);

    const type = typeInput.value;

    const category = categoryInput.value;

    const date = dateInput.value;

    if (!description || !Number.isFinite(amount) || amount <= 0 || !date) {

        alert("Please enter valid transaction details.");

        return;

    }

    if (editingTransactionId !== null) {

        // Update Existing Transaction

        transactions = transactions.map(function(transaction) {

            if (transaction.id === editingTransactionId) {

                return {
                    ...transaction,
                    description,
                    amount,
                    type,
                    category,
                    date
                };

            }

            return transaction;

        });

        editingTransactionId = null;

        submitBtn.textContent = "Add Transaction";

    } else {

        // Create New Transaction

        const newTransaction = {

            id: Date.now().toString(),

            description: description,

            amount: amount,

            type: type,

            category: category,

            date: date

        };

        transactions.push(newTransaction);

    }

    saveTransactions();

    updateSummary();

    displayTransactions();

    transactionForm.reset();

    setTodayDate();

});


// Edit and Delete Transactions

transactionList.addEventListener("click", function(event) {

    const id = event.target.dataset.id;

    if (!id) return;


    // Edit Transaction

    if (event.target.classList.contains("edit-btn")) {

        const transaction = transactions.find(function(item) {

            return item.id === id;

        });

        if (!transaction) return;

        descriptionInput.value = transaction.description;

        amountInput.value = transaction.amount;

        typeInput.value = transaction.type;

        categoryInput.value = transaction.category;

        dateInput.value = transaction.date;

        editingTransactionId = id;

        submitBtn.textContent = "Update Transaction";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    // Delete Transaction

    if (event.target.classList.contains("delete-btn")) {

        const confirmDelete = confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (confirmDelete) {

            transactions = transactions.filter(function(transaction) {

                return transaction.id !== id;

            });

            if (editingTransactionId === id) {

                editingTransactionId = null;

                transactionForm.reset();

                setTodayDate();

                submitBtn.textContent = "Add Transaction";

            }

            saveTransactions();

            updateSummary();

            displayTransactions();

        }

    }

});


// Category Filter

filterCategory.addEventListener("change", function() {

    displayTransactions();

});


// Initial Display

updateSummary();

displayTransactions();
// Financial Insights

function updateFinancialInsights(income, expenses) {

    const insightElement = document.getElementById("financial-insight");

    if (transactions.length === 0) {

        insightElement.textContent =
            "Add transactions to view your financial insights.";

        return;
    }

    const currentBalance = income - expenses;

    const spendingPercentage = income > 0
        ? ((expenses / income) * 100).toFixed(1)
        : null;

    let highestCategory = "None";
    let highestAmount = 0;

    const categoryTotals = {};

    transactions.forEach(function(transaction) {

        if (transaction.type === "expense") {

            categoryTotals[transaction.category] =
                (categoryTotals[transaction.category] || 0) +
                Number(transaction.amount);

        }

    });

    for (const category in categoryTotals) {

        if (categoryTotals[category] > highestAmount) {

            highestAmount = categoryTotals[category];

            highestCategory = category;

        }

    }

    let message = "";

    if (currentBalance > 0) {

        message += "Great! You are saving money. ";

    } else if (currentBalance < 0) {

        message += "Your expenses are higher than your income. ";

    } else {

        message += "Your income and expenses are currently equal. ";

    }

    if (spendingPercentage !== null) {

        message += "You have spent " +
            spendingPercentage +
            "% of your total income. ";

    } else {

        message += "Add income to calculate your spending percentage. ";

    }

    if (highestAmount > 0) {

        message += "Your highest spending category is " +
            highestCategory +
            " (" +
            formatCurrency(highestAmount) +
            ").";

    } else {

        message += "You have not recorded any expenses yet.";

    }

    insightElement.textContent = message;

}
// Expense Breakdown Doughnut Chart



function updateExpenseChart() {

    const categoryTotals = {};

    transactions.forEach(function(transaction) {

        if (transaction.type === "expense") {

            categoryTotals[transaction.category] =
                (categoryTotals[transaction.category] || 0) +
                Number(transaction.amount);

        }

    });

    const categories = Object.keys(categoryTotals);

    const amounts = Object.values(categoryTotals);

    const ctx = document.getElementById("expenseChart");

    if (!ctx) return;

    if (expenseChart) {

        expenseChart.destroy();

    }

    if (categories.length === 0) {

        expenseChart = new Chart(ctx, {

            type: "doughnut",

            data: {

                labels: ["No Expenses Yet"],

                datasets: [{

                    data: [1],

                    backgroundColor: ["#e5e7eb"],

                    borderWidth: 0

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: true,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        });

        return;

    }

    expenseChart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: categories,

            datasets: [{

                data: amounts,

                backgroundColor: [

                    "#396afc",

                    "#11998e",

                    "#f45c43",

                    "#ffc107",

                    "#9b59b6",

                    "#3498db",

                    "#e84393",

                    "#2ecc71",

                    "#95a5a6"

                ],

                borderWidth: 2,

                borderColor: "#ffffff"

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: true,

            plugins: {

                legend: {

                    position: "bottom"

                },

                tooltip: {

                    callbacks: {

                        label: function(context) {

                            return context.label + ": " +
                                formatCurrency(context.raw);

                        }

                    }

                }

            }

        }

    });

}
// Monthly Income vs Expenses Bar Chart

function updateMonthlyChart() {

    const monthlyData = {};

    transactions.forEach(function(transaction) {

        const month = transaction.date.substring(0, 7);

        if (!monthlyData[month]) {
            monthlyData[month] = {
                income: 0,
                expense: 0
            };
        }

        if (transaction.type === "income") {
            monthlyData[month].income += Number(transaction.amount);
        } else {
            monthlyData[month].expense += Number(transaction.amount);
        }

    });

    const months = Object.keys(monthlyData).sort();

    const incomeData = months.map(function(month) {
        return monthlyData[month].income;
    });

    const expenseData = months.map(function(month) {
        return monthlyData[month].expense;
    });

    const ctx = document.getElementById("monthlyChart");

    if (!ctx) return;

    if (monthlyChart) {
        monthlyChart.destroy();
    }

    monthlyChart = new Chart(ctx, {

        type: "bar",

        data: {
            labels: months.length ? months : ["No Data"],

            datasets: [
                {
                    label: "Income",
                    data: months.length ? incomeData : [0],
                    backgroundColor: "#11998e"
                },
                {
                    label: "Expenses",
                    data: months.length ? expenseData : [0],
                    backgroundColor: "#f45c43"
                }
            ]
        },

        options: {
            responsive: true,

            plugins: {
                legend: {
                    position: "bottom"
                }
            },

            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }

    });

}
// Download Transaction Report as CSV

const downloadBtn = document.getElementById("download-btn");

downloadBtn.addEventListener("click", function() {

    if (transactions.length === 0) {
        alert("No transactions available to download!");
        return;
    }

    let csvContent = "Description,Category,Date,Type,Amount\n";

    transactions.forEach(function(transaction) {

        const row = [
            transaction.description,
            transaction.category,
            transaction.date,
            transaction.type,
            transaction.amount
        ];

        const csvRow = row.map(function(value) {
            return '"' + String(value).replace(/"/g, '""') + '"';
        }).join(",");

        csvContent += csvRow + "\n";

    });

    const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "expense-report.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

});