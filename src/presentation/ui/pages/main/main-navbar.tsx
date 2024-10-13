import {
    Collapse,
    IconButton,
    Navbar,
    Typography,
} from "@material-tailwind/react";
import { CrossIcon, MenuIcon } from "@presentation/ui/components/icons";
import React from "react";

function NavList() {
    return (
        <ul className="my-2 flex flex-col gap-2 md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
                    Pages
                </a>
            </Typography>
        </ul>
    );
}

export const MainNavbar: React.FC = (): JSX.Element => {
    const [openNav, setOpenNav] = React.useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <Navbar fullWidth shadow={false} className="w-full px-6 py-3">
            <div className="flex items-center justify-between md:justify-end text-blue-gray-900">
                <div className="hidden md:block">
                    <NavList />
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <CrossIcon className="h-6 w-6" />
                    ) : (
                        <MenuIcon className="h-6 w-6" />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList />
            </Collapse>
        </Navbar>
    );
}