import { useState } from 'react';
import ExpenseTable from "./ExpenseTable";
import SearchBar from "./SearchBar";
import "../App.css";

function ExpenseForm({ onAddExpense }) {
  const [newExpense, setNewExpense] = useState({
    expense: '',
    description: '',
    category: 'food',
    amount: '',
    date: ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({
      ...newExpense,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newExpense.expense) return;
    
    onAddExpense({
      expense: newExpense.expense,
      description: newExpense.description || '',
      category: newExpense.category
    });
    
    setNewExpense({
      expense: '',
      description: '',
      category: 'food',
      amount: '',
      date: ''
    });
  };
  
  return (
    <div className="expense-form-container">
      <h2 className="form-title">Add Expense</h2>
      <p className="form-subtitle">Enter your expense details below</p>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <input
            type="text"
            name="expense"
            placeholder="Expense Name"
            value={newExpense.expense}
            onChange={handleInputChange}
            className="form-input"
          />
          
          <input
            type="text"
            name="description"
            placeholder="Description (optional)"
            value={newExpense.description}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        
        <div className="form-row">
          <select
            name="category"
            value={newExpense.category}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="utilities">Utilities</option>
            <option value="shopping">Shopping</option>
            <option value="education">Education</option>
            <option value="bills">Bills</option>
            <option value="others">Others</option>
          </select>
          
          <input
            type="text"
            name="amount"
            placeholder="Enter amount"
            value={newExpense.amount}
            onChange={handleInputChange}
            className="form-input"
          />
        
          <input
            type="date"
            name="date"
            value={newExpense.date}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        
        <button
          type="submit"
          className="submit-button"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
