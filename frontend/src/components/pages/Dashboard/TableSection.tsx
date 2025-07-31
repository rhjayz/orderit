import React, { useEffect, useMemo } from "react";
import { Dropdown } from "bootstrap";
import { IoIosSearch } from "react-icons/io";
import { MdFilterList } from "react-icons/md";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FaAngleLeft, FaAngleRight, FaAngleUp } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import { filterTableDashboard } from "../../../services/Services";

interface FilterTableProps {
  filterSearch: string;
  isChecked: Record<string, boolean>;
  setFilterSearch: (search: string) => void;
  setIsChecked: (check: Record<string, boolean>) => void;
}

interface TableProps {
  data: TableData[];
  page: number;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalData: number;
  };
  filterShow: number;
  setPagination: (pages: {
    currentPage: number;
    totalPages: number;
    totalData: number;
  }) => void;
  setFilterShow: (show: number) => void;
  setPage: (page: number) => void;
}

interface TableData {
  id: number;
  menuName: string;
  branch: string;
  category: string;
  price: number;
  sales: number;
  qty: number;
  status: boolean;
}

export interface TableSectionProps {
  tableSection: {
    filterSearch: string;
    isChecked: Record<string, boolean>;
    page: number;
    pagination: {
      currentPage: number;
      totalPages: number;
      totalData: number;
    };
    filterShow: number;
  };
  setTableSection: React.Dispatch<
    React.SetStateAction<{
      filterSearch: string;
      isChecked: Record<string, boolean>;
      page: number;
      pagination: {
        currentPage: number;
        totalPages: number;
        totalData: number;
      };

      filterShow: number;
    }>
  >;
}

