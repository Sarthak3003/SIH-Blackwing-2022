import React from 'react'
import { Grid,Button } from '@mui/material'

const CriticalDates = (props) => {
    return (
        <>CriticalDates
            <Grid container>
                <Grid item>
                    <Button onClick={props.prevStep}>previous</Button>
                </Grid>
                <Grid item>
                    <Button onClick={props.nextStep}>next</Button>
                </Grid>
            </Grid></>
    )
}

export default CriticalDates