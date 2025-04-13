import React, { useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import SearchBar from './components/SearchBar';
import ExpenseTable from './components/ExpenseTable';

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, expense: 'Ugali Matumbo', description: "Wednesday's Lunch", category: 'food' },
    { id: 2, expense: 'KFC Tickets', description: 'power tickets', category: 'entertainment' },
    { id: 3, expense: 'Buy shoes', description: 'add to my shoe collection', category: 'shopping' },
    { id: 4, expense: 'Buy book', description: 'add to my book collection', category: 'education' },
    { id: 5, expense: 'Pay Loan', description: 'bank loan repayment', category: 'bills' },
    { id: 6, expense: 'Food', description: 'grocery shopping', category: 'food' }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  const addExpense = (newExpense) => {
    setExpenses([
      ...expenses,
      { id: expenses.length + 1, ...newExpense }
    ]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key].toLowerCase();
      const bValue = b[sortConfig.key].toLowerCase();
      
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredExpenses = sortedExpenses.filter(expense => 
    expense.expense.toLowerCase().includes(searchTerm.toLowerCase()) || 
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Expense Tracker</h1>
      </div>

      <div className="form-section">
        <ExpenseForm onAddExpense={addExpense} />
      </div>

      <div className="search-section">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      <div className="table-section">
        <ExpenseTable 
          expenses={filteredExpenses} 
          onDelete={deleteExpense} 
          onSort={requestSort}
          sortConfig={sortConfig}
        />
      </div>
    </div>
  );
}

export default App;