const FilterTable = ({
  filterSearch,
  isChecked,
  setFilterSearch,
  setIsChecked,
}: FilterTableProps) => {
  useEffect(() => {
    const dropdownBtn = document.querySelector("#dropdownFilter");

    if (dropdownBtn) {
      dropdownBtn.addEventListener("click", () => {
        console.log("Klik tombol berhasil!");
      });
      const dropdownInstance = new Dropdown(dropdownBtn, { autoClose: true });
      dropdownBtn.addEventListener("click", () => {
        dropdownInstance.toggle();
      });
      console.log("Dropdown event listener ditambah:", dropdownBtn);
    }
  }, []);

  return (
    <>
      <div className="col-md-12 p-3 mt-5 d-flex mb-0 pb-0">
        <div className="p-2 flex-fill">
          <p className="fs-6 fw-bold text-muted">Favorite Menu</p>
        </div>
        <div className="p-2 flex">
          <div className="dropdown-center">
            <button
              className="btn btn-outline-custom"
              type="button"
              data-bs-toggle="dropdown"
              id="dropdownFilter"
              aria-expanded="false"
            >
              <MdFilterList />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownFilter">
              {["stockCheckbox1", "stockCheckbox2"].map((key, index) => (
                <li key={index} className="dropdown-item">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={isChecked[key] || false}
                      onChange={(e) =>
                        setIsChecked({ ...isChecked, [key]: e.target.checked })
                      }
                      name={key}
                      id={key}
                    />
                    <label className="form-check-label">
                      {key === "stockCheckbox1" ? "Stock" : "Out of Stock"}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="p-2 flex">
          <div className="form-group position-relative">
            <input
              className="form-control text-muted"
              type="text"
              name="filterSearch"
              id="filterSearch"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
            />
            <IoIosSearch
              className="position-absolute text-muted top-50 end-0 translate-middle-y me-1 text-muted"
              size={25}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const TableBody = ({
  data,
  filterShow,
  setFilterShow,
  page,
  setPage,
  pagination,
}: TableProps) => {
  return (
    <>
      <div className="col-md-12 m-0 pe-4 px-4">
        <table className="table table-custom table-container text-center">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Menu Name</th>
              <th scope="col">Branch</th>
              <th scope="col">Category</th>
              <th scope="col">
                Price <HiArrowsUpDown />
              </th>
              <th scope="col">
                Sales <HiArrowsUpDown />
              </th>
              <th scope="col">
                Qty Sold <HiArrowsUpDown />
              </th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <tr key={data.id ?? `${data.menuName}-${index}`}>
                <td>{index + 1}</td>
                <td>{data.menuName}</td>
                <td>{data.branch}</td>
                <td>{data.category}</td>
                <td>{data.price}</td>
                <td>{data.sales}</td>
                <td>{data.qty}</td>
                <td>
                  <span
                    className={`fs-custom rounded-3 p-2 m-0 fw-bold ${
                      data.status === true
                        ? "bg-custom-success"
                        : "bg-custom-danger"
                    }`}
                  >
                    {data.status === true ? "In Stock" : "Out Of Stock"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-md-12 pe-4 px-4 mt-0 mb-5 d-flex justify-content-end">
        <div className="flex select-wrapper me-2">
          <select
            className="form-control form-select-sm custom-select "
            aria-label=".form-select-sm example"
            value={filterShow}
            onChange={(e) => setFilterShow(Number(e.target.value))}
          >
            <option value={5} className="fs-custom">
              5 pages
            </option>
            <option value={10} className="fs-custom">
              10 pages
            </option>
            <option value={50} className="fs-custom">
              50 pages
            </option>
            <option value={100} className="fs-custom">
              100 pages
            </option>
          </select>
          <div className="custom-arrow justify-content-end">
            <FaAngleUp className="custom-arrow" />
          </div>
        </div>
        <div className="flex">
          <div
            className="btn-group btn-group-sm"
            role="group"
            aria-label="Basic example"
          >
            <div className="border pe-3 ps-3 pt-1 rounded-start bg-white fs-custom">
              {pagination.currentPage} of {pagination.totalPages}
            </div>
            <button
              type="button"
              className="btn btn-outline-custom fs-custom"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <FaAngleLeft />
            </button>
            <button
              type="button"
              className="btn btn-outline-custom fs-custom"
              disabled={page === pagination.totalPages}
              onClick={() => setPage(page + 1)}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const TableSection: React.FC<TableSectionProps> = ({
  tableSection,
  setTableSection,
}) => {
  const { user } = useAuth();
  const userId = user?.id || "";

  const dataArray = {
    userId,
    filterSearch: tableSection.filterSearch,
    page: tableSection.page,
    isChecked: tableSection.isChecked,
    filterShow: tableSection.filterShow,
  };

  const dataTable = async () => {
    try {
      await filterTableDashboard(dataArray);
    } catch (error) {
      const errMsg = (error as any)?.response?.data?.error || "ERROR";
      console.log("error:", errMsg);
    }
  };

  const data = useMemo(
    () => [
      {
        id: 1,
        menuName: "Seafood",
        branch: "Bogor",
        category: "Food",
        price: 45000,
        sales: 180000,
        qty: 4,
        status: true,
      },
      {
        id: 2,
        menuName: "Es Teh",
        branch: "Sumedang",
        category: "Drink",
        price: 15000,
        sales: 65000,
        qty: 4,
        status: false,
      },
      {
        id: 3,
        menuName: "Es Jeruk",
        branch: "Bogor",
        category: "Drink",
        price: 20000,
        sales: 80000,
        qty: 4,
        status: true,
      },
      {
        id: 4,
        menuName: "Ramen",
        branch: "Sumedang",
        category: "Food",
        price: 55000,
        sales: 110000,
        qty: 4,
        status: false,
      },
      {
        id: 5,
        menuName: "Seafood",
        branch: "Bogor",
        category: "Food",
        price: 45000,
        sales: 180000,
        qty: 4,
        status: true,
      },
      {
        id: 6,
        menuName: "Es Teh",
        branch: "Sumedang",
        category: "Drink",
        price: 15000,
        sales: 65000,
        qty: 4,
        status: false,
      },
      {
        id: 7,
        menuName: "Es Jeruk",
        branch: "Bogor",
        category: "Drink",
        price: 20000,
        sales: 80000,
        qty: 4,
        status: true,
      },
      {
        id: 8,
        menuName: "Ramen",
        branch: "Sumedang",
        category: "Food",
        price: 55000,
        sales: 110000,
        qty: 4,
        status: false,
      },
      {
        id: 9,
        menuName: "Seafood",
        branch: "Bogor",
        category: "Food",
        price: 45000,
        sales: 180000,
        qty: 4,
        status: true,
      },
      {
        id: 10,
        menuName: "Es Teh",
        branch: "Sumedang",
        category: "Drink",
        price: 15000,
        sales: 65000,
        qty: 4,
        status: false,
      },
      {
        id: 11,
        menuName: "Es Jeruk",
        branch: "Bogor",
        category: "Drink",
        price: 20000,
        sales: 80000,
        qty: 4,
        status: true,
      },
      {
        id: 12,
        menuName: "Ramen",
        branch: "Sumedang",
        category: "Food",
        price: 55000,
        sales: 110000,
        qty: 4,
        status: false,
      },
    ],
    []
  );

  useEffect(() => {
    dataTable();
  }, []);
  return (
    <>
      <div className="container-fluid">
        <FilterTable
          filterSearch={tableSection.filterSearch}
          isChecked={tableSection.isChecked}
          setFilterSearch={(search) =>
            setTableSection((prev) => ({ ...prev, filterSearch: search }))
          }
          setIsChecked={(check) =>
            setTableSection((prev) => ({ ...prev, isChecked: check }))
          }
        />
        <TableBody
          data={data}
          pagination={tableSection.pagination}
          filterShow={tableSection.filterShow}
          page={tableSection.page}
          setPagination={(pages) =>
            setTableSection((prev) => ({ ...prev, pagination: pages }))
          }
          setFilterShow={(show) =>
            setTableSection((prev) => ({ ...prev, filterShow: show }))
          }
          setPage={(page) =>
            setTableSection((prev) => ({ ...prev, filterShow: page }))
          }
        />
      </div>
    </>
  );
};

export default TableSection;
