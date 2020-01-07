import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from "prop-types"
import GradientSlider from "./GradientSlider";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
    topBar:{
    },
    valueLabel : {
        width:60,
        textAlign:"center"
    },
    label : {
        width:80
    },
    paddingLeft: {
        paddingLeft:6,

    },
    paddingRight : {
        paddingRight: 6
    }
});
const InputHorizontalSlider = (props)=>{
    const classes = useStyles();
    const {unit,defaultValue,label,value,min,max,onChange,onChangeCommitted} = props

    return (
        <div>
            <Grid className={classes.topBar} container spacing={1} alignItems="center">
                <Grid item className={classes.label}>
                    <Box className={classes.paddingLeft}>
                        {label}
                    </Box>
                </Grid>
                <Grid item xs>
                    <GradientSlider
                        min={min}
                        max={max}
                        defaultValue = {defaultValue}
                        value={typeof value === 'number' ? value : 0}
                        onChange={onChange}
                        onChangeCommitted={onChangeCommitted}
                        aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid item className={classes.valueLabel}>
                    <Box className={classes.paddingRight}>
                        {value}{unit}
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

InputHorizontalSlider.propTypes = {
    value : PropTypes.number,
    min : PropTypes.number,
    defaultValue : PropTypes.number,
    max : PropTypes.number,
    label : PropTypes.string,
    onChange : PropTypes.func,
    onChangeCommitted : PropTypes.func,
    unit: PropTypes.string
}

InputHorizontalSlider.defaultProps = {
    value : 0,
    min : 0,
    max: 100,
    label: "",
    defaultValue: 50,
    unit: "",
    onChange : (event, newValue)=>{},
    onChangeCommitted : (event, newValue)=>{},
}

export default InputHorizontalSlider
