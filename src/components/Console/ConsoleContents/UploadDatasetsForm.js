import React from "react"

import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

// Third part dependencies
import { Form, Field } from "react-final-form"
import { useDropzone } from "react-dropzone";
import { FormTextField, FormSwitchField } from "mui-form-fields"

const useStyles = makeStyles({
    dropzoneWrapper: {
        border: "1px solid black",
        borderRadius: 1,
        padding: "5px",
        margin: "10px",
        textAlign: "center" 
    }
})

function DatasetsDropzone(props) {
    const classes = useStyles()
    const { getRootProps, getInputProps, acceptedFiles, isDragActive } = useDropzone()

    return (
        <Field name="Datasets" lable="Upload Datasets from your Computer">
            {
                ({ input, meta }) => {
                    React.useEffect(
                        () => {
                            input.onChange(acceptedFiles)
                        }
                        , [acceptedFiles])
                    return (
                        <div className={classes.dropzoneWrapper} {...getRootProps()}>
                            <input {...getInputProps()}>
                            </input>
                            {isDragActive ? (
                                <p>Drop the files here ...</p>
                            ) : (
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                )}
                            <Button>Click to Upload</Button>
                        </div>
                    )
                }
            }
        </Field>
    )
}

class UploadDatasetsForm extends React.Component {
    state = {
        fromLocal: false
    }

    render() {
        return (
            <Form onSubmit={console.log}>
                {
                    (handleSubmit, values) => {
                        return (
                            <React.Fragment>
                                <FormTextField icon="chrome_reader_mode" name="name" label="Dataset Name" />
                                <FormSwitchField
                                    icon="attach_file"
                                    onClick={event => {
                                        const value = Boolean(event.target.checked);
                                        this.setState({ fromLocal: value });
                                    }}
                                    name="fromLocal"
                                    label="Upload from Computer"
                                />
                                { this.state.fromLocal ? <DatasetsDropzone /> :
                                <FormTextField icon="cloud_upload" name="datasets_url" label="Upload Datasets From url" /> }
                                <pre>{JSON.stringify(this.state)}</pre>
                            </React.Fragment>
                        )
                    }
                }
            </Form>
        )
    }
}


export default UploadDatasetsForm;