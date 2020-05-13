
import React from 'react';
import cx from 'classnames';
import {
    Table as TableView
} from 'reactstrap';
import s from './Userlist.module.scss'

const TableComponent = (props) => {
    const { data } = props;
    const getKeys = () => {
        return Object.keys(data[0]).filter((key, index) =>
            (key === 'email' || key === 'name') ? key : null
        )
    };

    const getHeader = () => {
        const keys = getKeys();
        return keys.map((key, index) => <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>);
    };

    const getRowsData = () => {
        const items = data;
        const keys = getKeys();
        return items.map((row, index) => (
            <tr key={row.Units}>
                <RenderRow data={row} keys={keys} />
                <td>
                    <span className="py-0 px-1 bg-success rounded text-white">active</span>
                </td>
            </tr>

        ));
    };

    return (
        <>
         
                    <TableView responsive borderless className={cx('mb-0', s.usersTable)}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        {(data.length!==0) ? getRowsData() : <tr><td colSpan="3">No User Available</td></tr>}
                            
                            
                        </tbody>
                    </TableView>
                
        </>
    );
};


export default TableComponent;


const RenderRow = (props) => {
    const { data, keys } = props;
    return (
        keys.map((key, index) => (
            <td
                key={data[key]}
            >
                {data[key]}
            </td>
        ))
    );
};