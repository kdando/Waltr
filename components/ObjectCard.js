// components/ObjectCard.js

import React, { useState } from 'react';
import { useContext } from 'react';
import { CollectionContext } from '../contexts/CollectionContext';
import { Card, CardMedia, CardContent, CardActions, Button, Typography } from '@mui/material';
import CustomModal from './Modal';
import Notification from './Notification';

const ObjectCard = ({ object }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
    const { collection, addToCollection, removeFromCollection } = useContext(CollectionContext);
    const isInCollection = collection.some((obj) => obj.objectID === object.objectID);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddToCollection = () => {
        addToCollection(object);
        const message = object.title
            ? `${object.title} was added to your collection.`
            : `This object was added to your collection.`;
        triggerNotification(message, 'success');
    };

    const handleRemoveFromCollection = () => {
        removeFromCollection(object.objectID);
        const message = object.title
            ? `${object.title} was removed from your collection.`
            : `This object was removed from your collection.`;
        triggerNotification(message, 'warning');
    };

    const triggerNotification = (message, severity) => {
        setNotification({ open: true, message, severity });
    };

    const closeNotification = () => {
        setNotification({ open: false, message: '', severity: 'info' });
    };

    return (
        <>
            <Card sx={{ maxWidth: 345, margin: 'auto' }}>
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
                            onClick={handleRemoveFromCollection}
                            aria-label={`Remove ${object.title} from collection`}
                        >
                            Remove from Collection
                        </Button>
                    ) : (
                        <Button
                            size="small"
                            onClick={handleAddToCollection}
                            aria-label={`Add ${object.title} to collection`}
                        >
                            Add to Collection
                        </Button>
                    )}
                </CardActions>
                <CustomModal isOpen={isModalOpen} onRequestClose={closeModal} content={object} />
            </Card>

            {/* Notification for adding/removing from collection */}
            <Notification
                open={notification.open}
                onClose={closeNotification}
                message={notification.message}
                severity={notification.severity}
            />
        </>
    );
};

export default ObjectCard;
