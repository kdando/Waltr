// pages/my-collection.js

import React, { useState, useContext } from 'react';
import { CollectionContext } from '../contexts/CollectionContext';
import ObjectCard from '../components/ObjectCard';
import { Typography, Box, Modal } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useSession } from 'next-auth/react';

const MyCollection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const { collection } = useContext(CollectionContext);

    const { data: session } = useSession();

    const openModal = (object) => {
        setModalContent(object);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Box
                component="main"
                sx={{
                    minHeight: '100vh',
                    padding: { xs: 2, md: 4 },
                    textAlign: 'center'
                }}
            >
                <Typography variant="h1" component="h1" gutterBottom aria-label="My Collection">
                    {session ? `${session.user.name}'s Collection` : 'My Collection'}
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                    {collection.map((object, index) => (
                        <Grid xs={12} sm={6} md={4} key={index}>
                            <ObjectCard object={object} onImageClick={openModal} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Modal
                open={isModalOpen}
                onClose={closeModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box sx={{ bgcolor: 'background.paper', padding: 4, borderRadius: 2 }}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        {modalContent.name}
                    </Typography>
                    <Typography id="modal-description" variant="body2" component="p">
                        {modalContent.description}
                    </Typography>
                </Box>
            </Modal>
        </>
    );
};

export default MyCollection;
