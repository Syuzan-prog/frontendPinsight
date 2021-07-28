import React, { useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import Option from './Option';
import options from './options';
import formMap from './formMap';

import styles from './AddDataModal.scss';

const SCROLL_OFFSET = 240;

const OptionCarousel = ({ selectedDataSource, setDataSource, onCloseModal, onOpenModal }) => {
    const optionsRef = useRef();

    const handleLeftScroll = useCallback(() => {
        const { current } = optionsRef;

        current.scroll({
            left: current.scrollLeft - SCROLL_OFFSET,
            behavior: 'smooth',
        });
    }, []);

    const handleRightScroll = useCallback(() => {
        const { current } = optionsRef;

        current.scroll({
            left: current.scrollLeft + SCROLL_OFFSET,
            behavior: 'smooth',
        });
    }, []);

    const Form = useMemo(() => formMap[selectedDataSource], [selectedDataSource]);

    return (
        <>
            <div className={styles.optionCarousel}>
                <KeyboardArrowLeftIcon className="m-r-24 pointer" onClick={handleLeftScroll} />
                <div className={styles.options} ref={optionsRef}>
                    {options.map((option) => (
                        <Option
                            key={`option-${option.name}`}
                            {...option}
                            onClick={setDataSource}
                            isSelected={selectedDataSource === option.name}
                        />
                    ))}
                </div>
                <KeyboardArrowRightIcon className="m-l-24 pointer" onClick={handleRightScroll} />
            </div>
            <div className={styles.formContainer}>
                <Form onCloseModal={onCloseModal} onOpenModal={onOpenModal} />
            </div>
        </>
    );
};

OptionCarousel.propTypes = {
    selectedDataSource: PropTypes.string,
    setDataSource: PropTypes.func.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    onOpenModal: PropTypes.func.isRequired,
};

export default OptionCarousel;
