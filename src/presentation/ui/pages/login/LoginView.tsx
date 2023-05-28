import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Typography
} from '@material-tailwind/react';
import { type LoginData } from 'domain/use_cases/AuthUseCases';
import { TranslationKeys } from 'foundation/core/system/translation/ITranslationProvider';
import { useVMSelector, useViewModel } from 'presentation/hooks/state/use-view-model';
import { useI18n } from 'presentation/hooks/use-i18n';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LoginViewModel } from './LoginViewModel';

export const LoginView: React.FC = (): JSX.Element => {
    const viewModel = useViewModel<LoginViewModel>(LoginViewModel.token);
    const t = useI18n();
    const { control, handleSubmit } = useForm<LoginData>({
        defaultValues: {
            name: '',
            username: ''
        }
    });
    const submitting = useVMSelector<boolean, LoginViewModel>(LoginViewModel.token, state => state.submitting);

    const onSubmit = (data: LoginData): void => {
        viewModel.handleSubmit(data).catch(() => { });
    }

    const handleSubmitEvent = (e?: React.BaseSyntheticEvent): void => {
        handleSubmit(onSubmit)(e).catch(() => { });
    }

    return (
        <div className="flex mx-4 h-screen items-center justify-center" >
            <form onSubmit={handleSubmitEvent} >
                <Card className="w-96">
                    <CardHeader
                        variant="gradient"
                        color="blue"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            {t(TranslationKeys.login)}
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => {
                                return <Input {...field} label={t(TranslationKeys.name)} size="lg" readOnly={submitting} required />;
                            }}
                        />
                        <Controller
                            control={control}
                            name="username"
                            render={({ field }) => {
                                return <Input {...field} label={t(TranslationKeys.username)} size="lg" readOnly={submitting} required />;
                            }}
                        />
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button disabled={submitting} variant="gradient" type="submit" fullWidth>
                            {submitting ? '...' : t(TranslationKeys.login)}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}
