import styles from './InputField.module.css';

export const InputField = ({ name, type, labelName, onChangeOperation }) => {
    return (
        <div className="mt-2 mb-2">
            <input
                className={`${styles.inputBox}`}
                type={type}
                name={name}
                onChange={(e) => onChangeOperation(e)}
                placeholder={labelName}
                required
            />
        </div>
    );
};
