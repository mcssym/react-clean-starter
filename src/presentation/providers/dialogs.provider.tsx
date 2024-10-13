
import { Button, Card, CardBody, CardFooter, Dialog, Typography } from '@material-tailwind/react';
import { DialogStateNotifier, DialogType } from '@application/controllers/dialog/dialog.controller';
import { useSNState } from 'presentation/hooks/state/use-state-notifier';
import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface DialogButtonProps {
    variant: 'primary' | 'secondary';
    onClick?: () => void;
    label: string;
    type?: 'button' | 'submit'
}

const DialogButton: React.FC<DialogButtonProps> = ({ variant, type, label, onClick }: DialogButtonProps): JSX.Element => {
    return (
        <Button variant={variant === 'primary' ? 'filled' : 'outlined'} type={type} onClick={onClick}>
            {label}
        </Button >
    );
}

interface DialogProps {
    onClose: () => void;
}

export const BaseDialog: React.FC<React.PropsWithChildren<DialogProps>> = ({ children, onClose }: React.PropsWithChildren<DialogProps>): JSX.Element => {
    return (
        <Dialog open size="xs" className="bg-transparent shadow-none" handler={onClose}>
            {children}
        </Dialog>
    );
}

interface DialogPortalProps {
    onClose: () => void;
    title?: string;
    message: string;
}

const DialogPortal = ({ onClose, title, message }: DialogPortalProps): JSX.Element => {
    const { t } = useTranslation();

    return (
        <BaseDialog onClose={onClose}>
            <Card className="mt-6 w-96">
                <CardBody>
                    {title != null && <Typography variant="h5" color="blue-gray" className="mb-2">
                        {title}
                    </Typography>}
                    <Typography>
                        {message}
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <DialogButton label={t('OK')} variant='primary' type='button' onClick={onClose} />
                </CardFooter>
            </Card>
        </BaseDialog>
    );
};
interface ConfirmDialogPortalProps {
    onClose: (result?: boolean) => void;
    title?: string;
    message: string;
}
const ConfirmDialogPortal = ({ onClose, title, message }: ConfirmDialogPortalProps): JSX.Element => {
    const { t } = useTranslation();

    return (
        <BaseDialog onClose={onClose}>
            <Card className="mt-6 w-96">
                <CardBody>
                    {title != null && <Typography variant="h5" color="blue-gray" className="mb-2">
                        {title}
                    </Typography>}
                    <Typography>
                        {message}
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <DialogButton label={t('yes')} variant='primary' type='button' onClick={() => { onClose(true) }} />
                    <DialogButton label={t('cancel')} variant='secondary' type='button' onClick={() => { onClose(false) }} />
                </CardFooter>
            </Card>
        </BaseDialog>
    );
};
interface PromptDialogPortalProps {
    onClose: (result?: string) => void;
    title?: string;
    message: string;
}
const PromptDialogPortal = ({ onClose, title, message }: PromptDialogPortalProps): JSX.Element => {
    const { t } = useTranslation();
    const textRef = useRef<string>();

    const handleSubmit = (): void => {
        onClose(textRef.current)
    }

    return (
        <BaseDialog onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <Card className="mt-6 w-96">
                    <CardBody>
                        {title != null && <Typography variant="h5" color="blue-gray" className="mb-2">
                            {title}
                        </Typography>}
                        <Typography>
                            {message}
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <DialogButton label={t('submit')} variant='primary' type='submit' />
                        <DialogButton label={t('cancel')} variant='secondary' type='button' onClick={() => { onClose() }} />
                    </CardFooter>
                </Card>
            </form>
        </BaseDialog>
    );
};

const DialogsProvider = ({ children }: React.PropsWithChildren): JSX.Element => {
    const state = useSNState<DialogStateNotifier>(DialogStateNotifier.token);

    const entries = useMemo(() => Object.entries(state), [state]);
    return (
        <>
            {entries.length > 0 && entries.map(([key, dialog], _) => {
                let element = <></>;
                switch (dialog.type) {
                    case DialogType.alert:
                        element = (
                            <DialogPortal key={key} onClose={dialog.close} title={dialog.title} message={dialog.message} />
                        );
                        break;
                    case DialogType.confirm:
                        element = (
                            <ConfirmDialogPortal key={key} onClose={dialog.close} title={dialog.title} message={dialog.message} />
                        );
                        break;
                    case DialogType.prompt:
                        element = (
                            <PromptDialogPortal key={key} onClose={dialog.close} title={dialog.title} message={dialog.message} />
                        );
                        break;
                }

                return element;
            })}
            {children}
        </>
    );
};

export default DialogsProvider;
