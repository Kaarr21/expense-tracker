import React from "react";
import ExpenseForm from "./ExpenseForm";
import SearchBar from "./SearchBar";
import "../App.css";

function ExpenseTable({ expenses, onDelete, onSort, sortConfig }) {

  // Helper to determine sort direction indicator
  const getSortDirection = (name) => {
    if (!sortConfig) {
      return null;
    }
    return sortConfig.key === name ? 
      (sortConfig.direction === 'ascending' ? ' (a-z)' : ' (z-a)') : null;
  };

  return (
    <div className="expense-table-container">
      <table className="expense-table">
        <thead className="table-header">
          <tr>
            <th className="table-header-cell">
              <button
                onClick={() => onSort('expense')} 
                className="sort-button"
              >
                Expense{getSortDirection('expense')}
              </button>
            </th>
            <th className="table-header-cell">
              <button
                onClick={() => onSort('description')} 
                className="sort-button"
              >
                Description{getSortDirection('description')}
              </button>
            </th>
            <th className="table-header-cell">
              <button 
                onClick={() => onSort('category')} 
                className="sort-button"
              >
                Category{getSortDirection('category')}
              </button>
            </th>
            <th className="table-header-cell">Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {expenses.map((item) => (
            <tr key={item.id} className="table-row">
              <td className="table-cell">{item.expense}</td>
              <td className="table-cell">{item.description}</td>
              <td className="table-cell">{item.category}</td>
              <td className="table-cell">
                <button
                  onClick={() => onDelete(item.id)}
                  className="delete-button"
                  title="Delete expense"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
      {expenses.length === 0 && (
        <div className="no-expenses-message">
          No expenses found. Add some expenses to get started!
        </div>
      )}
    </div>
  );
}

export default ExpenseTable;
