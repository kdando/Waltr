// components/ObjectCard.js

import React, { useState } from 'react';
import { useContext } from 'react';
import { CollectionContext } from '../contexts/CollectionContext';
import { Card, CardMedia, CardContent, CardActions, Button, Typography } from '@mui/material';
import CustomModal from './Modal';

const ObjectCard = ({ object }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { collection, addToCollection, removeFromCollection } = useContext(CollectionContext);
    const isInCollection = collection.some((obj) => obj.objectID === object.objectID);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            {object.primaryImageSmall ? (
                <CardMedia
                    component="img"
                    height="194"
                    image={object.primaryImageSmall}
                    alt={object.title}
                    onClick={openModal}
                    style={{ cursor: 'pointer' }}
                />
            ) : (
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        No image available
                    </Typography>
                </CardContent>
            )}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {object.title}
                </Typography>
            </CardContent>
            <CardActions>
                {isInCollection ? (
                    <Button size="small" onClick={() => removeFromCollection(object.objectID)}>
                        Remove from Collection
                    </Button>
                ) : (
                    <Button size="small" onClick={() => addToCollection(object)}>
                        Add to Collection
                    </Button>
                )}
            </CardActions>
            <CustomModal isOpen={isModalOpen} onRequestClose={closeModal} content={object} />
        </Card>
    );
};

export default ObjectCard;