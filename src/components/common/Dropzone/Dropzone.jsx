import React, { useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

import GetAppIcon from '@material-ui/icons/GetApp';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import mimeTypeMap from './mimeTypeMap';
import styles from './Dropzone.scss';

const Dropzone = ({ input: { name, onChange }, maxFiles, acceptFiles, uploadProgress }) => {
    const { getRootProps, getInputProps, open, acceptedFiles: files } = useDropzone({
        accept: acceptFiles,
        maxFiles,
        maxSize: 52428800, // 50MB
        noClick: true,
        noKeyboard: true,
    });

    useEffect(() => {
        onChange(files);
    }, [onChange, files]);

    const showProgress = useMemo(() => typeof uploadProgress === 'number', [uploadProgress]);

    return (
        <>
            <div {...getRootProps({ className: styles.dropzone })}>
                <input {...getInputProps()} name={name} />
                <GetAppIcon />
                <Typography variant="subtitle2" color="textSecondary" classes={{ root: 'm-t-12' }}>
                    Drag & Drop or
                    {' '}
                    <span className={styles.browseButton} onClick={open}>Browse</span>
                    {' '}
                    files to upload.
                </Typography>
            </div>
            {!!files.length && (
                <div className={styles.filesContainer}>
                    <div className={styles.fileRow}>
                        <img src={mimeTypeMap[acceptFiles]} alt="icon" />
                        <Typography variant="body1" color="textSecondary">
                            {files.length}
                            {' '}
                            {files.length === 1 ? 'file' : 'files'}
                            {' '}
                            selected
                        </Typography>
                        {showProgress && (
                            <div className={styles.progressContainer}>
                                <LinearProgress variant="determinate" value={uploadProgress} className={styles.progress} />
                                <Typography variant="body2" color="textSecondary">
                                    {uploadProgress}
                                    %
                                </Typography>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

Dropzone.propTypes = {
    input: PropTypes.shape({
        name: PropTypes.string,
        onChange: PropTypes.func,
    }),
    maxFiles: PropTypes.number,
    acceptFiles: PropTypes.string,
    uploadProgress: PropTypes.number,
};

export default Dropzone;
