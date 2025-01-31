import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategory() {

    const {dispatch} = useBudget()

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'filter-category', payload: { id: e.target.value } })
    }

  return (
    <div className="bg-white shadow-lg rounded-lg mt-10 p-10">
        <form>
            <div className="flex flex-col md:flex-row md:items-center gap-5">
                <label htmlFor="category">Filtrar gastos</label>
                    <select id="category" className="bg-slate-100 p-3 flex-1 rounded" onChange={handleChange}>
                        <option value="">-- Seleccione --</option>
                        {categories.map( category => (
                            <option
                                key={category.id}
                                value={category.id}
                            >{category.name}
                            </option>
                        ))}
                    </select>
                    
            </div>
        </form>
    </div>
  )
}
