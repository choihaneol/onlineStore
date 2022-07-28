import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useStoreContext } from "../context/StoreContext";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

{ /* Mid Navigator */ }
const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' },
]
{ /* Right Navigator */ }
const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' },
]

const navStyles = {
    color: 'inherit',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}


export default function Header({ darkMode, handleThemeChange }: Props) {
   const {basket} = useStoreContext();
   const itemCount = basket?.items.reduce((sum, item)=>sum+item.quantity, 0)

   
   
    return (
        <AppBar position='static' sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <Box display='flex' alignItems='center'>
                    {/* Title */}
                    <Typography variant='h6' component={NavLink}
                        to='/'
                        sx={navStyles}>
                        RE-STORE
                    </Typography>

                    { /* Dark mode */}
                    <Switch checked={darkMode} onChange={handleThemeChange} />
                </Box>


                { /* Mid Navigator */}
                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>



                <Box display='flex' alignItems='center'>
                    {/* Basket icon */}
                    <IconButton component={Link} to='/basket' size='large' sx={{ color: 'inherit' }}>
                        <Badge badgeContent={itemCount} color='secondary'>
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    

                    { /* Right Navigator */}
                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar>

    )
}