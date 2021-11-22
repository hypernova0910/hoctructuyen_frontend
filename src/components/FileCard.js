import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import word from '../img/word-icon.png'
import fileDownload from 'js-file-download'

import TeacherFileService from '../services/TeacherFileService';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function FileCard(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [state, dispatch] = props.fileMangager

  const handleRightClick = (event) => {
      //console.log('Right click');
      event.preventDefault();
      setAnchorEl(event.currentTarget);
    
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = () => {
    console.log(props.file.idfilegv)
    if(props.file.idfilegv){
      const search = {long1: props.file.idfilegv}
      TeacherFileService.downloadFile(search).then((res) => {
        fileDownload(res.data, props.file.tenFile);
        // console.log(res)
        // window.location.href = URL.createObjectURL(
        //   new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
        // );
        //window.location.href = URL.createObjectURL(b64toBlob(res.data, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'))
        //link.click();
      })
    }
    
  }

  const handleDelete = () => {
    let action = {type: 'delete'}
    if(props.file.id){
      action.fileIdNew = props.file.id
    }
    else if(props.file.idfilegv){
      action.fileId = props.file.idfilegv
    }
    dispatch(action)
  }

    const textTruncate = {
        // overflow: "hidden",
        // textOverflow: "ellipsis",
        // whiteSpace: "nowrap",
        // width: "112px"
        width: "100%",
        overflowWrap: "break-word",
        wordWrap: "break-word",
        wordBreak: "break-word"
    }

  return (
    <div className="col-lg-3 py-2">
    <Card sx={{":hover": {border: "1px solid"}}} onContextMenu={handleRightClick} >
      {/* <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      /> */}
      <CardMedia
        component="img"
        // height="194"
        image={word}
        alt="Paella dish"
      />
      
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={textTruncate}>
        {props.file.tenFile}
        </Typography>
      </CardContent>
    </Card>
    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleDownload}>Tải xuống</MenuItem>
        <MenuItem onClick={handleDelete}>Xóa</MenuItem>
      </Menu>
    </div>
  );
}