import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import { LoaderContainer } from 'components/common/Loader';

import SegmentsList from './SegmentsList';
import Suggestions from './Suggestions';
import ScenarioAnalysis from './ScenarioAnalysis';
import SegmentPerformance from './SegmentPerformance';

const SegmentsPage = ({ segments, isLoading, fetchSuggestions }) => {
    const [selectedSegment, setSelectedSegment] = useState(segments[0]);

    useEffect(() => {
        fetchSuggestions();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setSelectedSegment(segments[0]);
    }, [segments]);

    return (
        <LoaderContainer isLoading={isLoading}>
            <div>
                <SegmentsList selectedSegment={selectedSegment} setSelectedSegment={setSelectedSegment} />
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <Suggestions segmentId={selectedSegment?.id} />
                    </Grid>
                    <Grid item md={7}>
                        <ScenarioAnalysis />
                    </Grid>
                    <Grid item md={5}>
                        <SegmentPerformance />
                    </Grid>
                </Grid>
            </div>
        </LoaderContainer>
    );
};

SegmentsPage.propTypes = {
    segments: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
    })),
    isLoading: PropTypes.bool.isRequired,
    fetchSuggestions: PropTypes.func.isRequired,
};

SegmentsPage.defaultProps = {
    segments: [],
};

export default SegmentsPage;
