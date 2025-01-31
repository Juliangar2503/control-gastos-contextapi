import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {

    const { state } = useBudget()

    const filteredExenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses
    
    const isEmpty = useMemo(() => filteredExenses.length === 0, [filteredExenses])
    return (
        <div className="m-10">
            {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay gastos</p> : (
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p>
                    {filteredExenses.map(expense => (
                        <ExpenseDetail
                            key={expense.id}
                            expense={expense}
                        />
                    ))}
                </>
            )}
        </div>
    )
} 
