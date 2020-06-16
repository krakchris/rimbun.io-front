import React from 'react';
import { Button } from 'reactstrap';

const DeleteMap = () => {
        const { mapId, deleteMap, cancelDelete } = this.props;
        return (
            <div>
                <div className="d-flex flex-column align-items-center">
                    <b>Are you sure, you want to delete this map permanently?</b>
                </div>
                <Button
                    onClick={() => deleteMap(mapId)}
                    outline
                    color="danger"
                    size="sm"
                    className="width-50 mb-xs mr-xs mt-1 ml-4"
                >
                    yes
                </Button>
                <Button
                    onClick={() => cancelDelete(mapId)}
                    outline
                    color="success"
                    size="sm"
                    className="width-50 mb-xs mr-xs mt-1 ml-4"
                >
                    no
                </Button>
            </div>
        );
}


export default DeleteMap;