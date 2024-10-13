
import { ToastAlertData, ToastStateNotifier } from '@application/controllers/toast/toast.controller';
import { ToastType } from '@foundation/core/system/navigation/toast-service';
import { Alert, IconButton } from '@material-tailwind/react';
import { colors } from '@material-tailwind/react/types/generic';
import { AlarmIcon, CheckmarkCircleIcon, CrossCircleIcon, CrossIcon, WarningIcon } from '@presentation/ui/components/icons';
import { useSNState } from 'presentation/hooks/state/use-state-notifier';
import React, { useEffect, useMemo } from 'react';

interface ToastAlertIconProps {
    type: ToastType;
}

const ToastAlertIcon = ({ type }: ToastAlertIconProps): JSX.Element => {

    switch (type) {
        case ToastType.success:
            return <CheckmarkCircleIcon className="w-6 h-6" />;
        case ToastType.warning:
            return <WarningIcon className="w-6 h-6" />;
        case ToastType.error:
            return <CrossCircleIcon className="w-6 h-6" />;
        case ToastType.info:
            return <AlarmIcon className="w-6 h-" />;
    }
};

interface ToastAlertProps {
    data: ToastAlertData;
}

const ToastAlert = ({ data }: ToastAlertProps): JSX.Element => {

    const [open, setOpen] = React.useState(true);

    const onClose = () => {
        data.close();
        setOpen(false);
    }

    useEffect(() => {
        const duration = data.duration === null ? null : (data.duration ?? 5000);
        if (duration != null) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }

        return () => { };
    });

    const color: colors = useMemo(() => {
        switch (data.type) {
            case ToastType.success:
                return 'green';
            case ToastType.warning:
                return 'yellow';
            case ToastType.error:
                return 'red';
            case ToastType.info:
                return 'blue';
        }
    }, [data.type]);

    return (
        <Alert color={color} icon={<ToastAlertIcon type={data.type} />} open={open} action={
            <IconButton
                variant="text"
                color="white"
                size="sm"
                className="!absolute top-3 right-3"
                onClick={onClose}>
                <CrossIcon className="w-5 h-5" />
            </IconButton>
        }>
            {data.message}
        </Alert>
    );
};

const ToastsProvider = ({ children }: React.PropsWithChildren): JSX.Element => {
    const state = useSNState<ToastStateNotifier>(ToastStateNotifier.token);

    const entries = useMemo(() => Object.entries(state), [state]);
    return (
        <>
            {entries.length > 0 && (
                <div className='fixed bottom-6 md:bottom-10 left-0 right-0 z-50 flex justify-center' >
                    <div className='w-3/5 md:w-2/5 flex flex-col gap-4' >
                        {entries.map(([key, toast], _) => {
                            return <ToastAlert key={key} data={toast} />;
                        })}
                    </div>
                </div>
            )}
            {children}
        </>
    );
};

export default ToastsProvider;
