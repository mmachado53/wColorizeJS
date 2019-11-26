import Slider from "@material-ui/core/Slider";
import withStyles from "@material-ui/core/styles/withStyles";
const HueSlider = withStyles({
    root: {
        marginTop:15,
        marginBottom:10,
        color: '#00000000',
        height: 20,
        padding:0,
        borderRadius:5,
        background:'linear-gradient(to right, red 0%, #ff0 17%, lime 33%, cyan 50%, blue 66%, #f0f 83%, red 100%)'
    },
    thumb: {
        height: 24,
        width: 6,
        backgroundColor: '#fff',
        border: '1px solid #000000',
        borderRadius:2,
        marginTop: -2,
        marginLeft: -3,
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
})(Slider);

export default HueSlider