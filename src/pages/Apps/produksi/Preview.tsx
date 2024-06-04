import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconSend from '../../../components/Icon/IconSend';
import IconPrinter from '../../../components/Icon/IconPrinter';
import IconDownload from '../../../components/Icon/IconDownload';
import IconEdit from '../../../components/Icon/IconEdit';
import IconPlus from '../../../components/Icon/IconPlus';

const Preview = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice Preview'));
    });
    const exportTable = () => {
        window.print();
    };

    const items = [
        {
            id: 1,
            title: 'Rajangan Temulawak',
            quantity: 1,
            price: '15000',
            amount: '15000',
        },
        {
            id: 2,
            title: 'Rajangan Kunir',
            quantity: 1,
            price: '12000',
            amount: '12000',
        },
        {
            id: 3,
            title: 'Tepung Murni Temulawak',
            quantity: 1,
            price: '50000',
            amount: '50000',
        },
        {
            id: 4,
            title: 'Tepung Murni Kunir',
            quantity: 1,
            price: '45000',
            amount: '45000',
        },
    ];
    

    const columns = [
        {
            key: 'id',
            label: 'S.NO',
        },
        {
            key: 'title',
            label: 'BARANG',
        },
        {
            key: 'quantity',
            label: 'BANYAK',
        },
        {
            key: 'price',
            label: 'HARGA',
            class: 'ltr:text-right rtl:text-left',
        },
        {
            key: 'amount',
            label: 'TOTAL',
            class: 'ltr:text-right rtl:text-left',
        },
    ];

    return (
        <div>
            <div className="flex items-center lg:justify-end justify-center flex-wrap gap-4 mb-6">
                <button type="button" className="btn btn-primary gap-2" onClick={() => exportTable()}>
                    <IconPrinter />
                    Print
                </button>

                <button type="button" className="btn btn-success gap-2">
                    <IconDownload />
                    Download
                </button>

                <Link to="/apps/invoice/add" className="btn btn-secondary gap-2">
                    <IconPlus />
                    Create
                </Link>

                <Link to="/apps/invoice/edit" className="btn btn-warning gap-2">
                    <IconEdit />
                    Edit
                </Link>
            </div>
            <div className="panel">
                <div className="flex justify-between flex-wrap gap-4 px-4">
                    <div className="text-2xl font-semibold uppercase">Tagihan </div>
                </div>
                <div className=" px-4">
                    <div className="space-y-1 mt-6 text-white-dark">
                        <div><b>GUDANG REMPAH REMPAH DAN PRODUKSI PAKAN TERNAK "BLEDUK KUNIR"</b></div>
                        <div>Jl. Perniagaan No.123, Pondok, Kec. Babadan, Kabupaten Ponorogo, Jawa Timur 63491</div>
                        <div>+62 08819839469</div>
                    </div>
                </div>

                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <div className="flex justify-between lg:flex-row flex-col gap-6 flex-wrap">
                    <div className="flex-1">
                        <div className="space-y-1 text-white-dark">
                            <div>Untuk:</div>
                            <div className="text-black dark:text-white font-semibold">John Doe</div>
                            <div>Semarang, indonesia</div>
                            <div>+62 812 3456 7895</div>
                        </div>
                    </div>
                    <div className="flex justify-between sm:flex-row flex-col gap-6 lg:w-2/3">
                        <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">No Pemesanan :</div>
                                <div>#NP001</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Tgl transaksi :</div>
                                <div>13 Sep 2022</div>
                            </div>
                            <div className="flex items-center w-full justify-between">
                                <div className="text-white-dark">Pengiriman ID :</div>
                                <div>#SHP-8594</div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="table-responsive mt-6">
                    <table className="table-striped">
                        <thead>
                            <tr>
                                {columns.map((column) => {
                                    return (
                                        <th key={column.key} className={column?.class}>
                                            {column.label}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.quantity}</td>
                                        <td className="ltr:text-right rtl:text-left">RP {item.price}</td>
                                        <td className="ltr:text-right rtl:text-left">RP {item.amount}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="grid sm:grid-cols-2 grid-cols-1 px-4 mt-6">
                    <div></div>
                    <div className="ltr:text-right rtl:text-left space-y-2">
                        <div className="flex items-center">
                            <div className="flex-1">Subtotal</div>
                            <div className="w-[37%]">RP 3255</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Shipping Rate</div>
                            <div className="w-[37%]">RP 0</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Discount</div>
                            <div className="w-[37%]">RP 10</div>
                        </div>
                        <div className="flex items-center font-semibold text-lg">
                            <div className="flex-1">Grand Total</div>
                            <div className="w-[37%]">RP 3945</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preview;
