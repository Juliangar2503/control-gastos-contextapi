import { v4 as uuidv4 } from 'uuid';
import { Category, DraftExpense, Expense } from "../types"

export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'hide-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'delete-expense', payload: { id: Expense['id'] } } |
    { type: 'get-expense-by-id', payload: { id: Expense['id'] } } |
    { type: 'update-expense', payload: { expense: Expense } } |
    { type: 'reset-app' } |
    { type: 'filter-category', payload: { id: Category['id'] } }

export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense['id'],
    currentCategory: Category['id']
}

const initialBudget = (): number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const localStorageExpenses = () => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: '',
    currentCategory: ''
}

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

export const budgetReducer = (state: BudgetState = initialState, action: BudgetActions) => {
    switch (action.type) {
        case 'add-budget':
            return {
                ...state,
                budget: action.payload.budget
            }
        case 'show-modal':
            return {
                ...state,
                modal: true
            }
        case 'hide-modal':
            return {
                ...state,
                modal: false,
                editingId: ''
            }
        case 'add-expense':
            return {
                ...state,
                expenses: [...state.expenses, createExpense(action.payload.expense)],
                modal: false
            }
        case 'delete-expense':
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
            }

        case 'get-expense-by-id':
            return {
                ...state,
                editingId: action.payload.id,
                modal: true
            }

        case 'update-expense':
            return {
                ...state,
                expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
                modal: false,
                editingId: ''

            }

        case 'reset-app':
            return {
                ...state,
                budget: 0,
                expenses: []
            }

        case 'filter-category':
            return {
                ...state,
                currentCategory: action.payload.id
            }

        default:
            return state
    }
}