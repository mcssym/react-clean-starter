import { Routes } from "@application/controllers/navigation/routes-provider";
import { AC_APP_NAME_KEY, AC_APP_VERSION_KEY, Config } from "@foundation/core/config";
import { TranslationKeys } from "@foundation/core/system/translation/translation-keys";
import {
    Accordion, AccordionBody, AccordionHeader, Card,
    CardFooter,
    Chip,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Typography
} from "@material-tailwind/react";
import { useI18n } from "@presentation/hooks/use-i18n";
import { useInjection } from "@presentation/providers/service-container.provider";
import { ApartmentIcon, BookIcon, CalendarFullIcon, ChevronDownIcon, CogIcon, ExitIcon, HomeIcon, PawIcon, UserIcon, UsersIcon } from "@presentation/ui/components/icons";
import React from "react";
import { Link, useLocation } from "react-router-dom";


export const MainNavSide: React.FC = (): JSX.Element => {
    const t = useI18n();
    const config = useInjection<Config>(Config.token);
    const [open, setOpen] = React.useState(0);
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const handleOpen = (value: number) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Card className="flex flex-col h-screen max-h-screen overflow-auto w-full md:min-w-[18rem] max-w-[20rem] py-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 flex flex-0 items-center gap-4 p-4">
                <img src="/assets/img/logo.png" alt="brand" className="h-8 w-8" />
                <Typography variant="h3" color="primary">
                    {config.get(AC_APP_NAME_KEY)}
                </Typography>
            </div>
            <hr className="my-2 border-blue-gray-50" />
            <List className="flex-1 p-0" >
                <Link to={Routes.main.dashboard.resolve()} >
                    <ListItem selected={isActive(Routes.main.dashboard.resolve())} className="px-4 py-3" >
                        <ListItemPrefix>
                            <HomeIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        {t(TranslationKeys.dashboard)}
                    </ListItem>
                </Link>
                <hr className="my-2 border-blue-gray-50" />
                <Accordion
                    open={open === 2}
                    icon={
                        <ChevronDownIcon
                            className={`mx-auto h-4 w-4 text-sm transition-transform ${open === 2 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 2}>
                        <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 px-4 py-3 text-base">
                            <ListItemPrefix>
                                <UsersIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto flex-1 font-normal">
                                {t(TranslationKeys.clients)}
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <ListItem className="px-4 py-3" >
                                <ListItemPrefix>
                                    <PawIcon className="h-3 w-5 text-sm" />
                                </ListItemPrefix>
                                {t(TranslationKeys.petOwners)}
                            </ListItem>
                            <ListItem className="px-4 py-3" >
                                <ListItemPrefix>
                                    <ExitIcon className="h-3 w-5 text-sm" />
                                </ListItemPrefix>
                                {t(TranslationKeys.breeders)}
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Link to={Routes.main.appointments.resolve()} >
                    <ListItem selected={isActive(Routes.main.appointments.resolve())} className="px-4 py-3" >
                        <ListItemPrefix>
                            <CalendarFullIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        {t(TranslationKeys.appointments)}
                        <ListItemSuffix>
                            <Chip value="2" size="sm" variant="gradient" color="red" />
                        </ListItemSuffix>
                    </ListItem>
                </Link>
                <Link to={Routes.main.institutions.resolve()}>
                    <ListItem selected={isActive(Routes.main.institutions.resolve())} className="px-4 py-3" >
                        <ListItemPrefix>
                            <ApartmentIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        {t(TranslationKeys.institutions)}
                    </ListItem>
                </Link>
                <hr className="my-2 border-blue-gray-50" />
                <Accordion
                    open={open === 1}
                    icon={
                        <ChevronDownIcon
                            className={`mx-auto h-4 w-4 text-sm transition-transform ${open === 1 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 1}>
                        <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 px-4 py-3 text-base">
                            <ListItemPrefix>
                                <UserIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto flex-1 font-normal">
                                {t(TranslationKeys.you)}
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <Link to={Routes.main.profile.resolve()} >
                                <ListItem selected={isActive(Routes.main.profile.resolve())} className="px-4 py-3" >
                                    <ListItemPrefix>
                                        <BookIcon className="h-3 w-5 text-sm" />
                                    </ListItemPrefix>
                                    {t(TranslationKeys.profile)}
                                </ListItem>
                            </Link>
                            <ListItem className="px-4 py-3" >
                                <ListItemPrefix>
                                    <CogIcon className="h-3 w-5 text-sm" />
                                </ListItemPrefix>
                                {t(TranslationKeys.settings)}
                            </ListItem>
                            <ListItem className="px-4 py-3" >
                                <ListItemPrefix>
                                    <ExitIcon className="h-3 w-5 text-sm" />
                                </ListItemPrefix>
                                {t(TranslationKeys.logout)}
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <ListItem className="px-4 py-3" >
                    <ListItemPrefix>
                        <UsersIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Users
                </ListItem>
                <ListItem className="px-4 py-3" >
                    <ListItemPrefix>
                        <CogIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    {t(TranslationKeys.settings)}
                </ListItem>
            </List>
            <CardFooter className="flex-0 mt-auto text-center" >
                <Typography variant="small" className="mb-1">
                    {t(TranslationKeys.version, { version: config.get(AC_APP_VERSION_KEY) })}
                </Typography>
            </CardFooter>
        </Card>
    );
}
