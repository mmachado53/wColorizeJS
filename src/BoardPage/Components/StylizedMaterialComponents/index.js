import withStyles from "@material-ui/core/styles/withStyles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import React from "react";
import Slider from "@material-ui/core/Slider";

export const MenuTabs = withStyles(theme => ({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        height:3,
        backgroundColor: theme.palette.secondary.light,
    },
}))(Tabs);

export const MenuTab = withStyles(theme => ({
    root: {
        textTransform: 'none',
        minWidth: 15,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(0),
        '&:hover': {
            opacity: 1,
        },
        '&$selected': {
            //color: theme.color.secondary,
            backgroundColor:theme.palette.primary.dark,
            color: theme.palette.secondary.light,
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            //color: '#40a9ff',
        },
    },
    selected: {},
}))(props => <Tab disableRipple {...props} />);

export const VerticalSlider = withStyles(theme => ({
    root: {
        color: theme.palette.secondary.light,
        minWidth:20
    },
    thumb: {
        height: 0,
        width: 0,
        backgroundColor: 'transparent',
        border: '2px solid transparent',
        left:16,
        '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        /*marginLeft:-5,*/
        minWidth:20,
        borderRadius: 4,
    },
    rail: {
        minWidth:20,
        borderRadius: 4,
    },
}))(Slider);
