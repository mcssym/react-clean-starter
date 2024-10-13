
import { Routes } from '@application/controllers/navigation/routes-provider';
import { RecoverData } from '@domain/use_cases/auth/recover.use_case';
import { AC_APP_NAME_KEY, Config } from '@foundation/core/config';
import { TranslationKeys } from '@foundation/core/system/translation/i-translation-provider';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Input,
    Typography
} from '@material-tailwind/react';
import { useVMSelector, useViewModel } from '@presentation/hooks/state/use-view-model';
import { useI18n } from '@presentation/hooks/use-i18n';
import { useInjection } from '@presentation/providers/service-container.provider';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthRecoverViewModel } from './recover-viewmodel';

export const RecoverView: React.FC = (): JSX.Element => {
    const config = useInjection<Config>(Config.token);
    const viewModel = useViewModel<AuthRecoverViewModel>(AuthRecoverViewModel.token);
    const t = useI18n();
    const { control, handleSubmit } = useForm<RecoverData>({
        defaultValues: {
            login: '',
        }
    });
    const submitting = useVMSelector<boolean, AuthRecoverViewModel>(AuthRecoverViewModel.token, state => state.submitting);

    const onSubmit = (data: RecoverData): void => {
        viewModel.handleSubmit(data).catch(() => { });
    }

    const handleSubmitEvent = (e?: React.BaseSyntheticEvent): void => {
        handleSubmit(onSubmit)(e).catch(() => { });
    }

    return (
        <div className="flex mx-4 h-screen items-center justify-center" >
            <form onSubmit={handleSubmitEvent} >
                <Card className="w-96">
                    <div
                        className="m-8 grid text-primary-light place-items-center"
                    >
                        <Typography variant="h2">
                            {config.get(AC_APP_NAME_KEY)}
                        </Typography>
                    </div>
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="small">
                            {t(TranslationKeys.recoverMessage)}
                        </Typography>
                        <Controller
                            control={control}
                            name="login"
                            render={({ field }) => {
                                return <Input {...field} label={t(TranslationKeys.email)} type='email' size="lg" readOnly={submitting} required />;
                            }}
                        />
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button disabled={submitting} variant="gradient" type="submit" fullWidth>
                            {submitting ? '...' : t(TranslationKeys.recover)}
                        </Button>
                        <br />
                        <Link replace to={Routes.auth.logIn.resolve()}>
                            <Button disabled={submitting} variant="text" className='text-outline-dark' type="button" fullWidth>
                                {t(TranslationKeys.login)}
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}
