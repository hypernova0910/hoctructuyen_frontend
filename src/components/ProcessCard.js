import React, {useContext} from 'react';
import './ProcessCard.css'
import {ProcessFormContext} from './CourseDetail';
import useDialog from '../hooks/useDialog';
import useSnackbar from '../hooks/useSnackbar';
import ProcessService from '../services/ProcessService';

export default function ProcessCard(props) {
    const {processContext, openContext, reloadContext} = useContext(ProcessFormContext);
    const [process, setProcess ] = processContext
    const [open, setOpen] = openContext
    const [reload, setReload] = reloadContext
    const {showDialog} = useDialog()
    const {toast} = useSnackbar()

    function onClickDetail(){
        setProcess(props.process)
        setOpen(true)
    }

    function onClickDelete(){
        showDialog('Cảnh báo', 'Bạn có chắc muốn xóa quá trình này', () => {
            //console.log(props.process.maquatrinh)
            ProcessService.deleteObj(props.process.maquatrinh).then((res) => {
                toast('success', 'Xóa thành công')
                setReload(true)
            }).catch((err) => {
                toast('error', 'Xóa thất bại')
            })
        })
    }

    return (
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 py-2">
            <div className="card">
                <h5 className={"card-header " +  (props.process.thoiGianNop ? 'required' : '')}>
                    {props.process.thoiGianNop ? 'Yêu cầu nộp bài' : 'Không yêu cầu nộp bài'}
                </h5>
                <div className="card-body">
                    <h5 className="card-title">{props.process.tenQuaTrinh}</h5>
                    {/* <p className="card-text">
                        {props.process.yeuCauNopBai}
                    </p> */}
                    <a onClick={onClickDetail} className="btn btn-primary">Chi tiết</a>
                    <a onClick={onClickDelete} className="btn btn-danger">Xóa</a>
                </div>
            </div>
        </div>
        
    )
}