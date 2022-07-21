import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { AnyARecord } from "dns";
import { useNavigate, useLocation } from "react-router";


//Creating a server error component

export default function ServerError() {
    const history = useNavigate();
    const state = useLocation as any;

    return (
        <Container component={Paper}>
            {state?.error ? (
                <>
                    <Typography variant='h3' color='error' gutterBottom>{state.error.title}</Typography>
                    <Divider />
                    <Typography>{state.error.detail || 'Internal server error'}</Typography>
                </>
            ) : (
                <Typography variant='h5' gutterBottom>Server Error</Typography>
            )}
            <Button onClick={() => history('/catalog')}>Go back to the store</Button>
        </Container>
    )
}