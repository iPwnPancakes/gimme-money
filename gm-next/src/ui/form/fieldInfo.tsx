import type { AnyFieldApi } from '@tanstack/react-form';

interface Props {
    name: AnyFieldApi['name'];
    state: AnyFieldApi['state'];
}

export default function FieldInfo({ state }: Props) {
    const errors = state.meta.errors;

    return (
        <>
            {state.meta.isTouched && errors.length
                ? <em className='tw-text-destructive'>{errors.map((err) => err.message).join(',')}</em>
                : null
            }
            {state.meta.isValidating ? 'Validating...' : null}
        </>
    );
}
