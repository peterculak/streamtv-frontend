import * as React from 'react';
import {TableCell} from '@material-ui/core';
import {createStyled} from "../functions";

function RenderProps(propsFromParent: any) {
    if (undefined !== propsFromParent.styles) {
        const Styled = createStyled(propsFromParent.styles);
        return (
            <Styled>{(props: any) => <TableCell {...props}>{propsFromParent.children}</TableCell>}</Styled>
        );
    }

    return (<TableCell>{propsFromParent.children}</TableCell>);
}

export default RenderProps;
