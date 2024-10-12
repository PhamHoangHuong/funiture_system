import React from 'react';
// import { useParams } from 'react-router-dom';
// import DataTable from 'datatables.net-react';
// import DT from 'datatables.net-dt';

// DataTable.use(DT);

// const headers = [
//     {
//         name: 'Name',
//         value: 'name'
//     },
//     {
//         name: 'Location',
//         value: 'location'
//     }
// ]

const ProductEdit: React.FC = () => {
    // const { id } = useParams<{ id: string }>();

    return (

        <div>
            {/* <p className='text center'>Trang sửa sản phẩm - ID: {id}</p> */}
            {/* <DataTable>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header.name}</th>
                        ))}
                    </tr>
                </thead>
            </DataTable> */}
        </div >
    );
};

export default ProductEdit;