import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

function createStyled(styles: any) {
    function Styled(props: any) {
        const { children, ...other } = props;
        return children(other);
    }
    Styled.propTypes = {
        children: PropTypes.func.isRequired,
        classes: PropTypes.object.isRequired,
        data: PropTypes.array,
    };
    return withStyles(styles)(Styled);
}

export {createStyled};
