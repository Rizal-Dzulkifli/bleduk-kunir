import { Link, NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import IconPlus from '../../../components/Icon/IconPlus';
import IconEdit from '../../../components/Icon/IconEdit';
import IconEye from '../../../components/Icon/IconEye';

const List = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Expense List'));
    });
    const [items, setItems] = useState([
        {
            id: 1,
            jenis: 'Operasional',
            deskripsi: 'Pembelian bahan bakar',
            tanggal: '15 Dec 2020',
            total: '5.000.000',
            status: { tooltip: 'Selesai', color: 'success' },
        },
        {
            id: 2,
            jenis: 'Gaji',
            deskripsi: 'Gaji karyawan bulan Desember',
            tanggal: '18 Dec 2020',
            total: '30.000.000',
            status: { tooltip: 'Selesai', color: 'success' },
        },
        {
            id: 3,
            jenis: 'Operasional',
            deskripsi: 'Biaya perawatan mesin',
            tanggal: '20 Dec 2020',
            total: '15.000.000',
            status: { tooltip: 'Belum Dibayar', color: 'danger' },
        },
        {
            id: 4,
            jenis: 'Pemasaran',
            deskripsi: 'Biaya iklan online',
            tanggal: '22 Dec 2020',
            total: '10.000.000',
            status: { tooltip: 'Dikirim', color: 'info' },
        },
        {
            id: 5,
            jenis: 'Operasional',
            deskripsi: 'Pembelian alat tulis kantor',
            tanggal: '24 Dec 2020',
            total: '2.500.000',
            status: { tooltip: 'Selesai', color: 'success' },
        },
        {
            id: 6,
            jenis: 'Gaji',
            deskripsi: 'Bonus karyawan akhir tahun',
            tanggal: '26 Dec 2020',
            total: '22.000.000',
            status: { tooltip: 'Produksi', color: 'warning' },
        },
        {
            id: 7,
            jenis: 'Operasional',
            deskripsi: 'Pembayaran listrik',
            tanggal: '28 Dec 2020',
            total: '3.500.000',
            status: { tooltip: 'Belum Dibayar', color: 'danger' },
        },
        {
            id: 8,
            jenis: 'Pemasaran',
            deskripsi: 'Pengeluaran untuk event pameran',
            tanggal: '30 Dec 2020',
            total: '45.000.000',
            status: { tooltip: 'Dikirim', color: 'info' },
        },
    ]);

    const deleteRow = (id: any = null) => {
        if (window.confirm('Are you sure want to delete selected row ?')) {
            if (id) {
                setRecords(items.filter((user) => user.id !== id));
                setInitialRecords(items.filter((user) => user.id !== id));
                setItems(items.filter((user) => user.id !== id));
                setSearch('');
                setSelectedRecords([]);
            } else {
                let selectedRows = selectedRecords || [];
                const ids = selectedRows.map((d: any) => {
                    return d.id;
                });
                const result = items.filter((d) => !ids.includes(d.id as never));
                setRecords(result);
                setInitialRecords(result);
                setItems(result);
                setSearch('');
                setSelectedRecords([]);
                setPage(1);
            }
        }
    };

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(items, 'jenis'));
    const [records, setRecords] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'jenis',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return items.filter((item) => {
                return (
                    item.jenis.toLowerCase().includes(search.toLowerCase()) ||
                    item.deskripsi.toLowerCase().includes(search.toLowerCase()) ||
                    item.tanggal.toLowerCase().includes(search.toLowerCase()) ||
                    item.status.tooltip.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        setPage(1);
    }, [sortStatus]);

    return (
        <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
            <div className="expense-table">
                <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div className="flex items-center gap-2">
                        <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
                            <IconTrashLines />
                            Delete
                        </button>
                        <Link to="/apps/pengeluaran/add" className="btn btn-primary gap-2">
                            <IconPlus />
                            Add New
                        </Link>
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                <div className="datatables pagination-padding">
                    <DataTable
                        className="whitespace-nowrap table-hover expense-table"
                        records={records}
                        columns={[
                            {
                                accessor: 'jenis',
                                sortable: true,
                            },
                            {
                                accessor: 'deskripsi',
                                sortable: true,
                            },
                            {
                                accessor: 'tanggal',
                                sortable: true,
                            },
                            {
                                accessor: 'total',
                                sortable: true,
                                render: ({ total }) => <div>{`RP ${total}`}</div>,
                            },

                            {
                                accessor: 'action',
                                title: 'Actions',
                                sortable: false,
                                textAlignment: 'center',
                                render: ({ id }) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                        <NavLink to="/apps/pengeluaran/edit" className="flex hover:text-info">
                                            <IconEdit className="w-4.5 h-4.5" />
                                        </NavLink>
                                        <NavLink to="/apps/pengeluaran/preview" className="flex hover:text-primary">
                                            <IconEye />
                                        </NavLink>
                                        <button type="button" className="flex hover:text-danger" onClick={(e) => deleteRow(id)}>
                                            <IconTrashLines />
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        highlightOnHover
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        selectedRecords={selectedRecords}
                        onSelectedRecordsChange={setSelectedRecords}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default List;
