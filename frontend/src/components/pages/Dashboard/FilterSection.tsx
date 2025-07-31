import DatePicker from "react-datepicker";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import "react-datepicker/dist/react-datepicker.css";
import { useMobile } from "../../../context/MobileContext";
import { useAuth } from "../../../context/AuthContext";
import { indexDashboard } from "../../../services/Services";
import { useEffect, useState } from "react";

type FilterType = 'Today' | 'This Week' | 'This Month';

interface ButtonGroupProps {
    activeButton: FilterType;
    setActiveButton: (label: FilterType) => void;
}

interface BranchProps {
    selectedBranch: string;
    setSelectedBranch: (branch: string) => void;
    data: {
        id: string,
        codeBranch: string
    }[];
}

interface DatePickProps {
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
}

export interface FilterSectionProps {
    filterSection: {
        selectedBranch: string;
        activeButton: FilterType;
        selectedDate: Date | null;
    };
    setFilterSection: React.Dispatch<React.SetStateAction<{
        selectedBranch: string;
        activeButton: FilterType;
        selectedDate: Date | null;
    }>>;
}

export interface ResultSectionProps {
    filterSection: {
        selectedBranch: string;
        activeButton: FilterType;
        selectedDate: Date | null;
    };
}

const Branch = ({ selectedBranch, setSelectedBranch, data }: BranchProps) => { 
    
    return (
        <div className="form-group position-relative">
            <select className="form-select pe-3 text-muted"
                    name="branch"
                    id="branch"
                    value={selectedBranch}
                    onChange={(e)=>setSelectedBranch(e.target.value)}
            >
                <option value="">All Branch</option>
                {data?.map((data, index) => (
                    <option key={index} value={ data.id } >{data.codeBranch}</option>
                ))}       
            </select>
        </div>   
    )
}

const ButtonGroup = ({ activeButton, setActiveButton }: ButtonGroupProps) => {
    const filters: FilterType[] = ["Today", "This Week", "This Month"];
    return (
        <div className="btn-group">
            {filters.map((label) => (
                <button
                    key={label}
                    className={`btn btn-outline-custom ${activeButton === label ? "active" : ""} `}
                    onClick={()=>setActiveButton(label as FilterType)}
                >
                { label }
                </button>
            ))}
        </div>
    )
}

const DatePick = ({ selectedDate, setSelectedDate }: DatePickProps)=>{
    return (
            <div className="form-group position-relative">
                <DatePicker className="form-control pe-5" selected={selectedDate} onChange={(date)=>setSelectedDate(date)} placeholderText="Choose Date" isClearable showYearDropdown scrollableMonthYearDropdown />
                <FaRegCalendarAlt className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted bg-muted"/>
            </div>
    )
}

const FilterSection: React.FC<FilterSectionProps> = ({ filterSection, setFilterSection }) => {
    const { isMobile } = useMobile();
    const { user } = useAuth();
    const userId = user?.id || "" ;
    const [data, setData] = useState<any[]>([]);
        
        const fetch = async () => {
        if (!userId) return;
        try {
            const response = await indexDashboard({ userId });
            
            setData(response.data);
            
        } catch (error) {
            const errMessage = (error as any)?.response?.data.message || "Error!";
            console.log('Error:',errMessage);
        }
    }

    useEffect(() => {
        fetch();
    },[userId, filterSection.selectedBranch, filterSection.activeButton, filterSection.selectedDate])
    return (
        <div className='container-fluid bg-white'>
            {/* Mobile */}
                <div className={ isMobile ? "d-block":"d-none"}>
                    <button type="button" className="btn btn-outline-custom w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <CiFilter className="" />Filter
                    </button>
                    <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Filter</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="d-grid gap-3">
                                        <div className="d-flex mb-3">
                                            <label htmlFor="" className="me-0 mt-2 w-25 text-start">Branch</label>
                                              <Branch 
                                                selectedBranch={filterSection.selectedBranch} 
                                                setSelectedBranch={(branch) => setFilterSection(prev => ({ ...prev, selectedBranch: branch }))}
                                                data={data}        
                                        />
                                        </div>
                                        <div className="d-flex mb-3">
                                            <label htmlFor="" className="me-0 mt-2 w-25 text-start">When</label>
                                               <ButtonGroup 
                                                activeButton={filterSection.activeButton} 
                                                setActiveButton={(label) => setFilterSection(prev => ({ ...prev, activeButton: label }))}
                                                />         
                                        </div>
                                        <div className="d-flex">
                                            <label htmlFor="" className="me-0 mt-2 w-25 text-start">Date</label>
                                               <DatePick 
                                                selectedDate={filterSection.selectedDate} 
                                                setSelectedDate={(date) => setFilterSection(prev => ({ ...prev, selectedDate: date }))}
                                                />       
                                        </div>
                                      </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            {/* End Mobile */}
            {/* Dekstop */}
            <div className={ !isMobile ? "d-flex mb-5 pb-2 pt-2 justify-content-center" : "d-none"}>
                <div className="p-2 flex-fill">
                    Filter
                </div>
                <div className="p-1 flex-fill">
                    <Branch 
                        selectedBranch={filterSection.selectedBranch} 
                        setSelectedBranch={(branch) => setFilterSection(prev => ({ ...prev, selectedBranch: branch }))}
                        data={data}
                    />
                </div>
                <div className="p-1 flex">
                    <ButtonGroup 
                        activeButton={filterSection.activeButton} 
                        setActiveButton={(label) => setFilterSection(prev => ({ ...prev, activeButton: label }))}
                    />            
                </div>
                <div className="p-1 flex">
                    <DatePick 
                        selectedDate={filterSection.selectedDate} 
                        setSelectedDate={(date) => setFilterSection(prev => ({ ...prev, selectedDate: date }))}
                    />
                </div>
            </div>
            {/* End Dekstop */}
        </div>
    );
};


export default FilterSection;
