import React from 'react';
import Box from '@mui/material/Box';
import FileCard from './FileCard'

export default function FileList(props){
    const renderFile = (file) => {
        let id = 0
        if(file.id){
            id = -file.id
        }
        else if(file.idfilegv){
            id = file.idfilegv
        }
        return <FileCard key={id} file={file} fileMangager={props.fileMangager}/>
    }
    
    return(
        <Box
        sx={{
            width: "100%",
            height: 250,
            border: "1px solid",
            borderRadius: "5px",
            display: "flex",
            flexWrap: "wrap",
            overflowY: "auto",
            overflowX: "hidden",
            // '&:hover': {
            //     opacity: [0.9, 0.8, 0.7],
            // },
        }}
        // children={fileCards}
        >
            {props.files.map(renderFile)}
        </Box>
    )
}