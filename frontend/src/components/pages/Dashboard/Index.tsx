import { useState } from "react";
import FilterSection from "./FilterSection";
import ResultSection from "./ResultSection";
import TableSection from "./TableSection";



function Dashboard() {
    const [filterSection, setFilterSection] = useState({
        selectedBranch: "",
        activeButton: "Today" as 'Today' | 'This Week' | 'This Month',
        selectedDate: null as Date | null
    })

    const [tableSection, setTableSection] = useState({
        filterSearch: "" as string,
        isChecked: {} as Record<string, boolean>,
        page: 1 as number,
        pagination: {
            currentPage: 1 as number,
            totalPages: 1 as number,
            totalData: 0 as number,  
        },
        filterShow: 10 as number,  
    });

    return (
        <>
            <section className="Filter">
                <FilterSection filterSection={filterSection} setFilterSection={setFilterSection} />
            </section>
            <section className="Result">
                <ResultSection filterSection={ filterSection } />
            </section>
            <section className="Table">
                <TableSection tableSection={tableSection} setTableSection={setTableSection} />
            </section>
        </>
    )
};

export default Dashboard;