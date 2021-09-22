import {
    AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';

export const messages = {
    moreInformationLabel: '',
};

export const TextEditor = (props) => {
    //eslint-disable-next-line react/destructuring-assignment
    if (props.type === 'multilineTextEditor') {
        return null;
    }

    return <AppointmentForm.TextEditor {...props} />;
};

export const BasicLayout = (selectOptions) => ({ onFieldChange, appointmentData, ...restProps }) => {
    const onCustomFieldChange = (nextValue) => {
        onFieldChange({ description: nextValue });
    };
    const onCustomSelectChange = (nextValue) => {
        onFieldChange({ attendee: nextValue });
    };

    return (
        <AppointmentForm.BasicLayout
            appointmentData={appointmentData}
            onFieldChange={onFieldChange}
            {...restProps}
        >
            <AppointmentForm.Label
                text="Description"
                type="title"
            />
            <AppointmentForm.TextEditor
                value={appointmentData.description}
                onValueChange={onCustomFieldChange}
                placeholder="Description"
            />
            <AppointmentForm.Label
                text="Attendee"
                type="title"
            />
            <AppointmentForm.Select
                value={appointmentData.attendee}
                availableOptions={selectOptions}
                onValueChange={onCustomSelectChange}
            />
        </AppointmentForm.BasicLayout>
    );
};

export const BooleanEditor = props => {
    return <AppointmentForm.BooleanEditor {...props} readOnly />;
};