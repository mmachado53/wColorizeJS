import Slider from "@material-ui/core/Slider";
import withStyles from "@material-ui/core/styles/withStyles";
const GradientSlider = withStyles(theme=> ({
    root: {
        marginTop:15,
        marginBottom:10,
        color: '#00000000',
        height: 5,
        padding:0,
        borderRadius:2,
        background: `linear-gradient(to left, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`
    },
    thumb: {
        height: 12,
        width: 10,
        backgroundColor: theme.palette.secondary.light,
        border: `1px solid ${theme.palette.secondary.dark}`,
        borderRadius:2,
        marginTop: -3,
        marginLeft: -5,
        '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% - 12px)',
        top: -18,
        '& *': {
            background: 'transparent',
            color: '#000',
        },
    },
    track: {
        backgroundColor:'transparent',
        height: 20,
        borderRadius: 0,
    },
    rail: {
        backgroundColor:'transparent',
        height: 20,
        borderRadius: 4,
    },
}))(Slider);


export default GradientSlider