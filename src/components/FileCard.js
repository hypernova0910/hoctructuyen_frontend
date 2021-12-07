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
import fileIcon from '../img/file-icon.png'
import fileDownload from 'js-file-download'
import useAuth from '../hooks/useAuth';
import { Roles, FileType } from '../common/constants';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import TeacherFileService from '../services/TeacherFileService';
import StudentFileService from '../services/StudentFileService';

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

  const {role} = useAuth()

  const handleRightClick = (event) => {
      //console.log('Right click');
      event.preventDefault();
      setAnchorEl(event.currentTarget);
    
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = () => {
    //console.log(props.file.idfilegv)
    if(props.file.idfilegv){
      const search = {long1: props.file.idfilegv}
      TeacherFileService.downloadFile(search).then((res) => {
        fileDownload(res.data, props.file.tenFile);
      })
    }
    else if(props.file.idfilesv){
      const search = {long1: props.file.idfilesv}
      StudentFileService.downloadFile(search).then((res) => {
        fileDownload(res.data, props.file.tenFile);
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
    else if(props.file.idfilesv){
      action.fileId = props.file.idfilesv
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
        image={fileIcon}
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
        <MenuItem onClick={handleDownload}><FileDownloadOutlinedIcon/>Tải xuống</MenuItem>
        <MenuItem 
        sx={((role === Roles.TEACHER && props.type == FileType.TEACHER) || (role === Roles.STUDENT && props.type == FileType.STUDENT)) ? {} : {display: 'none'}} 
        onClick={handleDelete}><DeleteOutlinedIcon/>Xóa</MenuItem>
      </Menu>
    </div>
  );
}