import { ReactNode, useEffect, useState } from "react";
import { ResultSectionProps } from "./FilterSection";
import { MdOutlineCreditCard } from "react-icons/md";
import { MdOutlineReceiptLong } from "react-icons/md";
import { useMobile } from "../../../context/MobileContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from "../../../context/AuthContext";
import { filterCardDashboard } from "../../../services/Services";
import { formatRupiah } from "../../../utils/IDRHelper";
import { chartDataDashboard } from "../../../services/Services";

interface CardProps {
    title: string,
    value: string,
    icon: ReactNode
}

interface ChartProps{
    data: { year: string, totalPrice: number }[],
}

const Card = ({ title, value, icon }: CardProps) => {
    return (
            <div className=" col-md-6 col-lg-4 mt-3">
                <div className="card border rounded-4">
                    <div className="card-body p-4">
                        <p className="d-flex p-0 m-0"><b className="flex-fill text-muted">{title}</b><span className="rounded-2 bg-custom-gray">{ icon }</span></p>
                        <p className="p-0 m-0">{ value }</p>
                    </div>
                </div>
            </div>      
    );
};

const Chart = ({ data }: ChartProps) => {
     const { isMobile } = useMobile();
    return (
        <ResponsiveContainer  width={ isMobile ? "90%" : "100%"} height={isMobile ? 250 : 300}   className="mt-4 m-0 p-0">
            <BarChart data={data} className="rounded-2" >
                <XAxis dataKey="year" axisLine={false} tickLine={false}/>
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(totalPrice) => `${totalPrice / 1_000_000} jt`}
                    tickCount={6}
                    domain={[0, 30_000_000]} 
                />
                <Tooltip formatter={(totalPrice) => `Rp. ${totalPrice.toLocaleString()}`}/>
                <Bar dataKey="totalPrice" fill="#d9d9d9"  radius={[10, 10, 10, 10]}/>
            </BarChart>
        </ResponsiveContainer>
    );
};


const ResultSection: React.FC<ResultSectionProps> = ({ filterSection }) => {
    const { isMobile } = useMobile();
    const { user } = useAuth();
    const userId = user?.id || "" ;
    const [value, setValue] = useState<any>(0);
    const [chartVal, setChartVal] = useState<any>();
    let errorMsg;
    const dataArray = {
        userId,
        selectedBranch: filterSection.selectedBranch,
        activeButton: filterSection.activeButton,
        selectedDate:  filterSection.selectedDate? new Date(filterSection.selectedDate) : null,
    };

    const diagramData = async () => {
        try {
            const response = await chartDataDashboard({ userId });
            setChartVal(response.data);
        } catch (error) {
            errorMsg = (error as any)?.response?.data?.error || 'error';
            console.log(errorMsg);
        }
    }

    const viewData = async () => {
                if (!userId) return;
            try {
                const response = await filterCardDashboard(dataArray); 
                setValue(response.data);
    
                } catch (error) {
                errorMsg = (error as any)?.response?.data?.error || "Error!";
                console.log("error", errorMsg);
                }
    }
    
    const sum = formatRupiah(value.totalPrice || 0);
    const count = value.order || 0;
    const cardData =  [
        { title: "Income", value:sum , icon: <MdOutlineCreditCard size={25} /> },
        { title: "Orders", value:count, icon: <MdOutlineReceiptLong size={25} /> },
    ]

    
    useEffect(() => {
        viewData();
        diagramData();
    },[userId,filterSection.selectedBranch, filterSection.activeButton, filterSection.selectedDate])
    return (
        <>
            <div className={`${isMobile ? "gap-3 mt-4" : "mx-4"}`}>
                <div className="col-md-12 row mb-5">
                {cardData.map((data, index) => (
                    <Card key={index} title={data.title} icon={data.icon} value={data.value} />
                ))}
                </div>
                <div className="col-md-12">
                <Chart data={chartVal} /> 
                </div>
        </div>
        </>
    )
}

export default ResultSection;