import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, Container, Typography, Box } from '@mui/material';

function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const addExpense = () => {
    const newExpense = { name, cost, type, description };
    setExpenses([...expenses, newExpense]);
    setName('');
    setCost('');
    setType('');
    setDescription('');
  };

  const deleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom>
        Expenses
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
        <TextField label="Cost" value={cost} onChange={(e) => setCost(e.target.value)} fullWidth />
        <TextField label="Credit/Debit" value={type} onChange={(e) => setType(e.target.value)} fullWidth />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth />
        <Button variant="contained" color="primary" onClick={addExpense}>
          Add Expense
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Credit/Debit</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense, index) => (
            <TableRow key={index}>
              <TableCell>{expense.name}</TableCell>
              <TableCell>{expense.cost}</TableCell>
              <TableCell>{expense.type}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>
                <Button variant="contained" color="error" onClick={() => deleteExpense(index)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default Expense;
