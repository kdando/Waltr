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
        <Card sx={{ maxWidth: 345, margin: 'auto' }}> {/* Centering the card for better alignment */}
            {object.primaryImageSmall ? (
                <CardMedia
                    component="img"
                    height="194"
                    image={object.primaryImageSmall}
                    alt={object.title || 'Artefact image'}
                    onClick={openModal}
                    style={{ cursor: 'pointer' }}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') openModal();
                    }}
                />
            ) : (
                <CardContent>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        onClick={openModal}
                        sx={{
                            cursor: 'pointer',
                            fontSize: '18px',
                            whiteSpace: 'pre-wrap',
                            textAlign: 'center',
                            minHeight: '194px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') openModal();
                        }}
                    >
                        No image{"\n"}available
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
                    <Button
                        size="small"
                        onClick={() => removeFromCollection(object.objectID)}
                        aria-label={`Remove ${object.title} from collection`}
                    >
                        Remove from Collection
                    </Button>
                ) : (
                    <Button
                        size="small"
                        onClick={() => addToCollection(object)}
                        aria-label={`Add ${object.title} to collection`}
                    >
                        Add to Collection
                    </Button>
                )}
            </CardActions>
            <CustomModal isOpen={isModalOpen} onRequestClose={closeModal} content={object} />
        </Card>
    );
};

export default ObjectCard;
