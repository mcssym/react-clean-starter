
import { ViewModelProvider } from '@presentation/providers/state/view-model.provider';
import React from 'react';
import { MainNavSide } from './main-nav-side';
import { MainViewModel } from './main-viewmodel';
import { Outlet } from 'react-router-dom';

const MainView: React.FC = (): JSX.Element => {
    return (
        <div className='flex flex-row bg-blue-gray-50 h-screen' >
            <div className='flex-0 max-w-[20rem] h-full' >
                <MainNavSide />
            </div>
            <div className='flex-1' >
                <Outlet />
            </div>
        </div>
    );
}

export const MainPage: React.FC = (): JSX.Element => {
    return (
        <ViewModelProvider token={MainViewModel.token} create={() => {
            return new MainViewModel();
        }} >
            <MainView />
        </ViewModelProvider>
    );
}
