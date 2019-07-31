import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { compose } from "redux"

import * as ConsoleActions from "../ConsoleAppFrame/actions"
import * as actions from "./actions"

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import UploadDatasetsForm from "components/Console/ConsoleContents/UploadDatasetsForm"

import MainContent from 'components/Console/ConsoleContents/MainContent'
import ContentBar from "components/Console/ConsoleContents/ContentBar"

const styles = theme => ({
    block: {
        display: 'block',
    },
    addDS: {
        marginRight: theme.spacing.unit,
    },
    contentWrapper: {
        // position: "relative",
        minHeight: 200,
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center"
    },
    formWrapper: {
        width: "100%"
        // minWidth: "60%"
    }
})


class UploadDataSet extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        handleHeaderTitleChange: PropTypes.func,
    }

    componentDidMount() {
        this.props.handleHeaderTitleChange("Dataset > New Dataset")
    }

    componentWillUnmount() {
        this.props.resetLoadingBar()
    }

    render() {
        const {
            classes,
        } = this.props;

        return (
            <React.Fragment>
                <MainContent>
                    <ContentBar>
                        <Toolbar>
                            <Grid container spacing={16} justify="space-between" alignItems="center">
                                <Grid item>
                                    <Typography variant="h5" gutterBottom> New Dataset </Typography>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </ContentBar>
                    <div className={classes.contentWrapper}>
                        <div className={classes.formWrapper}>
                            <UploadDatasetsForm />
                        </div>
                    </div>
                </MainContent>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    DatasetList: state.DatasetsReducer.DatasetList,
})

const mapDispatchToProps = {
    handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
    postCreateDataset: actions.postCreateDataset,
    resetLoadingBar: ConsoleActions.resetLoadingBar,
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(UploadDataSet)
