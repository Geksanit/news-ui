import { Button, TextField, CircularProgress, makeStyles } from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useState } from 'react';

type MessageFormProps = {
    onSubmit: (message: string) => void;
    isRequesting: boolean;
};

const useStyles = makeStyles({
    form: {
        display: 'grid',
        width: '100%',
        padding: '20px',
        paddingTop: '20px',
        position: 'relative',
    },
    input: {
        marginBottom: '20px',
    },
    toolbar: {
        position: 'absolute',
        right: '0',
    },
});

const MessageForm = (props: MessageFormProps) => {
    const { onSubmit, isRequesting } = props;

    const [message, setMessage] = useState('');

    const classes = useStyles();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(message);
        setMessage('');
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
                className={classes.input}
                id="message"
                label="Сообщение"
                multiline
                rows={4}
                placeholder="Введите текст сообщения"
                variant="outlined"
                value={message}
                onChange={handleChange}
                required
            />
            <Button variant="contained" color="primary" type="submit" disabled={isRequesting}>
                {isRequesting ? <CircularProgress size={26} /> : 'Отправить'}
            </Button>
        </form>
    );
};
export { MessageForm };
