import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import List from '@material-ui/core/List';

import starterSvg from 'resources/assets/svg/STARTER.svg';
import basicSvg from 'resources/assets/svg/BASIC.svg';
import standardSvg from 'resources/assets/svg/STANDARD.svg';
import proSvg from 'resources/assets/svg/PRO.svg';
import PlansCard from './PlansCard';
import CurrentPlan from './CurrentPlan';

import styles from './PlansAndBilling.scss';

const PlansAndBilling = () => (
    <div className={styles.block}>
        <Typography variant="subtitle1" className={styles.title}>
            Select a Plan
        </Typography>
        <Typography variant="body2" color="textSecondary">
            Great staff, let&apos;s get you upgrated!
        </Typography>

        <div className={styles.blockPlans}>
            <Grid container spacing={3} className={styles.gridContainer}>
                <Grid item xs={12} sm={12} md={6} lg={3} align="center">
                    <img src={starterSvg} alt="scooter" className={styles.img} />
                    <PlansCard
                        title="STARTER"
                        text="For startups and NGOs"
                        disabled
                        className={styles.starter}
                        controlClassName={styles.starterColor}
                    >
                        <List className={styles.menu}>
                            <ListItem className={styles.listItem}>
                                <CheckCircleIcon />
                                <Typography variant="body2" color="textSecondary">
                                    Up to 50k records
                                </Typography>
                            </ListItem>
                            <ListItem className={styles.listItem}>
                                <CheckCircleIcon />
                                <Typography variant="body2" color="textSecondary">
                                    Predictions, Insight and Fairness report
                                </Typography>
                            </ListItem>
                        </List>
                    </PlansCard>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3} align="center">
                    <img src={basicSvg} alt="bycicle" className={styles.img} />
                    <PlansCard
                        title="BASIC"
                        text="For SMEs and NGOs"
                        className={styles.basic}
                        controlClassName={styles.basicColor}
                    >
                        <List className={styles.menu}>
                            <ListItem className={styles.listItem}>
                                <CheckCircleIcon />
                                <Typography variant="body2" color="textSecondary">
                                    All features of FREE
                                </Typography>
                            </ListItem>
                            <ListItem className={styles.listItem}>
                                <CheckCircleIcon />
                                <Typography variant="body2" color="textSecondary">
                                    Up to 1m records
                                </Typography>
                            </ListItem>
                            <ListItem className={styles.listItem}>
                                <CheckCircleIcon />
                                <Typography variant="body2" color="textSecondary">
                                    3h Data Science consultation
                                </Typography>
                            </ListItem>
                            <ListItem className={styles.listItem}>
                                <CheckCircleIcon />
                                <Typography variant="body2" color="textSecondary">
                                    Automated Data Health check
                                </Typography>
                            </ListItem>
                        </List>
                    </PlansCard>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3} align="center">
                    <img src={standardSvg} alt="byke" className={styles.img} />
                    <PlansCard
                        title="STANDARD"
                        text="For medium and large sized companies"
                        className={styles.standard}
                        controlClassName={styles.standardColor}
                    >
                        <List className={styles.menu}>
                            <ListItem className={styles.listItem}>
                                <CheckCircleIcon />
                                <Typography variant="body2" color="textSecondary">
                                    All features of BASIC
                                </Typography>
                            </ListItem>
                            <ListItem className={styles.listItem}>
                                <CheckCircleIcon />
                                <Typography variant="body2" color="textSecondary">
                                    Up to 20m records
                                </Typography>
                            </ListItem>
                            <ListItem className={styles.listItem}>
                                <CheckCircleIcon />
                                <Typography variant="body2" color="textSecondary">
                                    8h Data Science consultation
                                </Typography>
                            </ListItem>
                            <ListItem className={styles.listItem}>
                                <CheckCircleIcon />
                                <Typography variant="body2" color="textSecondary">
                                    Automated NLP feature generation
                                </Typography>
                            </ListItem>
                            <ListItem className={styles.listItem}>
                                <CheckCircleIcon />
                                <Typography variant="body2" color="textSecondary">
                                    API Access
                                </Typography>
                            </ListItem>
                        </List>
                    </PlansCard>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3} align="center">
                    <img src={proSvg} alt="car" className={styles.img} />
                    <PlansCard
                        title="PRO"
                        text="For large enterprises with streaming analytics needs"
                        className={styles.pro}
                        controlClassName={styles.proColor}
                    >
                        <List className={styles.menu}>
                            <ListItem className={styles.listItem}>
                                <CheckCircleIcon />
                                <Typography variant="body2" color="textSecondary">
                                    All features of STANDARD
                                </Typography>
                            </ListItem>
                            <ListItem className={styles.listItem}>
                                <CheckCircleIcon />
                                <Typography variant="body2" color="textSecondary">
                                    Any volume of records
                                </Typography>
                            </ListItem>
                            <ListItem className={styles.listItem}>
                                <CheckCircleIcon />
                                <Typography variant="body2" color="textSecondary">
                                    Dedicated Data Scientist
                                </Typography>
                            </ListItem>
                            <ListItem className={styles.listItem}>
                                <CheckCircleIcon />
                                <Typography variant="body2" color="textSecondary">
                                    API Access
                                </Typography>
                            </ListItem>
                            <ListItem className={styles.listItem}>
                                <CheckCircleIcon />
                                <Typography variant="body2" color="textSecondary">
                                    Model monitoring and data updating
                                </Typography>
                            </ListItem>
                            <ListItem className={styles.listItem}>
                                <CheckCircleIcon />
                                <Typography variant="body2" color="textSecondary">
                                    On premises deployment
                                </Typography>
                            </ListItem>
                        </List>
                    </PlansCard>
                </Grid>
            </Grid>
        </div>
        <CurrentPlan />
    </div>
);

export default PlansAndBilling;
