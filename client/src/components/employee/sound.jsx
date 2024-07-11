import React, { useEffect, useRef } from 'react';

const NotificationSound = ({ playSound }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (playSound && audioRef.current) {
            audioRef.current.play().catch(error => {
                console.log('Error playing sound:', error);
            });
        }
    }, [playSound]);

    return (
        <audio ref={audioRef} src="/assets/sound.mp3" preload="auto">
            Your browser does not support the audio element.
        </audio>
    );
};

export default NotificationSound;