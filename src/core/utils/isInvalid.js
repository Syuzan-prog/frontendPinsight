const isInvalid = (meta) => (
    meta.invalid
    && (meta.touched || meta.submitFailed || meta.dirty)
);

export default isInvalid;
