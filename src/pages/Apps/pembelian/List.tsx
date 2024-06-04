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
        dispatch(setPageTitle('Pembelian'));
    });
    
    const [items, setItems] = useState([
        {
            id: 1,
            kontak: 'John Doe',
            no_pemesanan: 'PP001',
            jenis: 'penjualan',
            tgl_transaksi: '15 Dec 2020',
            status: { tooltip: 'Selesai', color: 'success' },
        },
        {
            id: 2,
            kontak: 'Jane Smith',
            no_pemesanan: 'PP002',
            jenis: 'penjualan',
            tgl_transaksi: '18 Dec 2020',
            status: { tooltip: 'Selesai', color: 'warning' },
        },
        {
            id: 3,
            kontak: 'Robert Brown',
            no_pemesanan: 'NP003',
            jenis: 'penjualan',
            tgl_transaksi: '20 Dec 2020',
            status: { tooltip: 'Belum Dibayar', color: 'info' },
        },
        {
            id: 4,
            kontak: 'Emily Davis',
            no_pemesanan: 'NP004',
            jenis: 'penjualan',
            tgl_transaksi: '22 Dec 2020',
            status: { tooltip: 'Belum Dibayar', color: 'danger' },
        },
        {
            id: 5,
            kontak: 'Michael Wilson',
            no_pemesanan: 'NP005',
            jenis: 'penjualan',
            tgl_transaksi: '24 Dec 2020',
            status: { tooltip: 'Selesai', color: 'success' },
        },
        {
            id: 6,
            kontak: 'Sarah Johnson',
            no_pemesanan: 'PP006',
            jenis: 'penjualan',
            tgl_transaksi: '26 Dec 2020',
            status: { tooltip: 'Belum Dibayar', color: 'warning' },
        },
        {
            id: 7,
            kontak: 'David Lee',
            no_pemesanan: 'PP007',
            jenis: 'penjualan',
            tgl_transaksi: '28 Dec 2020',
            status: { tooltip: 'Selesai', color: 'info' },
        },
        {
            id: 8,
            kontak: 'Emma White',
            no_pemesanan: 'PP008',
            jenis: 'penjualan',
            tgl_transaksi: '30 Dec 2020',
            status: { tooltip: 'Belum Dibayar', color: 'danger' },
        },
        {
            id: 9,
            kontak: 'Daniel Martin',
            no_pemesanan: 'PP009',
            jenis: 'penjualan',
            tgl_transaksi: '02 Jan 2021',
            status: { tooltip: 'Selesai', color: 'success' },
        },
        {
            id: 10,
            kontak: 'Olivia Harris',
            no_pemesanan: 'PP010',
            jenis: 'penjualan',
            tgl_transaksi: '04 Jan 2021',
            status: { tooltip: 'Selesai', color: 'warning' },
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
    const [initialRecords, setInitialRecords] = useState(sortBy(items, 'invoice'));
    const [records, setRecords] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'firstName',
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
                    item.no_pemesanan.toLowerCase().includes(search.toLowerCase()) ||
                    item.kontak.toLowerCase().includes(search.toLowerCase()) ||
                    item.tgl_transaksi.toLowerCase().includes(search.toLowerCase()) ||
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
            <div className="invoice-table">
                <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div className="flex items-center gap-2">
                        <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
                            <IconTrashLines />
                            Delete
                        </button>
                        <Link to="/apps/pembelian/add" className="btn btn-primary gap-2">
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
                        className="whitespace-nowrap table-hover no_pemesanan-table"
                        records={records}
                        columns={[
                            {
                                accessor: 'no_pemesanan',
                                sortable: true,
                                render: ({ no_pemesanan }) => (
                                    <NavLink to="/apps/pembelian/preview">
                                        <div className="text-primary underline hover:no-underline font-semibold">{`#${no_pemesanan}`}</div>
                                    </NavLink>
                                ),
                            },
                            {
                                accessor: 'pemasok',
                                sortable: true,
                                render: ({ kontak, id }) => (
                                    <div className="flex items-center font-semibold">
                                        <div>{kontak}</div>
                                    </div>
                                ),
                            },
                            {
                                accessor: 'tgl_transaksi',
                                sortable: true,
                            },
                            {
                                accessor: 'status',
                                sortable: true,
                                render: ({ status }) => <span className={`badge badge-outline-${status.color} `}>{status.tooltip}</span>,
                            },
                            {
                                accessor: 'action',
                                title: 'Actions',
                                sortable: false,
                                textAlignment: 'center',
                                render: ({ id }) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                        <NavLink to="/apps/pembelian/edit" className="flex hover:text-info">
                                            <IconEdit className="w-4.5 h-4.5" />
                                        </NavLink>
                                        <NavLink to="/apps/invoice/preview" className="flex hover:text-primary">
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
