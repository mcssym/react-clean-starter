import type { InputStylesType } from "@material-tailwind/react";

const appTheme = {
    input: {
        valid: {
            variants: ['outlined'],
        },
        styles: {
            // variants: {
            //     outlined: {
            //         base: {
            //             input: {
            //                 borderWidth: "border-0",
            //                 borderColor: "placeholder-shown:border-primary-light",
            //             },
            //             label: {
            //                 className: 'text-gray-700',
            //             },

            //         },
            //     },
            //     standard: {},
            //     static: {},
            // }
        }
    } satisfies InputStylesType,
};

export default appTheme;